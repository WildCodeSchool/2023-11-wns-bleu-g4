import CharacteristicCreateModal from "@/features/admin/characteristic/CharacteristicCreateModal";
import CharacteristicTableBody from "@/features/admin/characteristic/CharacteristicTableBody";
import SearchAdmin from "@/features/admin/shared/SearchAdmin";
import TableFooter from "@/features/admin/shared/TableFooter";
import { useGetAllProductCharacteristicsQuery } from "@/graphql/ProductCharacteristic/generated/getAllProductCharacteristics.generated";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Characteristics() {
  const router = useRouter();
  const { query } = router;
  const initialPage = query.page ? parseInt(query.page as string, 10) - 1 : 0;
  const [createCharacteristicModalOpen, setCreateCharacteristicModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const searchTerm = query.search ? (query.search as string) : "";

  const { data, refetch, loading } = useGetAllProductCharacteristicsQuery({
    variables: {
      limit: 14,
      offset: currentPage * 14,
      name: searchTerm,
    },
  });
  const characteristics = data?.getAllProductCharacteristics.productCharacteristics ?? [];
  const totalCharacteristics = data?.getAllProductCharacteristics.total ?? 0;

  const itemsPerPage = 14;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + Math.min(itemsPerPage, characteristics?.length ?? 0);

  const toggleCreateCharacteristicModal = () => setCreateCharacteristicModalOpen(!createCharacteristicModalOpen);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const nextPage = pageNumber + 1;
    const searchParam = searchTerm ? `&search=${searchTerm}` : "";
    router.push(`/admin/characteristics?page=${nextPage}${searchParam}`);
  };

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [query.page]);

  return (
    <LayoutAdmin pageTitle="Characteristics">
      <div className="flex justify-between items-center">
        <h1>Characteristics</h1>
        <div className="flex gap-4">
          <button
            type="button"
            className="flex gap-2 items-center bg-accent font-semibold rounded-md text-white px-3 py-1"
            onClick={toggleCreateCharacteristicModal}
          >
            <PlusIcon className="h-6 w-6" />
            Add Characteristic
          </button>
          <SearchAdmin />
        </div>
      </div>
      {createCharacteristicModalOpen && (
        <CharacteristicCreateModal isOpen={createCharacteristicModalOpen} onClose={toggleCreateCharacteristicModal} />
      )}
      <div className="overflow-x-auto">
        <CharacteristicTableBody data={characteristics} loading={loading} />
      </div>
      <TableFooter
        data={totalCharacteristics}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={handlePageChange}
      />
    </LayoutAdmin>
  );
}
