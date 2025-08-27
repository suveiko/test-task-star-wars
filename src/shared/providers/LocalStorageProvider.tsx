import {
  type FC,
  type ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';

type LocalStorageContextValue = {
  triggerUpdate: () => void;
  updateKey: number;
};

const LocalStorageContext = createContext<LocalStorageContextValue | undefined>(
  undefined,
);

type LocalStorageProviderProps = {
  children: ReactNode;
};

export const LocalStorageProvider: FC<LocalStorageProviderProps> = ({
  children,
}) => {
  const [updateKey, setUpdateKey] = useState(0);

  const triggerUpdate = useCallback(() => {
    setUpdateKey((prev) => prev + 1);
  }, []);

  return (
    <LocalStorageContext.Provider value={{ triggerUpdate, updateKey }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorageUpdate = () => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error(
      'useLocalStorageUpdate must be used within LocalStorageProvider',
    );
  }
  return context;
};
