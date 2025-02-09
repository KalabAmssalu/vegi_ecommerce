import { MerchantTable } from "@/components/modules/merchant/merchant-table";
import { NewApprovalTable } from "@/components/modules/merchant/new-approval-table";
import React from "react";

type Props = {};

const MerchantScreen = (props: Props) => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Merchants</h1>
      <NewApprovalTable />
      <MerchantTable />
    </div>
  );
};

export default MerchantScreen;
