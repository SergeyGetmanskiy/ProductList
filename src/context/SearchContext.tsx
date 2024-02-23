import { createContext, FC, useState, PropsWithChildren, useCallback } from 'react';
import { FieldValues } from 'react-hook-form';
import { api } from '../utils/api';

type Search = {
  Ids: Array;
  Items: Array;
  getIds: {
    mutate: () => Promise<void>;
    isLoading: boolean;
    errorMessage: string | null;
  };
  getItems: {
    mutate: (data: FieldValues) => Promise<void>;
    isLoading: boolean;
    errorMessage: string | null;
  };
};

export const SearchContext = createContext<Search>({
  Ids: [],
  Items: [],
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
  const [Ids, setIds] = useState<Array>([]);
  const [Items, setItems] = useState<Array>([]);
  const [getIdsErrorMessage, setGetIdsErrorMessage] = useState<string | null>(null);
  const [getItemsErrorMessage, setGetItemsErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getIds = useCallback(() => {
    setIsLoading(true);
    setGetIdsErrorMessage(null);
    api.getIds()
      .then((res) => {
        setIds(res.result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setGetIdsErrorMessage(err);
        setIds([]);
        setIsLoading(false);
      })
  }, []);

  const getItems = useCallback((data: FieldValues) => {
    setIsLoading(true);
    setGetItemsErrorMessage(null);
    api.getItems(data)
    .then((res) => {
      setItems(res.result);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setGetItemsErrorMessage(err);
      setItems([]);
      setIsLoading(false);
    })
  }, []);

  return (
    <SearchContext.Provider
      value={{
        Ids,
        Items,
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
