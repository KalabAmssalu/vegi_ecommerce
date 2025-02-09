"use client";
import { useFetchDelivery } from "@/action/Query/delivery-Query/delivery";
import { DeliveryPersonForm } from "@/components/modules/delivery/delivery-person-form";
import { DeliveryPersonTable } from "@/components/modules/delivery/delivery-person-table";
import React from "react";

type Props = {};

const DeliveryScreen = (props: Props) => {
  const { data: deliveryPersonData, isLoading } = useFetchDelivery();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex space-x-8">
      <div className="w-1/3">
        <h2 className="text-2xl font-bold mb-4">Add Delivery Person</h2>
        <DeliveryPersonForm />
      </div>
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4">Delivery Persons</h2>
        {deliveryPersonData && (
          <DeliveryPersonTable deliveryPersonData={deliveryPersonData} />
        )}
      </div>
    </div>
  );
};

export default DeliveryScreen;
