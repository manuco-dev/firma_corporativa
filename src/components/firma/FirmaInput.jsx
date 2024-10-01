import React, { useState } from 'react';

import PiePag from '../../Layout/PiePag';
import Firma from './Firma';

const FirmaInput = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    puesto: '',
    grupo: '',
    email: '',
    direccion: '',
    telefono: ''
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false); // Para gestionar si estamos en modo input o select

  // Lista de direcciones predefinidas
  const direcciones = [
    'Barrio la Matuna, Edificio Concasa Piso 16',
    'Barrio Torices Bogotá Cra. 43 #14a-34',
    'Barrio Santa Lucia, Calle 31 Mz G Lote 15',
    'Calle 31 B con carrera 56 - 58 Plaza Estadio 11 de Noviembre Barrio Olaya Herrera',
    'Calle 25 # 47 - 17 El Cármen de Bolívar - Bolívar',
    'Avenida Colombia # 6 - 36 Magangué - Bolívar',
    'Calle 19 # 1 A - 15 Barrio Centro Mompós - Bolívar',
    'Calle 11 Libertador # 8 - 35 Barrio La Sabana, Simití - Bolívar',
    'Turbaco-Rub. La Granja Cra 15 #28-284',
    'Carrera 17 # 5 - 191 Barrio Torices Sector San Pedro, Cartagena - Bolívar'


    
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddressFocus = () => {
    setIsEditingAddress(true); // Al hacer clic, cambia a un select
  };

  const handleSelectChange = (e) => {
    handleChange(e);
    setIsEditingAddress(false); // Después de seleccionar, vuelve al input con la dirección seleccionada
  };

  return (
    <>
      <div className="App">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="input-field"
              name="nombre"
              placeholder="Nombres y Apellidos"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="input-field"
              name="puesto"
              placeholder="Cargo planta o Contratista"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="input-field"
              name="grupo"
              placeholder="Grupo al que pertenece"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="input-field"
              name="email"
              placeholder="ICBF Sede Regional XXXXXXXXX"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            {/* Mostrar un input o un select basado en el estado */}
            {!isEditingAddress ? (
              // Si no está en modo edición, mostrar un input
              <input
                type="text"
                className="input-field"
                name="direccion"
                placeholder="Dirección del lugar de trabajo"
                value={formData.direccion}
                onFocus={handleAddressFocus} // Al hacer clic, cambia a select
                onChange={handleChange} // Permitir edición si es necesario
              />
            ) : (
              // Si está en modo edición, mostrar un select
              <select
                name="direccion"
                className="input-field"
                value={formData.direccion}
                onChange={handleSelectChange} // Al seleccionar, vuelve al input
              >
                <option value="">Selecciona una dirección</option>
                {direcciones.map((direccion, index) => (
                  <option key={index} value={direccion}>
                    {direccion}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              className="input-field"
              name="telefono"
              placeholder="Teléfono si tiene"
              onChange={handleChange}
            />
          </div>
        </form>

        {/* Componente Firma con los datos del formulario */}
        <Firma data={formData} />

        {/* Pie de página */}
        <PiePag />
      </div>
    </>
  );
};

export default FirmaInput;
