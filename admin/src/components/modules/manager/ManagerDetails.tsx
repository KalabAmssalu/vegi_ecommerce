import { useFetchManagerById } from "@/action/Query/manager-Query/manager";

interface ManagerDetailsProps {
  managerId: string;
}

export function ManagerDetails({ managerId }: ManagerDetailsProps) {
  const { data: manager, isLoading } = useFetchManagerById(managerId);

  if (isLoading) {
    return <div className="animate-pulse p-4">Loading manager details...</div>;
  }

  if (!manager) {
    return <div className="p-4 text-red-500">Manager not found</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Name</h4>
        <p className="text-lg">
          {manager.user.firstName} {manager.user.lastName}
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
        <p className="text-lg">{manager.user.email}</p>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Role</h4>
        <p className="text-lg capitalize">{manager.user.role}</p>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">
          Created At
        </h4>
        <p className="text-lg">
          {new Date(manager.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">
          Last Updated
        </h4>
        <p className="text-lg">
          {new Date(manager.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
