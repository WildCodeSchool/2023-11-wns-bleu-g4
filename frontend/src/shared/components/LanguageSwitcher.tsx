import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

export default function LanguageSwitcher(): JSX.Element {
  const router = useRouter();
  const { locale } = router;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value;
    router.push(router.pathname, router.asPath, { locale: selectedLocale });
  };

  return (
    <Select value={locale} onChange={handleChange} variant="filled" width="fit-content">
      <option value="en">🇺🇸</option>
      <option value="fr">🇫🇷</option>
    </Select>
  );
}
