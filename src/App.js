import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import MyContext from "./context/MyContext";
import Navbar from "./components/Navbar";
import Home from "./views/Home";


import Pizza from "./views/Pizza";
import Carro from "./views/Carro";
import NotFound from "./views/NotFound";

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  //definición estados
  const url = `${process.env.PUBLIC_URL}/pizzas.json`;
  const [menu, setMenu] = useState([]);
  const [total, setTotal] = useState(0);
  const [seleccionadas, setSeleccionadas] = useState([]);
  
  const  getData = async()=> {
     const resp = await fetch(url)
     const data =  await resp.json();
     setMenu(data);
  }
  
  useEffect(() => {
    getData()
  },[]);

  const globalState = { menu, setMenu, total, setTotal,seleccionadas, setSeleccionadas};
  
  return (
    <div>
    <MyContext.Provider value={globalState}>
    <BrowserRouter>
        <Navbar />
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path='*' element={<NotFound />} />
           <Route path="/carrito/" element={<Carro />} />
           <Route path="/pizza/:id/" element={<Pizza/>} />
        </Routes>
    </BrowserRouter>
    </MyContext.Provider>
  </div>

  );
}

export default App;
