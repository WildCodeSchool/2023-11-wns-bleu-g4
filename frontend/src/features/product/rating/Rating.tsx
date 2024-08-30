import React from "react";
import { Box, Divider, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useProductContext } from "@/context/ProductPageContext";
import { useUserContext } from "@/context/UserDataContext";
import { useGetAllReviewsQuery } from "@/graphql/Review/generated/getAllReviews.generated";
import { useRatingLogic } from "./useRatingLogic";
import ReviewCard from "@/features/product/rating/components/ReviewCard";
import RatingForm from "@/features/product/rating/components/form/RatingForm";
import { useHasUserBookedProductQuery } from "@/graphql/Review/generated/hasUserBookedProduct.generated";
import Loading from "@/shared/components/Loading";

export default function Rating() {
  const colorScheme = useColorModeValue("#000", "#fff");
  const {
    state: { selectedProduct },
  } = useProductContext();
  const { user } = useUserContext();
  const productId = selectedProduct?.id;
  const userId = user?.id;

  const { data, loading, error } = useGetAllReviewsQuery({
    variables: { productId: productId ? Number(productId) : undefined },
  });

  const { data: hasBookedData, loading: bookingLoading } = useHasUserBookedProductQuery({
    variables: { productId: productId ? Number(productId) : 0, userId: userId ? Number(userId) : 0 },
    skip: !productId || !userId,
  });

  const {
    comment,
    rate,
    editing,
    mutationLoading,
    setComment,
    setRate,
    setEditing,
    handleSubmit,
    handleEdit,
    handleDelete,
  } = useRatingLogic({ productId: productId ? Number(productId) : undefined, userId });

  if (loading || bookingLoading) return <Loading loading={true} />;
  if (error) return <Text>Error loading reviews</Text>;

  const userReview = data?.getAllReviews.find(review => review.user.id === userId);
  const otherReviews = data?.getAllReviews.filter(review => review.user.id !== userId) || [];

  const canUserReview = hasBookedData?.hasUserBookedProduct || false;

  const noReviews = !userReview && otherReviews.length === 0;

  return (
    <Box width="100%" px={{ base: 0, xl: "8rem" }} mt={{ base: "3rem", xl: "6rem" }}>
      <Text fontSize="22px" fontWeight="700">
        Customer reviews
      </Text>
      <Divider borderColor={colorScheme} borderWidth={1} my="20px" />

      {canUserReview ? (
        userReview ? (
          <>
            <Text fontSize="18px" fontWeight="700">
              Your Review
            </Text>
            <ReviewCard
              review={userReview}
              isEditable
              editing={editing}
              setComment={setComment}
              setRate={setRate}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSave={handleSubmit}
              isLoading={mutationLoading}
              onCancel={() => {
                setEditing(false);
                setComment(userReview.comment);
                setRate(userReview.rate);
              }}
            />
            <Divider borderColor={colorScheme} borderWidth={1} my="20px" />
          </>
        ) : (
          <RatingForm
            comment={comment}
            rate={rate}
            setComment={setComment}
            setRate={setRate}
            handleSubmit={handleSubmit}
            isLoading={mutationLoading}
          />
        )
      ) : null}

      {noReviews ? (
        <Text fontSize="18px" fontWeight="500" mt="20px" textAlign="center">
          This product has not yet been rated
        </Text>
      ) : (
        <Stack spacing={4} mt={4} justifyContent="center">
          {otherReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
