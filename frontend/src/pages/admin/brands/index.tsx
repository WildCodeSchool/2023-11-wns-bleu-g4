import BrandCreateModal from "@/features/admin/brand/BrandCreateModal";
import BrandTableBody from "@/features/admin/brand/BrandTableBody";
import SearchAdmin from "@/features/admin/shared/SearchAdmin";
import TableFooter from "@/features/admin/shared/TableFooter";
import { useGetAllBrandsQuery } from "@/graphql/Brand/generated/getAllBrands.generated";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Brand() {
    const router = useRouter();
    const { query } = router;
    const initialPage = query.page ? parseInt(query.page as string, 10) - 1 : 0;
    const [createCharacteristicModalOpen, setCreateCharacteristicModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const searchTerm = query.search ? query.search as string : '';

    const { data, refetch, loading } = useGetAllBrandsQuery({
        variables: {
            limit: 14,
            offset: currentPage * 14,
            name: searchTerm,
        }
    });
    const brands = data?.getAllBrands.brands ?? [];
    const totalBrands = data?.getAllBrands.total ?? 0;

    const itemsPerPage = 14;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + Math.min(itemsPerPage, brands?.length ?? 0);

    const toggleCreateCharacteristicModal = () => setCreateCharacteristicModalOpen(!createCharacteristicModalOpen);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const nextPage = pageNumber + 1;
        const searchParam = searchTerm ? `&search=${searchTerm}` : '';
        router.push(`/admin/brands?page=${nextPage}${searchParam}`);
    };

    useEffect(() => {
        setCurrentPage(initialPage);
    }, [query.page]);

    return (
        <LayoutAdmin pageTitle="Brands">
            <div className="flex justify-between items-center">
                <h1>Brands</h1>
                <div className="flex gap-4">
                    <button
                        type="button"
                        className="flex gap-2 items-center bg-accent font-semibold rounded-md text-white px-3 py-1"
                        onClick={toggleCreateCharacteristicModal}
                    >
                        <PlusIcon className="h-6 w-6" />
                        Add Brand
                    </button>
                    <SearchAdmin />
                </div>
            </div>
            {createCharacteristicModalOpen && (
                <BrandCreateModal
                    isOpen={createCharacteristicModalOpen}
                    onClose={toggleCreateCharacteristicModal}
                    refetch={refetch}
                />
            )}
            <div className="overflow-x-auto">
                <BrandTableBody data={brands} refetch={refetch} loading={loading} />
            </div>
            <TableFooter
                data={totalBrands}
                startIndex={startIndex}
                endIndex={endIndex}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setCurrentPage={handlePageChange}
            />
        </LayoutAdmin>
    );
};
