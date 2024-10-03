import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const MotionAccordionItem = motion(AccordionItem);

export default function Faq() {
  const { t } = useTranslation("faq");
  const data = [
    {
      title: t("question1"),
      content: t("answer1"),
    },
    {
      title: t("question2"),
      content: t("answer2"),
    },
    {
      title: t("question3"),
      content: t("answer3"),
    },
    {
      title: t("question4"),
      content: t("answer4"),
    },
    {
      title: t("question5"),
      content: t("answer5"),
    },
  ];

  return (
    <Accordion allowToggle reduceMotion={false} variant="faq" w={{ base: "100%", xl: "60%" }} overflow="hidden">
      {data.map((item, index) => (
        <MotionAccordionItem
          key={index}
          mb={{ base: 4, md: 8 }}
          initial={{ x: "100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" mr={4} fontSize={{ base: "16px", xl: "24px" }}>
                    {t(item.title)}
                  </Box>
                  <svg
                    style={{
                      transform: isExpanded ? "rotate(45deg)" : "rotate(180deg)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M16.75 0.416504L9.25 0.416504V9.15025H0.5L0.5 16.6503H9.25V25.384H16.75V16.6503H25.5V9.15025H16.75V0.416504Z"
                      fill="#E66300"
                    />
                  </svg>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} fontSize={{ base: "16px", xl: "24px" }}>
                {t(item.content)}
              </AccordionPanel>
            </>
          )}
        </MotionAccordionItem>
      ))}
    </Accordion>
  );
}
