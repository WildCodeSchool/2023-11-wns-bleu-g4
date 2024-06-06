import { menuItems } from "../types";

export const orderTableHeaders: menuItems[] = [
  { id: 1, name: "order number" },
  { id: 2, name: "customer name" },
  { id: 3, name: "agency" },
  { id: 4, name: "from" },
  { id: 5, name: "to" },
  { id: 6, name: "status" },
  { id: 7, name: "order details" },
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

export const productStockTableHeaders: menuItems[] = [
  { id: 1, name: "agency" },
  { id: 2, name: "quantity" },
];

export const customerTableHeaders: menuItems[] = [
  { id: 1, name: "fullname" },
  { id: 2, name: "address" },
  { id: 3, name: "city" },
  { id: 4, name: "email" },
  { id: 5, name: "phone" },
];
