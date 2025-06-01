import { createContext, useContext, useState, useEffect } from "react";
import {
  getData,
  addItem,
  updateItem,
  deleteItem,
} from "../utils/localStorageUtils";

const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshComponents = () => {
    const componentsData = getData("components");
    setComponents(componentsData);
    setLoading(false);
  };

  useEffect(() => {
    refreshComponents();
  }, []);

  const addComponent = (component) => {
    const newComponent = { ...component, id: `c${Date.now()}` };
    addItem("components", newComponent);
    refreshComponents();
    return newComponent;
  };

  const updateComponent = (id, updates) => {
    updateItem("components", id, updates);
    refreshComponents();
  };

  const deleteComponent = (id) => {
    deleteItem("components", id);
    refreshComponents();
  };

  return (
    <ComponentsContext.Provider
      value={{
        components,
        loading,
        addComponent,
        updateComponent,
        deleteComponent,
      }}
    >
      {children}
    </ComponentsContext.Provider>
  );
};

export const useComponents = () => useContext(ComponentsContext);
