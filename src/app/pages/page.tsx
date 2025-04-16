import React from 'react';
import Home from '../Viuw/Pages/Home'; // Asumiendo que este es tu componente Home
import Header from '../Viuw/Components/Header/Header'; // Importar Header
import Footer from '../Viuw/Components/Footer/Footer';

const Page = () => {
  return (
    <div>
      <Header /> {/* El Header no se ve afectado */}
      <div className="mx-[100px]"> {/* Aplica margen de 100px solo al contenido */}
        <Home />  {/* Esto es lo que ya tenías */}
      </div>
      <Footer /> {/* El Header no se ve afectado */}
    </div>
  );
};

export default Page;
