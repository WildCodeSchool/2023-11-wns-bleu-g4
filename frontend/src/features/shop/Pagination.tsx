import { Button, HStack } from "@chakra-ui/react";

type PaginationProps = {
    page: number;
    setPage: (newPage: number) => void;
    maxPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ page, setPage, maxPages }) => {
    const pages = Array.from({ length: maxPages }, (_, i) => i);

    return (
        <HStack spacing={2} justifyContent="center">
            <Button onClick={() => setPage(page - 1)} isDisabled={page <= 0}>
                Prev
            </Button>
            {pages.map((pageNum) => (
                <Button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    isActive={pageNum === page}
                    variant={pageNum === page ? 'solid' : 'disable'}
                >
                    {pageNum + 1}
                </Button>
            ))}
            <Button onClick={() => setPage(page + 1)} isDisabled={page >= maxPages - 1}>
                Next
            </Button>
        </HStack>
    );
};

export default Pagination;
