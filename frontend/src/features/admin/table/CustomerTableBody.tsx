import { TableBodyProps } from "../product/types";
import { customerTableHeaders } from "../helpers/tableHeaders";
import { useTranslation } from "react-i18next";
import { User } from "@/graphql/generated/schema";
import Loading from "@/shared/components/Loading";

export default function CustomerTableBody({ data, loading }: TableBodyProps) {
  const { t } = useTranslation("CustomerTableBody");

  return (
    <table className="min-w-full rounded border border-gray-200 border-separate border-spacing-0">
      <thead>
        <tr>
          {customerTableHeaders.map(menu => (
            <th
              className="h-14 p-3 first:pl-8 last:pr-8 text-left uppercase text-sm font-bold whitespace-nowrap 
              border-b border-gray-200"
              key={menu.id}
            >
              {menu.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm">
        {loading && (
          <tr>
            <td className="p-4 text-center" colSpan={5}>
              <Loading loading={loading} />
            </td>
          </tr>
        )}
        {!loading && data.length === 0 ? (
          <tr>
            <td className="p-4 text-center" colSpan={5}>
              {t("No customer found")}
            </td>
          </tr>
        ) : (
          data.map((customer: User, index: number) => (
            <tr
              key={customer.id}
              className={`${index % 2 === 0 && "bg-cactus-50"} whitespace-nowrap hover:bg-cactus-300`}
            >
              <td className="flex gap-3 whitespace-nowrap px-3 py-2 pl-8 w-60 min-w-max items-center">
                <img src={customer.avatar} alt={customer.name} className="h-8 w-8 rounded-full" />
                {customer.name} {customer.firstname}
              </td>
              <td className="whitespace-nowrap p-3 w-96 min-w-max">{customer.address}</td>
              <td className="whitespace-nowrap p-3 w-60 min-w-max">{customer.city}</td>
              <td className="whitespace-nowrap p-3 w-96 min-w-max">{customer.email}</td>
              <td className="whitespace-nowrap p-3 w-60 min-w-max">{customer.phone}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
