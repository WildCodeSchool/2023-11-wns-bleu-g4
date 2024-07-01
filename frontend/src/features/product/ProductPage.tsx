import { Box } from '@chakra-ui/react';
import DetailsComponent from './detailsComponent/DetailsComponent';
import GaleryComponent from './galeryComponent/GaleryComponent';
import { useProductContext } from '@/context/ProductPageContext';


const ProductPage: React.FC = () => {
  const { selectedProduct, agencies } = useProductContext();

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      className="p-5 lg:px-24 lg:pb-24">
      <GaleryComponent />
      {selectedProduct && agencies.length > 0 ? (
        <DetailsComponent />
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
};

export default ProductPage;
