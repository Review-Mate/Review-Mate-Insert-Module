import { createContext } from 'react';

interface ProductIdContextType {
  partnerProductId: string;
  partnerDomain: string;
}

const ProductIdContext = createContext<ProductIdContextType>({
  partnerProductId: '',
  partnerDomain: '',
});

export const ProductIdProvider = ProductIdContext.Provider;

export default ProductIdContext;
