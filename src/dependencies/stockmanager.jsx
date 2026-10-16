import { useEffect, useState } from 'react';
import VehiculosContext from './vehiculos-context.jsx';
import { stockInicial } from '../data/productinic.js';

function leerLista(clave, valorInicial) {
  const guardado = localStorage.getItem(clave);
  if (!guardado) return valorInicial;

  try {
    const datos = JSON.parse(guardado);
    return Array.isArray(datos) ? datos : valorInicial;
  } catch (error) {
    console.error(`No se pudo leer ${clave} desde localStorage.`, error);
    return valorInicial;
  }
}

export function VehiculosProvider({ children }) {
  const [vehiculos, setVehiculos] = useState(() =>
    leerLista('StockVeh', stockInicial),
  );
  const [carrito, setCarrito] = useState(() =>
    leerLista('miCarrito', []).map((producto, indice) => ({
      ...producto,
      cartId: producto.cartId ?? `${producto.id}-${indice}`,
    })),
  );

  useEffect(() => {
    localStorage.setItem('StockVeh', JSON.stringify(vehiculos));
  }, [vehiculos]);

  useEffect(() => {
    localStorage.setItem('miCarrito', JSON.stringify(carrito));
  }, [carrito]);

  return (
    <VehiculosContext.Provider
      value={{ vehiculos, setVehiculos, carrito, setCarrito }}
    >
      {children}
    </VehiculosContext.Provider>
  );
}
