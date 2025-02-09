"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Copy, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { OrderType } from "@/types/order/order";
import { useFetchDelivery } from "@/action/Query/delivery-Query/delivery";
import { useUpdateDeliveryOrder } from "@/action/Query/order-Query/order";

type OrderDetailProps = {
  order: OrderType;
};

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] =
    useState<string>("");
  const { data: deliveryPersonData, isLoading } = useFetchDelivery();
  const { mutate: updateOrder } = useUpdateDeliveryOrder();

  const handleOpenDialog = (open: boolean) => {
    setIsOpen(open);
  };

  const handleAssignDeliveryPerson = () => {
    if (selectedDeliveryPerson) {
      updateOrder({
        id: order._id,
        data: selectedDeliveryPerson,
      });
      setIsOpen(false); // Close the dialog after successful update
    } else {
      alert("Please select a delivery person");
    }
  };
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col bg-muted/50">
        <CardTitle className="text-lg flex items-center gap-2">
          Order Detail
          <Button size="icon" variant="outline" className="ml-auto">
            <Copy className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>
          Date: {new Date(order.orderDate).toLocaleDateString()}
        </CardDescription>
        <div className="text-sm text-muted-foreground">
          Order ID: {order._id}
        </div>
        <div className="text-xs text-muted-foreground">
          Status: <span className="font-semibold">{order.status}</span>
        </div>
        <Button onClick={() => handleOpenDialog(true)}>
          Allocate to Delivery
        </Button>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <ul className="grid gap-3">
          {order.products.map((product, index) => (
            <li key={index} className="flex justify-between">
              <span>
                {product.product.name} x{product.quantity}
              </span>
              <span>${product.price}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <ul className="grid gap-3">
          <li className="flex justify-between">
            <span>Subtotal</span>
            <span>${order.totalAmount}</span>
          </li>
          <li className="flex justify-between">
            <span>Tax</span>
            <span>$25.00</span>{" "}
            {/* Replace with actual tax amount if available */}
          </li>
          <li className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${order.totalAmount}</span>
          </li>
        </ul>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold">Delivery Information</div>
            <address className="not-italic text-muted-foreground">
              <span>{order.delivery_address.street}</span>
              <br />
              <span>
                {order.delivery_address.city}, {order.delivery_address.state}{" "}
                {order.delivery_address.postal_code}
              </span>
              <br />
              <span>{order.delivery_address.country}</span>
              <br />
              <span>{order.delivery_address.email}</span>
            </address>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              {order.payment_status ? "Paid" : "Pending"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated {new Date(order.updatedAt).toLocaleDateString()}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button size="icon" variant="outline">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
      {/* Dialog for Assigning Delivery Person */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex justify-center items-center">
          <div className="bg-muted p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold">Assign Delivery Person</h3>
            <Separator className="my-2" />
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="deliveryPerson"
                  className="block text-sm font-medium"
                >
                  Select Delivery Person
                </label>
                <select
                  id="deliveryPerson"
                  value={selectedDeliveryPerson}
                  onChange={(e) => setSelectedDeliveryPerson(e.target.value)}
                  className="w-full p-2 border border-muted rounded-md"
                >
                  <option value="">Select Delivery Person</option>
                  {isLoading ? (
                    <option>Loading...</option>
                  ) : (
                    deliveryPersonData?.map((person) => (
                      <option key={person._id} value={person._id}>
                        {person.user.firstName} {person.user.lastName}
                        {/* Assuming the name is on the user object */}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAssignDeliveryPerson}>Assign</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default OrderDetail;
