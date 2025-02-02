// rolesPermissions.js

// Define action constants for reusability
const ACTIONS = {
  READ: "READ",
  WRITE: "WRITE",
  DELETE: "DELETE",
};

// Role-based permissions
const rolesPermissions = {
  admin: {
    resources: {
      admin: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      carts: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      categories: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      chats: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      customers: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      deliverypeople: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      managers: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      merchants: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      messages: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      orders: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      payments: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      productreviews: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      products: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      users: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
    },
  },
  manager: {
    resources: {
      merchants: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      deliverypeople: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      products: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      chats: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      categories: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      orders: [ACTIONS.READ, ACTIONS.WRITE],
      customers: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      productreviews: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      users: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
    },
  },
  merchant: {
    resources: {
      products: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      productreviews: [ACTIONS.READ],
      categories: [ACTIONS.READ],
      orders: [ACTIONS.READ],
      customers: [ACTIONS.READ],
      payments: [ACTIONS.READ, ACTIONS.WRITE],
      users: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
    },
  },
  deliveryPerson: {
    resources: {
      orders: [ACTIONS.READ, ACTIONS.WRITE],
      customers: [ACTIONS.READ],
      users: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
    },
  },
  customer: {
    resources: {
      products: [ACTIONS.READ],
      carts: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      payments: [ACTIONS.READ, ACTIONS.WRITE],
      chats: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      orders: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
      productreviews: [ACTIONS.READ, ACTIONS.WRITE],
      users: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.DELETE],
    },
  },
};

export default rolesPermissions;
