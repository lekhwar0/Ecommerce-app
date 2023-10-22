import { useState, useContext, createContext } from "react";
const searchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [isSearchedProductLoading, setIsSearhedProductLoading] =
    useState(false);

  const [values, setValues] = useState({
    keyword: "",
    results: [],
  });

  return (
    <searchContext.Provider
      value={{
        values,
        setValues,
        isSearchedProductLoading,
        setIsSearhedProductLoading,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};
// custom hook
const useSearchContext = () => useContext(searchContext);
export { useSearchContext, SearchContextProvider };
