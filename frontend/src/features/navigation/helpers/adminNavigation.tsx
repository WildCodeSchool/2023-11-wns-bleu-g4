import { ChartBarSquareIcon, CubeIcon, ShoppingBagIcon, UserGroupIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface Navigation {
  id: number;
  title: string;
  icon: ReactNode;
  path: string;
}

export const adminNavigation: Navigation[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: <ChartBarSquareIcon className="h-6 w-6" />,
    path: "/admin",
  },
  {
    id: 2,
    title: "Orders",
    icon: <CubeIcon className="h-6 w-6" />,
    path: "/admin/orders",
  },
  {
    id: 3,
    title: "Products",
    icon: <ShoppingBagIcon className="h-6 w-6" />,
    path: "/admin/products",
  },
  {
    id: 4,
    title: "Categories",
    icon: <Squares2X2Icon className="h-6 w-6" />,
    path: "/admin/categories",
  },
  {
    id: 5,
    title: "Customers",
    icon: <UserGroupIcon className="h-6 w-6" />,
    path: "/admin/customers",
  },
];
