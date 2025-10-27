import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainTuristas from '../../../Components/Turistas/MainTuristas.jsx';
// import EditExcursion from '../../components/Excursion/EditExcursion';
// import ViewExcursion from '../../components/Excursion/ViewExcursion';
// import CreateExcursion from '../../components/Excursion/CreateExcursion';
// import ExcursionesCategoria from '../../components/Excursion/ExcursionesCategoria'; // si lo usás como filtro o vista

const ExcursionesCRUD = () => {
  return (
    <main>
      <br />
      <Routes>
        <Route path="/" element={<MainTuristas />} />
        {/* <Route path="edit/:id" element={<EditExcursion />} />
        <Route path="view/:id" element={<ViewExcursion />} />
        <Route path="create" element={<CreateExcursion />} /> */}
        {/* <Route path="categoria/:nombre" element={<ExcursionesCategoria />} /> */}
      </Routes>
    </main>
  );
};

export default ExcursionesCRUD;