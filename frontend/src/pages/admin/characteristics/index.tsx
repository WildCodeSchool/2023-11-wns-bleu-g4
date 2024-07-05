import CharacteristicCreateModal from "@/features/admin/characteristic/CharacteristicCreateModal";
import CharacteristicTableBody from "@/features/admin/characteristic/CharacteristicTableBody";
import { useGetAllProductCharacteristicsQuery } from "@/graphql/ProductCharacteristic/generated/getAllProductCharacteristics.generated";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Characteristics() {
    const [createCharacteristicModalOpen, setCreateCharacteristicModalOpen] = useState(false);

    const { data: ProductCharacteristics, refetch } = useGetAllProductCharacteristicsQuery();
    const characteristics = ProductCharacteristics?.getAllProductCharacteristics ?? [];

    const toggleCreateCharacteristicModal = () => setCreateCharacteristicModalOpen(!createCharacteristicModalOpen);

    return (
        <LayoutAdmin pageTitle="Characteristics">
            <div className="flex justify-between items-center">
                <h1>Characteristics</h1>
                <button
                    type="button"
                    className="flex gap-2 items-center bg-accent font-semibold rounded-md text-white px-3 py-1"
                    onClick={toggleCreateCharacteristicModal}
                >
                    <PlusIcon className="h-6 w-6" />
                    Add Characteristic
                </button>
                {createCharacteristicModalOpen && (
                    <CharacteristicCreateModal
                        isOpen={createCharacteristicModalOpen}
                        onClose={toggleCreateCharacteristicModal}
                        refetch={refetch}
                    />
                )}
            </div>
            <div className="overflow-x-auto">
                <CharacteristicTableBody data={characteristics} />
            </div>
        </LayoutAdmin>
    );
};
