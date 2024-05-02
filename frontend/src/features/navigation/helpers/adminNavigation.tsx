import { ChartBarSquareIcon, CubeIcon, ShoppingBagIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface Navigation {
  title: string;
  icon: ReactNode;
  path: string;
}

export const adminNavigation: Navigation[] = [
  {
    title: "Dashboard",
    icon: <ChartBarSquareIcon className="h-6 w-6" />,
    path: "/admin",
  },
  {
    title: "Orders",
    icon: <CubeIcon className="h-6 w-6" />,
    path: "/admin/orders",
  },
  {
    title: "Products",
    icon: <ShoppingBagIcon className="h-6 w-6" />,
    path: "/admin/products",
  },
  {
    title: "Customers",
    icon: <UserGroupIcon className="h-6 w-6" />,
    path: "/admin/customers",
  },
];
