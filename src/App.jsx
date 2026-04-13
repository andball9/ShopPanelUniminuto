import { useEffect, useMemo, useState } from "react";
import Login from "./pages/Login";
import Panel from "./pages/Panel";
import "./App.css";

const USER_STORAGE_KEY = "shopPanelUser";
const ORDERS_STORAGE_KEY = "shopPanelOrders";

function readStorage(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const value = localStorage.getItem(key);

  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function App() {
  const [usuario, setUsuario] = useState(() => readStorage(USER_STORAGE_KEY, null));
  const [pedidos, setPedidos] = useState(() => readStorage(ORDERS_STORAGE_KEY, []));

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(usuario));
      return;
    }

    localStorage.removeItem(USER_STORAGE_KEY);
  }, [usuario]);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(pedidos));
  }, [pedidos]);

  const appState = useMemo(
    () => ({
      usuario,
      pedidos,
      setUsuario,
      setPedidos,
    }),
    [usuario, pedidos],
  );

  return usuario ? (
    <Panel {...appState} />
  ) : (
    <Login setUsuario={setUsuario} />
  );
}

export default App;
