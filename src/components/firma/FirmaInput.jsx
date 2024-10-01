import React, { useState } from 'react';



import PiePag from '../../Layout/PiePag';
import Firma from './Firma';




const FirmaInput = ()=> {
  const [formData, setFormData] = useState({
    nombre: '',
    puesto: '',
    grupo: '',
    email: '',
    direccion: '',
    telefono: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
    
    
   
    <div className="App">
      <form>
        <div className='form-group'>
          
          <input type="text" name="nombre" placeholder="Nombres y Apellidos" onChange={handleChange} />
        </div>
        <div className='form-group'>
          <input type="text" name="puesto" placeholder="Cargo planta o Contratista" onChange={handleChange} />
        </div>
        <div className='form-group'>
          <input type="text" name="grupo" placeholder="Grupo al que pertenece " onChange={handleChange} />
        </div>
        <div className='form-group'>
          <input type="email" name="email" placeholder="ICBF Sede Regional XXXXXXXXX" onChange={handleChange} />
        </div>
        <div className='form-group'>
          <input type="text" name="direccion" placeholder="Dirección del lugar de trabajo" onChange={handleChange} />
        </div>
        <div className='form-group'>
          <input type="text" name="telefono" placeholder="Telefono si tiene" onChange={handleChange} />
        </div>
      </form>
    <Firma data={formData} />

    <PiePag />
    

    
    
    </div>
    
    
    </>
  );

  
}

export default FirmaInput;
