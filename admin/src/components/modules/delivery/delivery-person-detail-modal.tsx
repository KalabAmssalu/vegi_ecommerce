import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeliveryPersonResponse } from "@/types/delivery-person/delivery-person";

interface DeliveryPersonDetailModalProps {
  deliveryPerson: DeliveryPersonResponse;
  onClose: () => void;
}

export function DeliveryPersonDetailModal({
  deliveryPerson,
  onClose,
}: DeliveryPersonDetailModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delivery Person Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Name:</span>
            <span className="col-span-3">{`${deliveryPerson.user.firstName} ${deliveryPerson.user.lastName}`}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Email:</span>
            <span className="col-span-3">{deliveryPerson.user.email}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Phone Number:</span>
            <span className="col-span-3">
              {deliveryPerson.user.phoneNumber}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Address:</span>
            <span className="col-span-3">{deliveryPerson.user.address}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Status:</span>
            <span className="col-span-3">
              {deliveryPerson.isBlocked ? "Blocked" : "Active"}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
