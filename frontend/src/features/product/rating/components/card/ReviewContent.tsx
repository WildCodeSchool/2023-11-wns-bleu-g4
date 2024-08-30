import React from "react";
import { Text, Textarea } from "@chakra-ui/react";

interface ReviewContentProps {
  comment: string;
  editing: boolean;
  onCommentChange: (comment: string) => void;
}

export default function ReviewContent({ comment, editing, onCommentChange }: ReviewContentProps) {
  return (
    <>
      {editing ? (
        <Textarea
          value={comment}
          onChange={e => onCommentChange(e.target.value)}
          placeholder="Edit your review"
          backgroundColor="white"
          color="black"
        />
      ) : (
        <Text fontWeight="500" color="black">
          {comment}
        </Text>
      )}
    </>
  );
}
