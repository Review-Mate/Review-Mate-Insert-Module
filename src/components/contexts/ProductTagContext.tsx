import { createContext } from 'react';

interface ProductTagContextType {
  selectedTag: string;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
  selectedBigTag: string;
  setSelectedBigTag: React.Dispatch<React.SetStateAction<string>>;
}

const ProductTagContext = createContext<ProductTagContextType>({
  selectedTag: '',
  setSelectedTag: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  selectedBigTag: '',
  setSelectedBigTag: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});

export const ProductTagProvider = ProductTagContext.Provider;
export const ProductTagConsumer = ProductTagContext.Consumer;

export default ProductTagContext;
