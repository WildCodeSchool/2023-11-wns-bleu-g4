import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import DrawerExample from "../components/drawer";

describe("DrawerExample", () => {
	it("renders correctly", () => {
		const view = render(<DrawerExample />);
		expect(screen.getByText(/Create your account/)).toBeInTheDocument();
	});
});
