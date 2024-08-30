import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { StarIcon as FilledStarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

interface ReviewRatingProps {
  rate: number;
  editing: boolean;
  onRateChange: (rate: number) => void;
}

export default function ReviewRating({ rate, editing, onRateChange }: ReviewRatingProps) {
  return (
    <Flex alignItems="center" justifyContent="flex-end">
      {[1, 2, 3, 4, 5].map(index => (
        <Box key={index} onClick={() => editing && onRateChange(index)} cursor={editing ? "pointer" : "default"}>
          {index <= rate ? (
            <FilledStarIcon className={`text-yellow-500 ${editing ? "h-8 w-8" : "h-6 w-6"}`} />
          ) : (
            <OutlineStarIcon className={`text-gray-300 ${editing ? "h-8 w-8" : "h-6 w-6"}`} />
          )}
        </Box>
      ))}
    </Flex>
  );
}
