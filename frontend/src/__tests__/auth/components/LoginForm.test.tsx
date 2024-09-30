import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "@/features/auth/login/LoginForm";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { toast } from 'react-toastify';
import { LoginDocument } from "@/graphql/User/generated/Login.generated";
import { GraphQLError } from "graphql";

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error  : jest.fn(),
    },
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));


describe("LoginForm", () => {
    it("should display a Login Form component", () => {
        const loginForm = render(
            <MockedProvider mocks = {[]} addTypename = {false}>
                <LoginForm />
            </MockedProvider>
        );
        expect(loginForm).toMatchSnapshot();
    });

    it("should show error toast when clicking login button with invalid credentials", async () => {
        const mocks: MockedResponse[] = [
            {
                request: {
                    query    : LoginDocument,
                    variables: { "data": { "email": "user@example.com", "password": "password123" } }
                },
                result: {
                    data   : null,
                    errors : [new GraphQLError("INVALID CREDENTIALS")],
                    context: undefined
                },
            },
        ];

        render(
            <MockedProvider mocks = {mocks} addTypename = {false}>
                <LoginForm />
            </MockedProvider>
        );

        const emailInput    = screen.getByPlaceholderText(/Email/i);
        const passwordInput = screen.getByPlaceholderText(/Password/i);
        const button        = screen.getByRole("button", { name: /Login/i });

        fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(
                expect.stringContaining("INVALID CREDENTIALS"),
                expect.objectContaining({
                    autoClose      : 2000,
                    closeOnClick   : true,
                    draggable      : true,
                    hideProgressBar: false,
                    pauseOnHover   : true,
                    position       : "bottom-right",
                    theme          : "colored"
                })
            );
        });
    });
});