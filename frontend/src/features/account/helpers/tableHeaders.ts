import { menuItems, menuItemsth } from "../types";

export const orderTableHeaders: menuItemsth[] = [
  { id: 1, name: "order number", thClass: "  min-w-25 max-w-40 xl:min-w-40 xl:max-w-72" },
  { id: 2, name: "order date", thClass: "  min-w-25 max-w-40 xl:min-w-40 xl:max-w-72" },
  { id: 3, name: "agency", thClass: "hidden sm:table-cell  min-w-25 max-w-40 xl:min-w-40 xl:max-w-72" },
  { id: 4, name: "from", thClass: "hidden sm:table-cell  min-w-25 max-w-40 xl:min-w-40 xl:max-w-72" },
  { id: 5, name: "to", thClass: "hidden sm:table-cell  min-w-25 max-w-40 xl:min-w-40 xl:max-w-72" },
  { id: 6, name: "status", thClass: "hidden sm:table-cell  min-w-25 max-w-40 xl:min-w-40 xl:max-w-72" }
];

export const orderDetailsHeaders: menuItemsth[] = [

  { id: 1, name: "Product", thClass: " lg:table-cell  min-w-25 max-w-40 xl:max-w-72" },
  { id: 2, name: "Name", thClass: "hidden sm:table-cell  min-w-25 max-w-40 xl:max-w-72" },
  { id: 3, name: "From", thClass: "hidden lg:table-cell  max-w-36 xl:min-w-36 xl:max-w-40" },
  { id: 4, name: "To", thClass: "hidden lg:table-cell  max-w-36 xl:min-w-36 xl:max-w-40" },
  { id: 5, name: "price", thClass: " lg:table-cell  max-w-36 xl:min-w-36 xl:max-w-40" },
  { id: 6, name: "status", thClass: "hidden lg:table-cell  max-w-36 xl:min-w-36 xl:max-w-40" },
];
