import { useState } from "react";
import { useProductContext } from "@/context/ProductPageContext";
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function ProductDescription() {
  const { t } = useTranslation("productDetails");
  const {
    state: { selectedProduct, agencies },
    setSelectedAgency,
    setSelectedSize,
  } = useProductContext();

  const [selectedAgencyName, setSelectedAgencyName] = useState<string | null>(null);

  if (!selectedProduct) return null;

  return (
    <Flex flexDirection="column" gap="10px">
      <Text fontSize="2xl" fontWeight="700" fontFamily="Poppins">
        {selectedProduct.name}
      </Text>
      <Text fontWeight="600">{selectedProduct.description}</Text>
      <Menu flip={true} matchWidth={true}>
        <MenuButton as={Button} mt={5} width={"fit-content"} data-testid={"agency"}>
          {selectedAgencyName ? (
            <>
              <strong>Agence :</strong> {selectedAgencyName}
            </>
          ) : (
            "Sélectionner une agence"
          )}
        </MenuButton>
        <MenuList>
          {agencies.map((agency, index) => {
            const isAvailable = agency.productCodes.some(
              productCode => productCode.product?.id === selectedProduct.id && productCode.status === "AVAILABLE",
            );

            return (
              <MenuItem
                data-testid={`agency-${agency.id}`}
                key={index}
                onClick={() => {
                  if (isAvailable) {
                    setSelectedAgency(agency.id);
                    setSelectedSize(null);
                    setSelectedAgencyName(agency.name);
                  }
                }}
                isDisabled={!isAvailable}
              >
                {isAvailable ? (
                  <CheckIcon
                    style={{
                      width: "1rem",
                      marginRight: "8px",
                    }}
                  />
                ) : (
                  <XMarkIcon
                    style={{
                      width: "1rem",
                      marginRight: "8px",
                    }}
                  />
                )}
                {agency.name}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Flex>
  );
}
