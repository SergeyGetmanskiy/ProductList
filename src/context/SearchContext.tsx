import { createContext, FC, useState, PropsWithChildren, useCallback, useEffect } from 'react';
import { sortedUniq, sortedUniqBy, chunk } from 'lodash';
import { api } from '../utils/api';
import { Items } from '../types/Types';

type Search = {
  ids: string[];
  items: Items[];
  getIds: {
    mutate: () => void;
    isLoading: boolean;
    errorMessage: string | null;
  };
  getItems: {
    mutate: (data: string[]) => void;
    isLoading: boolean;
    errorMessage: string | null;
  };
};

export const SearchContext = createContext<Search>({
  ids: [],
  items: [],
  getIds: {
    mutate: () => Promise.resolve(),
    isLoading: false,
    errorMessage: null,
  },
  getItems: {
    mutate: () => Promise.resolve(),
    isLoading: false,
    errorMessage: null,
  },
});

export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [ids, setIds] = useState<string[]>([]);
  const [items, setItems] = useState<Items[]>([]);
  const [getIdsErrorMessage, setGetIdsErrorMessage] = useState<string | null>(null);
  const [getItemsErrorMessage, setGetItemsErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getIds = useCallback(() => {
    setIsLoading(true);
    setGetIdsErrorMessage(null);
    api.getIds()
    .then((res) => {
      const uniqueIds = sortedUniq(res.result);
      setIds(uniqueIds);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setGetIdsErrorMessage(err);
      setIds([]);
      setIsLoading(false);
    })
  }, []);

  const getItems = useCallback((data: string[]) => {
    setIsLoading(true);
    setGetItemsErrorMessage(null);
    api.getItems(data)
    .then((res) => {
      const uniqueItems = sortedUniqBy(res.result, 'id')
      setItems(items => [...items, ...uniqueItems]);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setGetItemsErrorMessage(err);
      setItems([]);
      setIsLoading(false);
    })
  }, []);

useEffect(() => {
    const chunks = chunk(ids, 100);
    chunks.forEach((chunk) => {
      getItems(chunk);
    })
  }, [ids]);

  return (
    <SearchContext.Provider
      value={{
        ids,
        items,
        getIds: {
          mutate: getIds,
          isLoading,
          errorMessage: getIdsErrorMessage,
        },
        getItems: {
          mutate: getItems,
          isLoading,
          errorMessage: getItemsErrorMessage,
        },
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
