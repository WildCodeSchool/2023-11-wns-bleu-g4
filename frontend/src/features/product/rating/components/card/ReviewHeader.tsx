import React from "react";
import { Flex, Text } from "@chakra-ui/react";

interface ReviewHeaderProps {
  firstname: string;
  lastname: string;
  displayDate: string;
  edited: boolean;
}

export default function ReviewHeader({ firstname, lastname, displayDate, edited }: ReviewHeaderProps) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text fontSize="18px" fontWeight="700" color="black">
        {firstname} {lastname.slice(0, 1)}.
      </Text>
      <Text fontSize="sm" color="black">
        {edited ? (
          <Text as="span" color="green.500">
            Update on : {displayDate}
          </Text>
        ) : (
          displayDate
        )}
      </Text>
    </Flex>
  );
}
