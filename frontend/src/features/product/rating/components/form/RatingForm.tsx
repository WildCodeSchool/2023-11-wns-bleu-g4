import React from "react";
import { Box, Button, Flex, FormControl, FormLabel, Stack, Textarea } from "@chakra-ui/react";
import { StarIcon } from "@heroicons/react/24/solid";

interface RatingFormProps {
  comment: string;
  rate: number;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setRate: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function RatingForm({ comment, rate, setComment, setRate, handleSubmit, isLoading }: RatingFormProps) {
  return (
    <Box as="form" onSubmit={handleSubmit} mt={8} mb={12}>
      <Stack spacing={4}>
        <FormControl id="rate" isRequired>
          <FormLabel>Rating</FormLabel>
          <Flex>
            {[1, 2, 3, 4, 5].map(index => (
              <Box
                key={index}
                onClick={() => setRate(index)}
                cursor="pointer"
                color={index <= rate ? "yellow.400" : "gray.300"}
              >
                <StarIcon className="h-8 w-8" />
              </Box>
            ))}
          </Flex>
        </FormControl>

        <FormControl id="comment" isRequired>
          <FormLabel>Comment</FormLabel>
          <Textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Write your review here..."
          />
        </FormControl>

        <Button variant="accentButton" type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
