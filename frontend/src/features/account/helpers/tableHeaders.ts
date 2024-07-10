import { menuItems } from "../types";

export const orderTableHeaders: menuItems[] = [
  { id: 1, name: "order number" },
  { id: 2, name: "agency" },
  { id: 3, name: "from" },
  { id: 4, name: "to" },
  { id: 5, name: "status" }
];

export const orderDetailsHeaders: menuItems[] = [
  { id: 1, name: "booking number" },
  { id: 2, name: "product name" },
  { id: 3, name: "quantity" },
  { id: 4, name: "price" },
  { id: 5, name: "cancel booking" },
];

export const productTableHeaders: menuItems[] = [
  { id: 1, name: "reference" },
  { id: 2, name: "product name" },
  { id: 3, name: "brand" },
  { id: 4, name: "price" },
  { id: 5, name: "manage product" },
];

