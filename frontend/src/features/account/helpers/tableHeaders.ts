import { menuItems, menuItemsth } from "../types";

export const orderTableHeaders: menuItemsth[] = [
  { id: 1, name: "order number", thClass: "  min-w-20 max-w-96 xl:min-w-40 xl:max-w-60" },
  { id: 2, name: "order date", thClass: " hidden md:table-cell min-w-20 max-w-96 xl:min-w-40 xl:max-w-60" },
  { id: 3, name: "agency", thClass: " hidden sm:table-cell  min-w-20 max-w-96 xl:min-w-40 xl:max-w-60" },
  { id: 4, name: "from", thClass: " hidden 2xl:table-cell  min-w-20 max-w-96 xl:min-w-40 xl:max-w-60" },
  { id: 5, name: "to", thClass: " hidden 2xl:table-cell min-w-20 max-w-96 xl:min-w-40 xl:max-w-60" },
  { id: 6, name: "status", thClass: " hidden xl:table-cell  min-w-20 max-w-96 xl:min-w-40 xl:max-w-60" }
];

export const orderDetailsHeaders: menuItemsth[] = [

  {
    id: 1,
    name: "Product",
    thClass: " hidden xl:table-cell  min-w-25 max-w-40 "
  },
  {
    id: 2,
    name: "Name",
    thClass: " whitespace-normal table-cell  min-w-25 max-w-40 "
  },
  {
    id: 3,
    name: "From",
    thClass: " hidden 2xl:table-cell  max-w-32 xl:min-w-40"
  },
  {
    id: 4,
    name: "To",
    thClass: " hidden 2xl:table-cell  max-w-32 xl:min-w-40"
  },
  {
    id: 5,
    name: "Day Price",
    thClass: " hidden xl:table-cell  max-w-32 xl:min-w-40"
  },
  {
    id: 6,
    name: "Total",
    thClass: " max-w-32 xl:min-w-40"
  },
  {
    id: 7,
    name: "status",
    thClass: " hidden xl:table-cell  max-w-32 xl:min-w-32 xl:max-w-46"
  },
];
