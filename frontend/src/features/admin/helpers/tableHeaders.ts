import { menuItems } from "../product/types";

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
  { id: 1, name: "product code" },
  { id: 2, name: "product name" },
  { id: 3, name: "price (€)" },
];

export const productTableHeaders: menuItems[] = [
  { id: 1, name: "reference" },
  { id: 2, name: "product name" },
  { id: 3, name: "brand" },
  { id: 4, name: "category" },
  { id: 5, name: "price (€)" },
  { id: 6, name: "manage product" },
];

export const productStockTableHeaders: menuItems[] = [
  { id: 1, name: "agency" },
  { id: 2, name: "quantity" },
  { id: 3, name: "manage stock" },
];

export const brandTableHeaders: menuItems[] = [
  { id: 1, name: "brand name" },
  { id: 2, name: "brand logo" },
  { id: 3, name: "manage brand" },
];

export const categoryTableHeaders: menuItems[] = [
  { id: 1, name: "category name" },
  { id: 2, name: "category thumbnail" },
  { id: 3, name: "parent category" },
  { id: 4, name: "manage category" },
];

export const parentCategoryTableHeaders: menuItems[] = [
  { id: 1, name: "parent category name" },
  { id: 3, name: "manage parent category" },
];

export const characteristicTableHeaders: menuItems[] = [
  { id: 1, name: "name" },
  { id: 2, name: "manage characteristic" },
];

export const customerTableHeaders: menuItems[] = [
  { id: 1, name: "fullname" },
  { id: 2, name: "address" },
  { id: 3, name: "city" },
  { id: 4, name: "email" },
  { id: 5, name: "phone" },
];
