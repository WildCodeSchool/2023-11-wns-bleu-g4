import { Agency, ProductCode, Status } from "@/graphql/generated/schema";
import { useTranslation } from "react-i18next";
import { AggregatedDataEntry } from "./ProductStockTableBody";
import { Button, Flex, FormControl, Select } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useUpdateProductCodeStatusMutation } from "@/graphql/ProductCode/generated/updateProductCode.generated";
import { toast } from "react-toastify";

const statusOptions = [
  { id: 1, value: Status.Available, name: "Available" },
  { id: 2, value: Status.Broken, name: "Broken" },
];

interface ProductStockDetailsProps {
  data: ProductCode[];
  aggregatedData: AggregatedDataEntry;
  handleDeleteProductCode: (id: number) => void;
}

export default function ProductStockDetails({
  data,
  aggregatedData,
  handleDeleteProductCode,
}: ProductStockDetailsProps) {
  const { t } = useTranslation("ProductStockDetailsDropdown");
  const [updateProductCodeStatus, { error }] = useUpdateProductCodeStatusMutation();
  const [formData, setFormData] = useState({ status: data[0].status });

  const productCodeId = data[0].id;

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateProductCodeStatus({ variables: { status: formData.status, productCodeId } });
      toast.success(t("Product code status updated successfully"));
    } catch (e) {
      toast.error(error?.message);
      console.error(e);
    }
  };

  return (
    <tr className="min-w-full space-y-4">
      <td colSpan={4} className="p-4 align-top border-top border-gray-400 w-full">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-3 text-left uppercase text-sm font-bold whitespace-nowrap border-b border-gray-400">
                {t("Product code")}
              </th>
              <th className="p-3 text-left uppercase text-sm font-bold whitespace-nowrap border-b border-gray-400">
                {t("Size")}
              </th>
              <th className="p-3 text-left uppercase text-sm font-bold whitespace-nowrap border-b border-gray-400">
                {t("Status")}
              </th>
              <th className="p-3 text-left uppercase text-sm font-bold whitespace-nowrap border-b border-gray-400">
                {t("Remove")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((productCode: ProductCode) => productCode.agency?.id === aggregatedData.agency.id)
              .sort((a: ProductCode, b: ProductCode) => String(a.id).localeCompare(String(b.id)))
              .map((productCode: ProductCode) => (
                <tr key={productCode.id} className="whitespace-nowrap h-12">
                  <td className="p-3 pl-8 w-48 min-w-max">{productCode.id}</td>
                  <td className="p-3 pr-8 w-28 min-w-max">{productCode?.size}</td>
                  <td className="p-3 pr-8 w-52 min-w-max align-middle">
                    <form onSubmit={handleSubmit}>
                      <FormControl isRequired maxW={300}>
                        <Flex>
                          <Select
                            placeholder="Select a status"
                            id="status"
                            name="status"
                            defaultValue={productCode.status}
                            onChange={handleSelectChange}
                          >
                            {statusOptions.map(status => (
                              <option key={status.id} value={status.value}>
                                {status.name}
                              </option>
                            ))}
                          </Select>
                          <Button colorScheme="cactus" ml={3} type="submit">
                            <CheckIcon className="h-6 w-6" />
                          </Button>
                        </Flex>
                      </FormControl>
                    </form>
                  </td>
                  <td className="p-3 pr-8 w-28 min-w-max">
                    <button
                      type="button"
                      className="inline-block bg-[#D23732] rounded-md px-3.5 py-2.5 align-middle"
                      aria-label="Delete button"
                      onClick={() => handleDeleteProductCode(productCode.id)}
                    >
                      <TrashIcon className="h-5 w-5 text-white" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </td>
    </tr>
  );
}
