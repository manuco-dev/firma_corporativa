import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import './Header.css'; // Importa tu archivo CSS
import DropdownMenu from '../components/documentaciones/DropdownMenu ';

const Header = () => {
  return (
    <>
      <br />
      <header className="barra">
        <div className="contenedor">
          <div className="contenido-barra">
            
            <DropdownMenu />
            <Link to="/firma-corp">
              <Button variant="contained" color="primary" size="small">Firma Corporativa</Button>
            </Link>
            <Link to="/comprimir">
              <Button variant="contained" color="primary" size="small">Comprimir Archivos</Button>
            </Link>
            <Link to="/feedback">
              <Button variant="contained" color="primary" size="small">Comentarios</Button>
            </Link>
            
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
