import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateReviewMutation } from "@/graphql/Review/generated/createReview.generated";
import { useDeleteReviewMutation } from "@/graphql/Review/generated/deleteReview.generated";
import { useUpdateReviewMutation } from "@/graphql/Review/generated/updateReview.generated";
import { GetAllReviewsDocument } from "@/graphql/Review/generated/getAllReviews.generated";

interface UseRatingLogicProps {
  productId: number | undefined;
  userId: number | undefined;
}

export const useRatingLogic = ({ productId, userId }: UseRatingLogicProps) => {
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editReviewId, setEditReviewId] = useState<number | null>(null);

  const handleMutationError = (error: Error) => {
    toast.error(`An error occurred: ${error.message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [createReviewMutation, { loading: mutationLoading }] = useCreateReviewMutation({
    onCompleted: () => {
      toast.success("Your review has been successfully submitted.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: handleMutationError,
    refetchQueries: [
      {
        query: GetAllReviewsDocument,
        variables: { productId: productId ? productId : undefined },
      },
    ],
  });

  const [deleteReviewMutation] = useDeleteReviewMutation({
    onCompleted: () => {
      toast.success("Your review has been successfully deleted.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: handleMutationError,
    refetchQueries: [
      {
        query: GetAllReviewsDocument,
        variables: { productId: productId ? productId : undefined },
      },
    ],
  });

  const [updateReviewMutation] = useUpdateReviewMutation({
    onCompleted: () => {
      toast.success("Your review has been successfully updated.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEditing(false);
      setEditReviewId(null);
      setComment("");
      setRate(0);
    },
    onError: handleMutationError,
    refetchQueries: [
      {
        query: GetAllReviewsDocument,
        variables: { productId: productId ? productId : undefined },
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !productId) return;

    try {
      if (editing && editReviewId !== null) {
        await updateReviewMutation({
          variables: {
            reviewId: editReviewId,
            data: { comment, rate },
          },
        });
      } else {
        await createReviewMutation({
          variables: {
            data: {
              comment,
              rate,
              product: { id: productId },
              userId: { id: userId },
            },
          },
        });
        setComment("");
        setRate(0);
      }
    } catch (error) {
      console.error("Error handling review:", error);
    }
  };

  const handleEdit = (review: any) => {
    setEditing(true);
    setEditReviewId(review.id);
    setComment(review.comment);
    setRate(review.rate);
  };

  const handleDelete = async (reviewId: number) => {
    try {
      await deleteReviewMutation({ variables: { reviewId } });
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return {
    comment,
    rate,
    editing,
    mutationLoading,
    setComment,
    setRate,
    handleSubmit,
    handleEdit,
    handleDelete,
    setEditing,
    setEditReviewId,
  };
};
