import { createContext, FC, useState, PropsWithChildren, useCallback, useEffect } from 'react';
import { sortedUniq, sortedUniqBy, uniq, min, max } from 'lodash';
import { api } from '../utils/api';
import { Items } from '../types/Types';

type Search = {
  products: string[];
  brands: string[];
  prices: number[];
  ids: string[];
  items: Items[];
  getProducts: {
    mutate: (data: string[]) => void;
    isLoading: boolean;
  };
  getBrands: {
    mutate: (data: string[]) => void;
    isLoading: boolean;
  };
  getPrices: {
    mutate: (data: string[]) => void;
    isLoading: boolean;
  };
  getIds: {
    mutate: () => void;
    isLoading: boolean;
  };
  getItems: {
    mutate: (data: string[]) => void;
    isLoading: boolean;
  };
};

export const SearchContext = createContext<Search>({
  products: [],
  brands: [],
  prices: [],
  ids: [],
  items: [],
  getProducts: {
    mutate: () => Promise.resolve(),
    isLoading: false,
  },
  getBrands: {
    mutate: () => Promise.resolve(),
    isLoading: false,
  },
  getPrices: {
    mutate: () => Promise.resolve(),
    isLoading: false,
  },
  getIds: {
    mutate: () => Promise.resolve(),
    isLoading: false,
  },
  getItems: {
    mutate: () => Promise.resolve(),
    isLoading: false,
  },
});

export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [items, setItems] = useState<Items[]>([]);

  const [isProductsLoading, setIsProductsLoading] = useState<boolean>(false);
  const [isBrandsLoading, setIsBrandsLoading] = useState<boolean>(false);
  const [isPricesLoading, setIsPricesLoading] = useState<boolean>(false);
  const [isIdsLoading, setIsIdsLoading] = useState<boolean>(false);
  const [isItemsLoading, setIsItemsLoading] = useState<boolean>(false);

  const getProducts = useCallback(() => {
    setIsProductsLoading(true);
    api.getFields("product")
    .then((res) => {
      const uniqueNames = uniq(res.result);
      setProducts(uniqueNames);
      setIsProductsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setProducts([]);
      setIsProductsLoading(false);
    })
  }, []);

  const getBrands = useCallback(() => {
    setIsBrandsLoading(true);
    api.getFields("brand")
    .then((res) => {
      const uniqueNames = uniq(res.result);
      setBrands(uniqueNames);
      setIsBrandsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setBrands([]);
      setIsBrandsLoading(false);
    })
  }, []);

  const getPrices = useCallback(() => {
    setIsPricesLoading(true);
    api.getFields("price")
    .then((res) => {
      const minPrice = parseInt(min(res.result) as string);
      const maxPrice = parseInt(max(res.result) as string);
      if(minPrice && maxPrice) {
        setPrices([minPrice, maxPrice]);
        setIsPricesLoading(false);
      } else {
        setPrices([0, 100]);
        setIsPricesLoading(false);
      }
      
    })
    .catch((err) => {
      console.log(err);
      setPrices([]);
      setIsPricesLoading(false);
    })
  }, []);

  const getIds = useCallback(() => {
    setIsIdsLoading(true);
    api.getIds()
    .then((res) => {
      const uniqueIds = sortedUniq(res.result);
      setIds(uniqueIds);
      setIsIdsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setIds([]);
      setIsIdsLoading(false);
    })
  }, []);

  const getItems = useCallback((data: string[]) => {
    setIsItemsLoading(true);
    api.getItems(data)
    .then((res) => {
      const uniqueItems = sortedUniqBy(res.result, 'id')
      setItems(items => [...items, ...uniqueItems]);
      setIsItemsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setItems([]);
      setIsItemsLoading(false);
    })
  }, []);

  useEffect(() => {
    getProducts();
    getBrands();
    getPrices();
  }, [getProducts, getBrands, getPrices]);

  /* useEffect(() => {
    getIds();
  }, [getIds]);

  useEffect(() => {
    if(!isIdsLoading) {
      const chunks = chunk(ids, 100);
      chunks.forEach((chunk) => {
        getItems(chunk);
      })
    } else return
  }, [isIdsLoading, ids, getItems]); */

  return (
    <SearchContext.Provider
      value={{
        products,
        brands,
        prices,
        ids,
        items,
        getProducts: {
          mutate: getProducts,
          isLoading: isProductsLoading,
        },
        getBrands: {
          mutate: getBrands,
          isLoading: isBrandsLoading,
        },
        getPrices: {
          mutate: getPrices,
          isLoading: isPricesLoading,
        },
        getIds: {
          mutate: getIds,
          isLoading: isIdsLoading,
        },
        getItems: {
          mutate: getItems,
          isLoading: isItemsLoading,
        },
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
