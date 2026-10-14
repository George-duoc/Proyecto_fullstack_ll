import { stockInicial } from '../data/productinic.js'
import { useState, useEffect } from 'react';

function useVehiculos() {
    const [vehiculos, setVehiculos] = useState(stockInicial);
    const [carrito, setCarrito] = useState([]);
    useEffect(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem('miCarrito')) || [];
        setCarrito(carritoGuardado);
        
        const stockGuardado = JSON.parse(localStorage.getItem('StockVeh'));
        if (stockGuardado) {
            setVehiculos(stockGuardado.filter(p => p.id));
        } else {
            localStorage.setItem("StockVeh", JSON.stringify(stockInicial));
        }
    }, [])
   return {
        vehiculos,
        setVehiculos,
        carrito,
        setCarrito
    };};

export default useVehiculos;
