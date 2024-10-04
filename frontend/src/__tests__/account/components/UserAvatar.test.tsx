import { User } from "@/features/account/types";
import UserAvatar from "../../../features/account/profile/components/UserAvatar";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

export const userTest: User = {
  id: 1,
  name: "Loïc",
  firstname: "Hernandez",
  email: "loic.hernandez@sfr.fr",
  address: "14 rue des érables",
  avatar: "***",
  city: "Merville",
  country: "France",
  phone: "0102030405",
  postcode: "31330",
  role: "CUSTOMER",
};

describe("UserAvatar", () => {
  it("render a heading in a user component", () => {
    render(<UserAvatar user={userTest} />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it("render name and firstname in a user component's heading", () => {
    render(<UserAvatar user={userTest} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Hernandez");
  });

  it("render name and firstname in a user component's heading", () => {
    render(<UserAvatar user={userTest} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should display an avatar component", () => {
    const comp = render(<UserAvatar user={userTest} />);
    expect(comp).toMatchSnapshot();
  });
});
