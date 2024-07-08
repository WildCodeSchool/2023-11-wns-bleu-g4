import { useGetAllParentCategoryQuery } from "@/graphql/ParentCategory/generated/GetAllParentCategory.generated";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import qs from "query-string";
import React from "react";

export default function TopNavItems() {
  const router = useRouter();
  const { data: categoriesData } = useGetAllParentCategoryQuery();

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/products?${qs.stringify({ categoryId })}`);
  };

  return (
    <Accordion allowToggle>
      {categoriesData?.getAllParentCategories.map((category) => (
        <AccordionItem key={category.id}>
          <h2>
            <AccordionButton borderBottom="1px solid" pt="2" borderTop="none">
              <Box as="span" flex="1" textAlign="left">
                {category.name}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={0} display="flex" flexDirection="column">
            {category.categories.map((subCat) => (
              <React.Fragment key={subCat.id}>
                <Flex py={4}>
                  <Link href="#" onClick={() => handleCategoryClick(subCat.id)}>
                    {subCat.name}
                  </Link>
                  <Spacer />
                  <ChevronRightIcon width={18} />
                </Flex>
                <Divider borderColor="gray.400" />
              </React.Fragment>
            ))}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
