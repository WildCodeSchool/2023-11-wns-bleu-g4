import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import RatingForm from "@/features/product/rating/components/form/RatingForm";

describe("RatingForm", () => {
  let comment: string;
  let rate: number;
  let setComment: React.Dispatch<React.SetStateAction<string>>;
  let setRate: React.Dispatch<React.SetStateAction<number>>;
  let handleSubmit: (e: React.FormEvent) => void;
  let isLoading: boolean;

  beforeEach(() => {
    comment = "";
    rate = 0;
    setComment = jest.fn();
    setRate = jest.fn();
    handleSubmit = jest.fn(e => e.preventDefault());
    isLoading = false;

    render(
      <RatingForm
        comment={comment}
        rate={rate}
        setComment={setComment}
        setRate={setRate}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />,
    );
  });

  test("renders the form with rating and comment fields", () => {
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comment/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  test("allows the user to rate by clicking stars", () => {
    const stars = screen.getAllByRole("button");
    fireEvent.click(stars[2]);

    expect(setRate).toHaveBeenCalledWith(3);
  });

  test("allows the user to type a comment", () => {
    const textarea = screen.getByPlaceholderText(/Write your review here.../i);
    fireEvent.change(textarea, { target: { value: "Great product!" } });

    expect(setComment).toHaveBeenCalledWith("Great product!");
  });

  test("submits the form", () => {
    const submit = screen.getByTitle("submit");
    fireEvent.submit(submit);

    expect(handleSubmit).toHaveBeenCalled();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <RatingForm
        comment={comment}
        rate={rate}
        setComment={setComment}
        setRate={setRate}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
