import React, { useContext } from 'react';
import Context from "../context/MyContext";
import { CiPizza } from "react-icons/ci";

export default function Navigation() {

    const { menu, total, seleccionadas, setSeleccionadas } = useContext(Context);

    const option = {
        style: 'decimal',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    };

    const aumentarCantidad = (id) => {
        const pizzaIndex = seleccionadas.findIndex(pizza => pizza.id === id);
        if (pizzaIndex >= 0) {
            const newPizzas = [...seleccionadas];
            newPizzas[pizzaIndex].cantidad += 1;
            setSeleccionadas(newPizzas);
        } else {
            const pizza = menu.find(pizza => pizza.id === id);
            const newPizza = { id: id, cantidad: 1, price: pizza.price, image_100: pizza.img, name: pizza.name };
            setSeleccionadas([...seleccionadas, newPizza]);
        }

    };
    const disminuirCantidad = (id) => {

        const pizzaIndex = seleccionadas.findIndex(pizza => pizza.id === id);

        if (pizzaIndex >= 0) {
            const newPizzas = [...seleccionadas];
            newPizzas[pizzaIndex].cantidad -= 1;
            const filteredPizzas = newPizzas.filter(pizza => pizza.cantidad !== 0);
            setSeleccionadas(filteredPizzas);
        }  
    }
    const imprime_carrito = () => {
        const arreglo = seleccionadas.map((pizza, index) => (pizza.cantidad > 0 ?

            <tr key={index}>
                
                <td className='izquierda text-center'><span className='text-warning '><CiPizza /></span>{pizza.name}</td>

                <td className='izquierda text-center'>$ {(pizza.price * pizza.cantidad).toLocaleString('es-CL', option)}</td>
                <td><button className="btn btn-danger m-2" onClick={() => disminuirCantidad(pizza.id)}>-</button> </td>
                <td>  {pizza.cantidad}</td>
                <td> <button className="btn btn-primary m-2" onClick={() => aumentarCantidad(pizza.id)}>+</button></td>

            </tr>
            : null));
        return arreglo;
    }

    return (
        <div>
            <p className='display-6 text-white text-center'>Detalle  pedido:</p>
            <div className='abs-center'>
                <div className='card'>
                    <table className='text-center'>
                        <thead>
                            <tr>
                                <th width="20%"></th><th width="40%"></th ><th width="20%"></th><th width="5%"></th ><th width="10%"></th><th width="5%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {imprime_carrito()}
                        </tbody>
                    </table>
                </div>
            </div>
            <p className='total text-white text-center'>Total: $ {total.toLocaleString('es-CL', option)}</p>
            <div className='text-center'>
                <button className="btn btn-success m-2"><span>Pagar Pedido</span></button>
            </div>
        </div>
    );
}