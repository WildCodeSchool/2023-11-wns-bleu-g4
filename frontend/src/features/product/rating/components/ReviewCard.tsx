import React, { useEffect, useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import ReviewActions from "@/features/product/rating/components/card/ReviewActions";
import ReviewHeader from "@/features/product/rating/components/card/ReviewHeader";
import ReviewRating from "@/features/product/rating/components/card/ReviewRating";
import ReviewContent from "@/features/product/rating/components/card/ReviewContent";

interface ReviewCardProps {
  review: {
    id: number;
    user: {
      id: number;
      avatar: string;
      firstname: string;
      name: string;
    };
    rate: number;
    comment: string;
    createdAt: string;
    updatedAt?: string;
    edited: boolean;
  };
  isEditable?: boolean;
  editing?: boolean;
  setComment?: React.Dispatch<React.SetStateAction<string>>;
  setRate?: React.Dispatch<React.SetStateAction<number>>;
  onEdit?: (review: any) => void;
  onDelete?: (reviewId: number) => void;
  onSave?: (e: React.FormEvent) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function ReviewCard({
  review,
  isEditable,
  editing,
  setComment,
  setRate,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  isLoading,
}: ReviewCardProps) {
  const [localComment, setLocalComment] = useState(review.comment);
  const [localRate, setLocalRate] = useState(review.rate);
  const [updatedDate, setUpdatedDate] = useState<string | null>(null);

  useEffect(() => {
    if (editing) {
      setLocalComment(review.comment);
      setLocalRate(review.rate);
    }
  }, [editing, review.comment, review.rate]);

  const handleSave = (e: React.FormEvent) => {
    if (onSave) {
      onSave(e);
      setUpdatedDate(new Date().toLocaleDateString());
    }
  };

  const createdDate = new Date(review.createdAt).toLocaleDateString();
  const displayDate = updatedDate || createdDate;

  return (
    <Box>
      {isEditable && (
        <ReviewActions
          editing={editing || false}
          isLoading={isLoading || false}
          onEdit={() => onEdit?.(review)}
          onDelete={() => onDelete?.(review.id)}
          onSave={handleSave}
          onCancel={onCancel || (() => {})}
        />
      )}
      <Box
        px={{ base: "20px", xl: "60px" }}
        py="23px"
        borderWidth={1}
        borderRadius="lg"
        bg="#F5EEE5"
        display="flex"
        flexDirection="row"
        gap="38px"
        alignItems="center"
      >
        <Image src={review.user.avatar} alt="" width="5%" h="auto" display={{ base: "none", md: "initial" }} />
        <Flex flexDirection="column" w="100%" gap={2}>
          <ReviewHeader
            firstname={review.user.firstname}
            lastname={review.user.name}
            displayDate={displayDate}
            edited={review.edited}
          />
          <ReviewContent
            comment={localComment}
            editing={editing || false}
            onCommentChange={comment => {
              setLocalComment(comment);
              setComment?.(comment);
            }}
          />
          <ReviewRating
            rate={localRate}
            editing={editing || false}
            onRateChange={rate => {
              setLocalRate(rate);
              setRate?.(rate);
            }}
          />
        </Flex>
      </Box>
    </Box>
  );
}
