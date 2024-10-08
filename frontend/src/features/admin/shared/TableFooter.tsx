import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { TableFooterProps } from "../product/types";
import { useTranslation } from "react-i18next";

export default function TableFooter({
  data,
  startIndex,
  endIndex,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}: TableFooterProps) {
  const { t } = useTranslation("TableFooter");

  const totalPages = Math.ceil(data / itemsPerPage);

  const handlePreviousClick = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex w-full items-center justify-between rounded border border-gray-400 p-4 mt-2">
      <div className="flex items-center">
        <span className="text-sm">
          Showing{" "}
          <span className="font-bold">
            {startIndex + 1}-{Math.min(data ?? 0, endIndex)}
          </span>{" "}
          of <span className="font-bold">{data ?? 0}</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Button
          as={Button}
          size="sm"
          leftIcon={<ChevronLeftIcon width={20} />}
          variant="adminFooterButton"
          alignItems={"center"}
          onClick={handlePreviousClick}
        >
          {t("Previous")}
        </Button>
        <Button
          as={Button}
          size="sm"
          rightIcon={<ChevronRightIcon width={20} />}
          variant="adminFooterButton"
          alignItems={"center"}
          onClick={handleNextClick}
        >
          {t("Next")}
        </Button>
      </div>
    </div>
  );
}
