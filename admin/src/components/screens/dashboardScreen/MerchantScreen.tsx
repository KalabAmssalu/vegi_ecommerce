"use client";
import { useFetchAllMerchants } from "@/action/Query/merchant-Query/merchant";
import { MerchantTable } from "@/components/modules/merchant/merchant-table";
import { NewApprovalTable } from "@/components/modules/merchant/new-approval-table";
import React from "react";

type Props = {};

const MerchantScreen = (props: Props) => {
  const { data: merchants, isLoading, isError } = useFetchAllMerchants();

  // Filter unverified merchants
  const unverifiedMerchants = merchants?.filter(
    (merchant) => !merchant.isVerified
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Merchants</h1>
     {unverifiedMerchants && <NewApprovalTable merchantData={unverifiedMerchants} />}
      {merchants && <MerchantTable merchantData={merchants} />}
    </div>
  );
};

export default MerchantScreen;
