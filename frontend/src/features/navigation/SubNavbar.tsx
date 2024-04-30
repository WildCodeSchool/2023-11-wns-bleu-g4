import { useDisclosure, useOutsideClick } from "@chakra-ui/react";
import { useRef, useState } from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Stack, Flex,
} from '@chakra-ui/react';
import {ChevronDownIcon, ShoppingCartIcon} from "@heroicons/react/16/solid";


// data for the subnavbar
const categories = {
    'Sea':  ['Option 1', 'Option 2', 'Option 3'],
    'Mountain': ['Option 1', 'Option 2', 'Option 3'],
    'Outdoor': ['Option A', 'Option B', 'Option C']
};

export default function SubNavbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    useOutsideClick({
        ref: ref,
        handler: () => onClose()
    });

    const handleButtonClick = (index: number) => {
        if (activeIndex === index) {
            onClose();
            setActiveIndex(null);
        } else {
            onOpen();
            setActiveIndex(index);
        }
    };

    return (
        <Flex className="h-8 shadow-md w-full justify-between px-5 pb-12 mb-5" ref={ref}>
            <Stack direction="row" spacing={4}>
                {Object.entries(categories).map(([category, items], index) => (
                    <Menu key={index} isOpen={isOpen && activeIndex === index}>
                        <MenuButton as={Button}
                                    size="sm"
                                    variant="subNavButton"
                                    borderRadius='md'
                                    borderWidth='1px'
                                    onClick={() => handleButtonClick(index)}
                                    rightIcon={
                                        <div
                                            className={`transform transition-transform duration-300 ${isOpen && activeIndex === index ? 'rotate-custom' : ''}`} style={{ transform: isOpen && activeIndex === index ? 'rotate(-180deg)' : 'rotate(0)' }}>
                                            <ChevronDownIcon width={24}/>
                                        </div>
                                    }
                                    py={4}
                        >
                            {category}
                        </MenuButton>
                        <MenuList>
                            {items.map((item, i) => (
                                <MenuItem
                                    key={i}>{item}</MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                ))}
            </Stack>
            <Button size="sm"
                    as={Button}
                    borderRadius="md"
                    borderWidth="1px"
                    variant="cartButton"
                    leftIcon={<ShoppingCartIcon width={18} />}>
                My basket
            </Button>
        </Flex>
    )
};