import { createContext } from 'react';

const ProductIdContext = createContext('');

export const ProductIdProvider = ProductIdContext.Provider;
export const ProductIdConsumer = ProductIdContext.Consumer;

export default ProductIdContext;
