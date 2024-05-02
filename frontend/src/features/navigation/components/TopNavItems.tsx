import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const navItems = [
  {
    title: "Sea",
    links: [
      { text: "Option 1", href: "#" },
      { text: "Option 2", href: "#" },
      { text: "Option 3", href: "#" },
    ],
  },
  {
    title: "Mountain",
    links: [
      { text: "Option 1", href: "#" },
      { text: "Option 2", href: "#" },
      { text: "Option 3", href: "#" },
    ],
  },
  {
    title: "Outdoor",
    links: [
      { text: "Option 1", href: "#" },
      { text: "Option 2", href: "#" },
      { text: "Option 3", href: "#" },
    ],
  },
];

export default function TopNavItems() {
  return (
    <Accordion allowToggle>
      {navItems.map((item, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton borderBottom="1px solid" pt="2" borderTop={"none"}>
              <Box as="span" flex="1" textAlign="left">
                {item.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={0} display="flex" flexDirection="column">
            {item.links.map((link, idx) => (
              <>
                <Flex key={idx} py={4}>
                  <Link href={link.href}>{link.text} </Link>
                  <Spacer />
                  <ChevronRightIcon width={18} />
                </Flex>
                {idx < item.links.length - 1 && <Divider borderColor="gray.400" />}
              </>
            ))}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
