import UserInfos from "../../../features/account/profile/components/UserInfos";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { User } from "@/features/account/types";

export const userTest: User = {
    id       : 1,
    name     : "Loïc",
    firstname: "Hernandez",
    email    : "loic.hernandez@sfr.fr",
    address  : "14 rue des érables",
    avatar   : "***",
    city     : "Merville",
    country  : "France",
    phone    : "0102030405",
    postcode : "31330",
    role     : "CUSTOMER"
}


describe("UserInfo", () => {
      /** Headings */
    describe("Heading address", () => {
        it("should display an address title", () => {
            render(
                <MockedProvider mocks = {[]} addTypename = {false}>
                <UserInfos      user  = {userTest} />
                </MockedProvider>
            );
            expect(screen.getByRole("heading", { level: 2, name: "ADDRESS" })).toBeInTheDocument()
        })
    })
    describe("Heading contact", () => {
        it("should display a contact title", () => {
            render(
                <MockedProvider mocks = {[]} addTypename = {false}>
                <UserInfos      user  = {userTest} />
                </MockedProvider>
            );
            expect(screen.getByRole("heading", { level: 2, name: "CONTACT" })).toBeInTheDocument()
        })
    })

      /** User infos */
    describe("City", () => {
        it("should display a city", () => {
            render(
                <MockedProvider mocks = {[]} addTypename = {false}>
                <UserInfos      user  = {userTest} />
                </MockedProvider>
            );
            expect(screen.getByText("Merville")).toBeInTheDocument()
        })
    })
    describe("email", () => {
        it("should display an email", () => {
            render(
                <MockedProvider mocks = {[]} addTypename = {false}>
                <UserInfos      user  = {userTest} />
                </MockedProvider>
            );
            expect(screen.getByText("loic.hernandez@sfr.fr")).toBeInTheDocument()
        })
    })
    describe("address", () => {
        it("should display an address", () => {
            render(
                <MockedProvider mocks = {[]} addTypename = {false}>
                <UserInfos      user  = {userTest} />
                </MockedProvider>
            );
            expect(screen.getByText("14 rue des érables")).toBeInTheDocument()
        })
    })
    describe("country", () => {
        it("should display a country", () => {
            render(
                <MockedProvider mocks = {[]} addTypename = {false}>
                <UserInfos      user  = {userTest} />
                </MockedProvider>
            );
            expect(screen.getByText("France")).toBeInTheDocument()
        })
    })
    describe("phone", () => {
        it("should display a phone number", () => {
            render(
                <MockedProvider mocks = {[]} addTypename = {false}>
                <UserInfos      user  = {userTest} />
                </MockedProvider>
            );
            expect(screen.getByText("0102030405")).toBeInTheDocument()
        })
    })
    describe("post code", () => {
        it("should display a post code", () => {
            render(
                <MockedProvider mocks = {[]} addTypename = {false}>
                <UserInfos      user  = {userTest} />
                </MockedProvider>
            );
            expect(screen.getByText("31330")).toBeInTheDocument()
        })
    })
    
    
      /** Buttons */
    describe("Button Update", () => {
        it("should find update button", () => {
            render(
                <MockedProvider mocks = {[]} addTypename = {false}>
                <UserInfos      user  = {userTest} />
                </MockedProvider>
            );
            expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument()
        })
    })
    describe("Wrong Button", () => {
        it("should not find delete account button", () => {
            render(
                <MockedProvider mocks = {[]} addTypename = {false}>
                <UserInfos      user  = {userTest} />
                </MockedProvider>
            );
            expect(screen.queryByRole("button", { name: "delete acount" })).not.toBeInTheDocument()
        })
    })
    
    describe("Button Update Modal", () => {
        it("should click and display modal", () => {
            render(
                <MockedProvider mocks = {[]} addTypename = {false}>
                <UserInfos      user  = {userTest} />
                </MockedProvider>
            );
            const button: HTMLElement = screen.queryByRole("button", { name: "Update" }) as HTMLElement
            fireEvent.click(button);
            const modal = screen.getByRole('dialog');
            expect(modal).toBeInTheDocument();
        })
    })
    describe("Button Delete Modal", () => {
        it("should click and display modal", () => {
            render(
                <MockedProvider mocks = {[]} addTypename = {false}>
                <UserInfos      user  = {userTest} />
                </MockedProvider>
            );
            const button: HTMLElement = screen.queryByRole("button", { name: "Delete Account" }) as HTMLElement
            fireEvent.click(button);
            const modal = screen.getByRole('dialog');
            expect(modal).toBeInTheDocument();
        })
    })
})