import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface SearchBarProps {
    placeholder?: string;
    paramName?: string;
}

export default function SearchAdmin({ placeholder = 'Search...', paramName = 'search' }: SearchBarProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>('');

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
        const initialSearchTerm = router.query[paramName] || '';
        setSearchTerm(decodeURIComponent(initialSearchTerm as string));
    }, [router.query[paramName]]);

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

