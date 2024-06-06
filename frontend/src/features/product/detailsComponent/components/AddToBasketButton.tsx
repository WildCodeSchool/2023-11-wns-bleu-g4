import { Button, Flex } from "@chakra-ui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function AddToBasketButton() {
  const { t } = useTranslation("productDetails");

  return (
    <Flex justifyContent="center">
      <Button h={54} rightIcon={<ShoppingCartIcon width={24} />} color="light" bg="accent" size="lg" width="100%">
        {t("Add to basket")}
      </Button>
    </Flex>
  );
}
