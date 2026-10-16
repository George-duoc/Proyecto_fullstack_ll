import { useContext } from 'react';
import VehiculosContext from './vehiculos-context.jsx';

export default function useVehiculos() {
  const contexto = useContext(VehiculosContext);
  if (!contexto)
    throw new Error('useVehiculos debe utilizarse dentro de VehiculosProvider.');
  return contexto;
}
