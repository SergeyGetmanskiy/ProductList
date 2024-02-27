import { createContext, FC, useState, PropsWithChildren, useCallback, useEffect } from 'react';
import { sortedUniq, sortedUniqBy, chunk } from 'lodash';
import { api } from '../utils/api';
import { Items } from '../types/Types';

type Search = {
  ids: string[] | null;
  items: Items[] | null;
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
  ids: null,
  items: null,
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
  const [ids, setIds] = useState<string[]>(null);
  const [items, setItems] = useState<Items[]>([]);
  const [getIdsErrorMessage, setGetIdsErrorMessage] = useState<string | null>(null);
  const [getItemsErrorMessage, setGetItemsErrorMessage] = useState<string | null>(null);
  const [isIdsLoading, setIsIdsLoading] = useState<boolean>(false);
  const [isItemsLoading, setIsItemsLoading] = useState<boolean>(false);

  const getIds = useCallback(() => {
    setIsIdsLoading(true);
    setGetIdsErrorMessage(null);
    api.getIds()
    .then((res) => {
      const uniqueIds = sortedUniq(res.result);
      setIds(uniqueIds);
      setIsIdsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setGetIdsErrorMessage(err);
      setIds([]);
      setIsIdsLoading(false);
    })
  }, []);

  const getItems = useCallback((data: string[]) => {
    setIsItemsLoading(true);
    setGetItemsErrorMessage([]);
    api.getItems(data)
    .then((res) => {
      const uniqueItems = sortedUniqBy(res.result, 'id')
      setItems(items => [...items, ...uniqueItems]);
      setIsItemsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setGetItemsErrorMessage(err);
      setItems([]);
      setIsItemsLoading(false);
    })
  }, []);

  useEffect(() => {
    getIds();
  }, []);

  useEffect(() => {
    if(!getIds.isLoading) {
      const chunks = chunk(ids, 100);
      chunks.forEach((chunk) => {
        getItems(chunk);
      })
    } else return
  }, [getIds, getItems, ids]);

  return (
    <SearchContext.Provider
      value={{
        ids,
        items,
        getIds: {
          mutate: getIds,
          isLoading: isIdsLoading,
          errorMessage: getIdsErrorMessage,
        },
        getItems: {
          mutate: getItems,
          isLoading: isItemsLoading,
          errorMessage: getItemsErrorMessage,
        },
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
