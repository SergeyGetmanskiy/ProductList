import { createContext, FC, useState, PropsWithChildren, useCallback, useEffect } from 'react';
import { sortedUniq, sortedUniqBy, uniq, intersection, chunk, sortBy } from 'lodash';
import { api } from '../utils/api';
import { Items } from '../types/Types';

type Search = {
  isLoading: boolean;
  getOptions: {
    isLoading: boolean;
    products: string[];
    brands: string[];
    prices: number[];
    message: string | '';
  };
  getSearchResults: {
    mutate: (product: string, brand: string, price: number) => void;
    isLoading: boolean;
    searchResults: Items[];
    message: string | '';
  };
};

export const SearchContext = createContext<Search>({
  isLoading: false,  
  getOptions: {
    isLoading: false,
    products: [],
    brands: [],
    prices: [],
    message: '',
  },
  getSearchResults: {
    mutate: () => Promise.resolve(),
    isLoading: false,
    searchResults: [],
    message: '',
  },
});

export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Items[]>([]);
  const [optionsMessage, setOptionsMessage] = useState<string>('');
  const [searchResultsMessage, setSearchResultsMessage] = useState<string>('');

  const [isOptionsLoading, setIsOptionsLoading] = useState<boolean>(false);
  const [isSearchResultsLoading, setIsSearchResultsLoading] = useState<boolean>(false);

  const isLoading = isOptionsLoading || isSearchResultsLoading;
  
  const getSearchResults = useCallback(async (product: string, brand: string, price: number) => {
    const handleError = (err: Error) => {
      console.log(err);
      setSearchResults([]);
      setIsSearchResultsLoading(false);
      setSearchResultsMessage('Произошла ошибка. Нажмите на "Поиск" ещё раз.');
    }
    setSearchResults([]);
    setIsSearchResultsLoading(true);
    setSearchResultsMessage('');
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
      if (uniqueIds.length === 0) {
        setSearchResults([]);
        setIsSearchResultsLoading(false);
        setSearchResultsMessage('Ничего не найдено.')
      } else if(uniqueIds.length > 100) {
        const chunks = chunk(uniqueIds, 100);
        const requests = chunks.map(chunk => api.getItems(chunk))
        Promise.all(requests)
        .then((res) => {
          const result = res.map(item => item.result).flat();
          const uniqueItems = sortedUniqBy(result, 'id');
          setSearchResults(searchResults => [...searchResults, ...uniqueItems]);
          setIsSearchResultsLoading(false);
        })
        .catch((err) => {
          handleError(err);
        })
      } else {
        api.getItems(uniqueIds)
        .then((res) => {
          setSearchResults(res.result);
          setIsSearchResultsLoading(false);
        })
        .catch((err) => {
          handleError(err);
        })
      }
    })
    .catch((err) => {
      handleError(err);
    })
  }, [ids]);

  useEffect(() => {
    setIsOptionsLoading(true);
    setOptionsMessage('');
    Promise.all([
      api.getIds(),
      api.getFields("product"),
      api.getFields("brand"),
      api.getFields("price"),
    ])
    .then(([ ids, products, brands, prices ]) => {
      const uniqueIds = sortedUniq(ids.result);
      const uniqueProducts = uniq(products.result);
      const uniqueBrands = uniq(brands.result);
      const sortedPrices = sortBy(prices.result).map((price) => parseInt(price));
      setIds(uniqueIds);
      setProducts(uniqueProducts);
      setBrands(uniqueBrands);
      if(sortedPrices) {
        setPrices(sortedPrices);
      } else {
        setPrices([0, 100]);
      }
      setIsOptionsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setOptionsMessage("Произошла ошибка. Перезагрузите страницу.")
      setIsOptionsLoading(false);
    })
  }, []);

  return (
    <SearchContext.Provider
      value={{ 
        isLoading,
        getOptions: {
          isLoading: isOptionsLoading,
          products,
          brands,
          prices,
          message: optionsMessage,
        },
        getSearchResults: {
          mutate: getSearchResults,
          isLoading: isSearchResultsLoading,
          searchResults,
          message: searchResultsMessage,
        },
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
