import { CircularProgress } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Loading({ loading }: { loading: boolean }) {
  const { t } = useTranslation("Loader");
  return (
    loading && (
      <div className="flex gap-4 justify-center items-center">
        <CircularProgress isIndeterminate color="#91B195" />
        {t("Loading...")}
      </div>
    )
  );
}
