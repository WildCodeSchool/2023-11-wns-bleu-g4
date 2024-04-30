import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface SearchBarProps {
	onSearch: (query: string) => void;
	placeholder: string;
}

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
	const [query, setQuery] = useState("");
	const [isInputEmpty, setIsInputEmpty] = useState(true);

	const handleSearch = () => {
		onSearch(query);
	};

	const handleClearInput = () => {
		setQuery("");
		setIsInputEmpty(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		setIsInputEmpty(e.target.value === "");
	};

	const handleIconClick = () => {
		if (query.trim() !== "") {
			handleSearch();
		}
	};

	return (
		<div className=" relative flex h-full w-1/2 items-center justify-end">
			<input
				type="search"
				placeholder={placeholder}
				className=" flex h-12 w-3/4 items-center rounded-full border-b-2 border-accent bg-neutral-100 px-4 py-1 pr-20 text-base text-black focus:border-2 focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:hidden"
				value={query}
				onChange={handleInputChange}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleSearch();
					}
				}}
			/>
			{!isInputEmpty && (
				<div
					className="absolute right-11 top-1/2 -translate-y-1/2 transform cursor-pointer"
					onClick={handleClearInput}
				>
					<XMarkIcon className="dark h-6 w-6" />
				</div>
			)}
			<div
				className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
				onClick={handleIconClick}
			>
				<MagnifyingGlassIcon className="dark h-6 w-6" />
			</div>
		</div>
	);
}
