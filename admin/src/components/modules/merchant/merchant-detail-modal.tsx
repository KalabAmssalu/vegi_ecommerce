import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Merchant } from "@/types/merchant/merchant";

interface MerchantDetailModalProps {
  merchant: Merchant;
  onClose: () => void;
}

export function MerchantDetailModal({
  merchant,
  onClose,
}: MerchantDetailModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Merchant Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Name:</span>
            <span className="col-span-3">{`${merchant.user.firstName} ${merchant.user.lastName}`}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Email:</span>
            <span className="col-span-3">{merchant.user.email}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Address:</span>
            <span className="col-span-3">{merchant.address}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Verified:</span>
            <span className="col-span-3">
              {merchant.isVerified ? "Yes" : "No"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Blocked:</span>
            <span className="col-span-3">
              {merchant.isBlocked ? "Yes" : "No"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Products:</span>
            <span className="col-span-3">{merchant.products.length}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Orders:</span>
            <span className="col-span-3">{merchant.orders.length}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
