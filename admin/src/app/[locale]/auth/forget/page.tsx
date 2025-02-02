import { Forget } from "@/components/screens/authScreen/forget";
import { Login } from "@/components/screens/authScreen/login";
import { Button } from "@/components/ui/button";
import React from "react";
type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Forget />
    </div>
  );
};

export default page;
