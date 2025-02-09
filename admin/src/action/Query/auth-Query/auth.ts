"use client";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import {
  ClearCurrentUser,
  SetCurrentUser,
} from "@/lib/store/redux/currentUser";

import { type AuthResponse, type UserType } from "@/types/user";
import { ICredentials, signIn, signOut, signUp } from "@/action/auth/action";

export const useLogout = () => {
  const router = useRouter(); // Initialize the router
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ["signOut"],
    mutationFn: signOut,
    onMutate: () => {
      toast.dismiss();
      toast.loading("በመውጣት ላይ፣ እባክዎን ትንሽ ይጠብቁ...");
    },
    onSuccess: () => {
      toast.dismiss();
      dispatch(ClearCurrentUser());
      toast.success("Logout... BYE!");
      router.push("/auth" as `/${string}`);
    },
    onError: (errorMessage: string) => {
      toast.dismiss();
      toast.error(errorMessage);
    },
  });
};

export const useSignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useToastMutation<ICredentials>(
    "signIn",
    signIn,
    "ኢሜልዎን እና የይለፍ ቃልዎን በማረጋገጥ ላይ፣ እባክዎ ይጠብቁ...",
    {
      onSuccess: async (variables, data) => {
        try {
          const dataSend = variables.data as AuthResponse;
          dispatch(SetCurrentUser(dataSend));
          router.push("/Home");
        } catch (error) {
          // Handle error
          console.error("Error handling post-sign-in redirect:", error);
          toast.error("An error occurred while signing in.");
        }
      },
    }
  );
};

export const useSignUp = () => {
  const router = useRouter();
  return useToastMutation<Partial<UserType>>(
    "signUp",
    signUp,
    "ኢሜልዎን እና የይለፍ ቃልዎን በማረጋገጥ ላይ፣ እባክዎ ይጠብቁ...",
    {
      onSuccess: (variables) => {
        // router.push("/auth/sign-in" as `/${string}`);
        console.log("Signed up successfully:", variables);
      },
    }
  );
};
