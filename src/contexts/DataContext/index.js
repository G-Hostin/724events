import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({}); // Crée un context vide

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
}; // Simule une api, charge le json

export const DataProvider = ({ children }) => {
  // Provider qui permet de partager error et data dans le projet
  const [error, setError] = useState(null); // Resultat du catch
  const [data, setData] = useState(null); // Resultat du loadData si réussi
  const getData = useCallback(async () => {
    // useCallback permet de garder la fonction entre les re render
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext); // Raccourci l'utilisation avec useData

export default DataContext;
