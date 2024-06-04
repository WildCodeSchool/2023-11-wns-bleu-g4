import { TableBodyProps } from "../types";
import { customerTableHeaders } from "../helpers/tableHeaders";

export default function CustomerTableBody({ data }: TableBodyProps) {
  return (
    <table className="min-w-full rounded border border-gray-200 border-separate border-spacing-0">
      <thead>
        <tr>
          {customerTableHeaders.map(menu => (
            <th
              className="h-14 p-3 first:pl-8 last:pr-8 text-gray-600 text-left uppercase text-sm font-bold whitespace-nowrap border-b border-gray-200"
              key={menu.id}
            >
              <span className="flex gap-2 items-center">{menu.name}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm">
        {data.length !== 0 ? (
          data.map((customer: any, index: number) => (
            <tr key={customer.id} className={`${index % 2 === 0 && "bg-cactus-50"} whitespace-nowrap`}>
              <td className="flex gap-3 whitespace-nowrap p-3 pl-8 w-48 min-w-max items-center">
                <img src={customer.avatar} alt={customer.name} className="h-8 w-8 rounded-full" />
                {customer.name} {customer.firstname}</td>
              <td className="whitespace-nowrap p-3 w-96 min-w-max">{customer.address}</td>
              <td className="whitespace-nowrap p-3 w-60 min-w-max">{customer.city}</td>
              <td className="whitespace-nowrap p-3 w-96 min-w-max">{customer.email}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="p-4 text-center" colSpan={4}>
              No customer found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}