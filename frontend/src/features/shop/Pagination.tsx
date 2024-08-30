import { Button, HStack, Text } from "@chakra-ui/react";

type PaginationProps = {
    page: number;
    setPage: (newPage: number) => void;
    maxPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ page, setPage, maxPages }) => {
    const getVisiblePages = () => {
        const pages = [];
        const maxVisiblePages = 5;
        const halfVisible = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(0, page - halfVisible);
        let endPage = Math.min(maxPages - 1, page + halfVisible);

        if (page - halfVisible < 0) {
            endPage = Math.min(maxPages - 1, endPage + (halfVisible - page));
        }

        if (page + halfVisible >= maxPages) {
            startPage = Math.max(0, startPage - (page + halfVisible - maxPages + 1));
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pages = getVisiblePages();

    return (
        <HStack spacing={2} justifyContent="center">
            <Button
                onClick={() => setPage(page - 1)}
                isDisabled={page <= 0}
            >
                Prev
            </Button>
            {pages[0] > 0 && (
                <>
                    <Button onClick={() => setPage(0)}>1</Button>
                    {pages[0] > 1 && <Text>...</Text>}
                </>
            )}
            {pages.map((pageNum) => (
                <Button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    isActive={pageNum === page}
                >
                    {pageNum + 1}
                </Button>
            ))}
            {pages[pages.length - 1] < maxPages - 1 && (
                <>
                    {pages[pages.length - 1] < maxPages - 2 && <Text>...</Text>}
                    <Button onClick={() => setPage(maxPages - 1)}>{maxPages}</Button>
                </>
            )}
            <Button
                onClick={() => setPage(page + 1)}
                isDisabled={page >= maxPages - 1}
            >
                Next
            </Button>
        </HStack>
    );
};

export default Pagination;
