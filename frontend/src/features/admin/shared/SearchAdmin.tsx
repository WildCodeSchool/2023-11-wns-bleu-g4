import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  paramName?: string;
}

export default function SearchAdmin({ placeholder = "Search...", paramName = "search" }: SearchBarProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();
    const queryParams = new URLSearchParams(router.query as Record<string, string>);

    trimmedSearchTerm ? queryParams.set(paramName, trimmedSearchTerm) : queryParams.delete(paramName);

    router.push({
      pathname: router.pathname,
      search: queryParams.toString(),
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedSearchTerm = searchTerm.trim();
      const queryParams = new URLSearchParams(router.query as Record<string, string>);

      trimmedSearchTerm ? queryParams.set(paramName, trimmedSearchTerm) : queryParams.delete(paramName);

      router.push({
        pathname: router.pathname,
        search: queryParams.toString(),
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const initialSearchTerm = router.query[paramName] || "";
    setSearchTerm(decodeURIComponent(initialSearchTerm as string));
  }, [router.query[paramName]]);

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="p-2 border border-gray-200 dark:border-gray-600 rounded relative pl-10 w-72"
      />
      <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 ml-2 absolute" />
    </form>
  );
}
