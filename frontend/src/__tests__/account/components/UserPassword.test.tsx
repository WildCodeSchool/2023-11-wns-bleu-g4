import { MockedProvider } from "@apollo/client/testing";
import UserPassword from "../../../features/account/profile/components/UserPassword";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("UserPassword", () => {
  describe("Heading", () => {
    it("should display Password title", () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <UserPassword />
        </MockedProvider>,
      );
      expect(screen.getByRole("heading", { level: 2, name: "PASSWORD" })).toBeInTheDocument();
    });
  });
  describe("button", () => {
    it("should display a button", () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <UserPassword />
        </MockedProvider>,
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
    it("should display a modal", () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <UserPassword />
        </MockedProvider>,
      );

      const button: HTMLElement = screen.queryByRole("button", { name: "Modify" }) as HTMLElement;
      fireEvent.click(button);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});
