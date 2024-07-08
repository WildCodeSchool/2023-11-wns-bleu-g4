import { useProductContext } from '@/context/ProductPageContext';
import { Box, Flex } from '@chakra-ui/react';
import DetailsComponent from './detailsComponent/DetailsComponent';
import GaleryComponent from './galeryComponent/GaleryComponent';
import Rating from './rating/Rating';


const ProductPage: React.FC = () => {
  const { state: { selectedProduct, agencies } } = useProductContext();

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      className="p-5 lg:px-24 lg:pb-24">
      <Flex flexDirection="row" justifyContent="space-between">
        <GaleryComponent />
        {selectedProduct && agencies.length > 0 ? (
          <DetailsComponent />
        ) : (
          <p>Loading...</p>
        )}
      </Flex>
      <Flex >
        <Rating />
      </Flex>
    </Box>
  );
};

export default ProductPage;
