"use client";
import FAQForm from "@/components/modules/faq/FaqinputForm";
import FAQTable from "@/components/modules/faq/faqtable";
import React from "react";

type Props = {};

const FaqScreen = (props: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="col-span-2">
        <FAQTable />
      </div>
      <div className="col-span-1">
        <FAQForm />
      </div>
    </div>
  );
};

export default FaqScreen;
