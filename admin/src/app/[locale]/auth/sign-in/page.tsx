import { Login } from "@/components/screens/authScreen/login";
import { Button } from "@/components/ui/button";
import React from "react";
type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Login />
    </div>
  );
};

export default page;
