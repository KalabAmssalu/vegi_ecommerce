"use client";
import { useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import {
  useDeleteManager,
  useFetchAllManager,
} from "@/action/Query/manager-Query/manager";
import { ManagerDetails } from "@/components/modules/manager/ManagerDetails";
import { ManagerForm } from "@/components/modules/manager/ManagerForm";
import { useAppSelector } from "@/hooks/storehooks";

export default function ManagerScreen() {
  const [selectedManager, setSelectedManager] = useState<string | null>(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [managerToDelete, setManagerToDelete] = useState<string | null>(null);

  const { data: managers, isLoading, error } = useFetchAllManager();
  const { mutate: deleteManager } = useDeleteManager();
  const { currentUser } = useAppSelector((state) => state.currentUser);
  if (currentUser.role !== "admin") {
    return <div>You are not authorized to access this page</div>;
  }
  const handleDelete = () => {
    if (managerToDelete) {
      deleteManager(managerToDelete);
      setIsDeleteDialogOpen(false);
      setManagerToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading managers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">
          Error loading managers. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Managers</h1>
          <p className="text-muted-foreground mt-1">Manage your team members</p>
        </div>
        <Button
          onClick={() => {
            setSelectedManager(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Manager
        </Button>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {managers?.map((manager) => (
              <TableRow key={manager._id}>
                <TableCell className="font-medium">
                  {manager.user.firstName} {manager.user.lastName}
                </TableCell>
                <TableCell>{manager.user.email}</TableCell>
                <TableCell>{manager.user.role}</TableCell>
                <TableCell>{manager.user.phoneNumber}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedManager(manager._id);

                        setIsDetailOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedManager(manager._id);

                        setIsFormOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setManagerToDelete(manager._id);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Manager Details</SheetTitle>
            <SheetDescription>View manager information</SheetDescription>
          </SheetHeader>
          {selectedManager && <ManagerDetails managerId={selectedManager} />}
        </SheetContent>
      </Sheet>

      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>
              {selectedManager ? "Edit Manager" : "Add Manager"}
            </SheetTitle>
            <SheetDescription>
              {selectedManager
                ? "Update manager information"
                : "Add a new manager"}
            </SheetDescription>
          </SheetHeader>
          <ManagerForm
            managerId={selectedManager}
            onSuccess={() => setIsFormOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              manager&apos;s data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
