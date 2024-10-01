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
            <Link to="/pdfunlock">
              <Button variant="contained" color="primary">Unlock PDF</Button>
            </Link>

            <Link to="/editpdf">
              <Button variant="contained" color="primary">Editar Pdf</Button>
            </Link>
            
            <Link to="/firma-corp">
              <Button variant="contained" color="primary">Firma Corporativa</Button>
            </Link>
            <DropdownMenu />
            <Link to="/feedback">
              <Button variant="contained" color="primary">Comentarios</Button>
            </Link>
            
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
