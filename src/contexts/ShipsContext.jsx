import { createContext, useContext, useState, useEffect } from "react";
import {
  getData,
  addItem,
  updateItem,
  deleteItem,
} from "../utils/localStorageUtils";

const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshShips = () => {
    const shipsData = getData("ships");
    setShips(shipsData);
    setLoading(false);
  };

  useEffect(() => {
    refreshShips();
  }, []);

  const addShip = (ship) => {
    const newShip = { ...ship, id: `s${Date.now()}` };
    addItem("ships", newShip);
    refreshShips();
    return newShip;
  };

  const updateShip = (id, updates) => {
    updateItem("ships", id, updates);
    refreshShips();
  };

  const deleteShip = (id) => {
    deleteItem("ships", id);
    refreshShips();
  };

  return (
    <ShipsContext.Provider
      value={{ ships, loading, addShip, updateShip, deleteShip }}
    >
      {children}
    </ShipsContext.Provider>
  );
};

export const useShips = () => useContext(ShipsContext);
