import { Flex } from "@chakra-ui/react";
import FaqComponent from "./components/FaqComponent";
import { FaqSideTitle } from "./components/FaqSideTitle";

export default function FaqSection() {
    return (
        <Flex flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" className="p-5 lg:p-24">
            <FaqSideTitle />
            <FaqComponent />
        </Flex>

    );
}