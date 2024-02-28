import { createContext, FC, useState, PropsWithChildren, useCallback, useEffect } from 'react';
import { sortedUniq, sortedUniqBy, uniq, intersection, chunk, sortBy } from 'lodash';
import { api } from '../utils/api';
import { Items } from '../types/Types';

type Search = {
  buttonDisabled: boolean;
  getProducts: {
    isLoading: boolean;
    products: string[];
  };
  getBrands: {
    isLoading: boolean;
    brands: string[];
  };
  getPrices: {
    isLoading: boolean;
    prices: number[];
  };
  getSearchResults: {
    mutate: (product?: string, brand?: string, price?: number) => void;
    isLoading: boolean;
    searchResults: Items[];
  };
};

export const SearchContext = createContext<Search>({
  buttonDisabled: true,  
  getProducts: {
    isLoading: false,
    products: [],
  },
  getBrands: {
    isLoading: false,
    brands: [],
  },
  getPrices: {
    isLoading: false,
    prices: [],
  },
  getSearchResults: {
    mutate: () => Promise.resolve(),
    isLoading: false,
    searchResults: [],
  },
});

export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Items[]>([]);

  const [isProductsLoading, setIsProductsLoading] = useState<boolean>(false);
  const [isBrandsLoading, setIsBrandsLoading] = useState<boolean>(false);
  const [isPricesLoading, setIsPricesLoading] = useState<boolean>(false);
  const [isSearchResultsLoading, setIsSearchResultsLoading] = useState<boolean>(false);

  const buttonDisabled = (isProductsLoading && isBrandsLoading && isPricesLoading) || isSearchResultsLoading;

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
      const sortedPrices = sortBy(res.result);
      if(sortedPrices) {
        setPrices(sortedPrices);
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
    api.getIds()
    .then((res) => {
      const uniqueIds = sortedUniq(res.result);
      setIds(uniqueIds);
    })
    .catch((err) => {
      console.log(err);
      setIds([]);
    })
  }, []);

  const getSearchResults = useCallback(async (product?: string, brand?: string, price?: number) => {
    setSearchResults([]);
    setIsSearchResultsLoading(true);
    Promise.all([
      api.filter("product", product),
      api.filter("brand", brand),
      api.filter("price", price) 
    ])
    .then(([ productIds, brandIds, priceIds ]) => {
      const result = intersection(
        (productIds.result.length > 0) ? productIds.result : ids,
        (brandIds.result.length > 0) ? brandIds.result : ids,
        (priceIds.result.length > 0) ? priceIds.result : ids
      );
      const uniqueIds = sortedUniq(result);
      if(uniqueIds.length > 100) {
        const chunks = chunk(uniqueIds, 100);
        const requests = chunks.map(chunk => api.getItems(chunk))
        Promise.all(requests)
        .then((res) => {
          const result = res.map(item => item.result).flat();
          const uniqueItems = sortedUniqBy(result, 'id');
          setSearchResults(searchResults => [...searchResults, ...uniqueItems]);
          setIsSearchResultsLoading(false);
        })
      } else {
        api.getItems(uniqueIds)
        .then((res) => {
          setSearchResults(res.result);
          setIsSearchResultsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setSearchResults([]);
          setIsSearchResultsLoading(false);
        })
      }
    })
    .catch((err) => {
      console.log(err);
      setSearchResults([]);
      setIsSearchResultsLoading(false);
    })
  }, [ids]);

  useEffect(() => {
    getIds();
    getProducts();
    getBrands();
    getPrices();
  }, [getIds, getProducts, getBrands, getPrices]);

  return (
    <SearchContext.Provider
      value={{ 
        buttonDisabled,
        getProducts: {
          isLoading: isProductsLoading,
          products,
        },
        getBrands: {
          isLoading: isBrandsLoading,
          brands,
        },
        getPrices: {
          isLoading: isPricesLoading,
          prices,
        },
        getSearchResults: {
          mutate: getSearchResults,
          isLoading: isSearchResultsLoading,
          searchResults,
        },
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
