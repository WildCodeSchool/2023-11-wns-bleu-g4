import {
  ChartBarSquareIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  Squares2X2Icon,
  TagIcon,
} from "@heroicons/react/24/outline";
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
    icon: <ChartBarSquareIcon className="h-6 w-6 min-w-fit" />,
    path: "/admin",
  },
  {
    id: 2,
    title: "Brands",
    icon: <TagIcon className="h-6 w-6 min-w-fit" />,
    path: "/admin/brands",
  },
  {
    id: 3,
    title: "Categories",
    icon: <Squares2X2Icon className="h-6 w-6 min-w-fit" />,
    path: "/admin/categories",
  },
  {
    id: 4,
    title: "Characteristics",
    icon: <ClipboardDocumentListIcon className="h-6 w-6 min-w-fit" />,
    path: "/admin/characteristics",
  },
  {
    id: 5,
    title: "Customers",
    icon: <UserGroupIcon className="h-6 w-6 min-w-fit" />,
    path: "/admin/customers",
  },
  {
    id: 6,
    title: "Orders",
    icon: <CubeIcon className="h-6 w-6 min-w-fit" />,
    path: "/admin/orders",
  },
  {
    id: 7,
    title: "Products",
    icon: <ShoppingBagIcon className="h-6 w-6 min-w-fit" />,
    path: "/admin/products",
  },
];
