import { NavLink } from 'react-router-dom';
import { Navbar, Container } from "react-bootstrap";
import {  useEffect, useContext } from 'react';
import { FaPizzaSlice,FaShoppingCart } from "react-icons/fa";
import React from 'react';
import Nav from 'react-bootstrap/Nav';

import Context from "../context/MyContext"

export default function Navigation() {
  const option={
    style: 'decimal',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  };

  const {total, setTotal,seleccionadas} = useContext(Context);
  const setActiveClass = ({ isActive }) => (isActive ? "active" : "mi-clase");

  function calcularTotal() {
    const totalCalculado = seleccionadas.reduce((acc, item) => acc + (parseFloat(item.price) ?? 0) * (parseInt(item.cantidad) ?? 0), 0);
    setTotal(totalCalculado);
  };

  useEffect(() => {calcularTotal();});
  return (
    <>
      <Navbar className="fondo" variant="light">
        <Container className="justify-content-start">
          <Nav className="me-auto">
          <NavLink to="/"className={setActiveClass} >
              <FaPizzaSlice />Pizzeria Donatelos
            </NavLink>
          </Nav>
          <Nav className="justify-content">
            <NavLink to="/carrito"  className={setActiveClass} >
            <FaShoppingCart />Carro Compra ${total.toLocaleString('es-CL', option)}
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
