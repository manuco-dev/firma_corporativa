import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';

import PiePag from '../../Layout/PiePag';
import Firma from './Firma';

const FirmaInput = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    puesto: '',
    grupo: '',
    email: '',
    direccion: '',
    direccionManual: '', // Campo adicional para dirección personalizada
    telefono: ''
  });

  const direcciones = [
    'Otra', // Opción para dirección manual
    'Barrio la Matuna, Edificio Concasa Piso 16',
    'Barrio Torices Bogotá Cra. 43 #14a-34',
    'Barrio Santa Lucia, Calle 31 Mz G Lote 15',
    'Calle 31 B con carrera 56 - 58 Plaza Estadio 11 de Noviembre Barrio Olaya Herrera',
    'Calle 25 # 47 - 17 El Cármen de Bolívar - Bolívar',
    'Avenida Colombia # 6 - 36 Magangué - Bolívar',
    'Calle 19 # 1 A - 15 Barrio Centro Mompós - Bolívar',
    'Calle 11 Libertador # 8 - 35 Barrio La Sabana, Simití - Bolívar',
    'Turbaco- Urb La Granja Cra 15 #28-284',
    'Carrera 17 # 5 - 191 Barrio Torices Sector San Pedro, Cartagena - Bolívar',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      direccion: e.value,
      direccionManual: e.value === 'Otra' ? '' : '' // Limpia el campo si se selecciona otra opción
    });
  };

  const handleDireccionManualChange = (e) => {
    setFormData({
      ...formData,
      direccionManual: e.target.value, // Cambia el valor de direccionManual y no afecta direccion
    });
  };

  return (
    <>
      <div className="App">
        <form>
          <div className="form-group" style={{ marginBottom: '30px' }}>
            <FloatLabel>
              <InputText
                type="text"
                className="input-field"
                name="nombre"
                onChange={handleChange}
              />
              <label htmlFor="nombre">Nombres y Apellidos</label>
            </FloatLabel>
          </div>
          <div className="form-group" style={{ marginBottom: '30px' }}>
            <FloatLabel>
              <InputText
                type="text"
                className="input-field"
                name="puesto"
                onChange={handleChange}
              />
              <label htmlFor="puesto">Cargo planta o Contratista</label>
            </FloatLabel>
          </div>
          <div className="form-group" style={{ marginBottom: '30px' }}>
            <FloatLabel>
              <InputText
                type="text"
                className="input-field"
                name="grupo"
                onChange={handleChange}
              />
              <label htmlFor="grupo">Grupo al que pertenece</label>
            </FloatLabel>
          </div>
          <div className="form-group" style={{ marginBottom: '30px' }}>
            <FloatLabel>
              <InputText
                type="email"
                className="input-field"
                name="email"
                onChange={handleChange}
              />
              <label htmlFor="email">ICBF Sede Regional XXXXXXXXX</label>
            </FloatLabel>
          </div>

          <div className="form-group" style={{ marginBottom: '30px' }}>
            <Dropdown
              name="direccion"
              className="input-field"
              placeholder="Selecciona una dirección"
              value={formData.direccion}
              options={direcciones.map((direccion) => ({ label: direccion, value: direccion }))}
              onChange={handleSelectChange}
              display="chip"
            />
          </div>

          {/* Campo de dirección manual que aparece si se selecciona "Otra" */}
          {formData.direccion === 'Otra' && (
            <div className="form-group" style={{ marginBottom: '30px' }}>
              <FloatLabel>
                <InputText
                  type="text"
                  className="input-field"
                  name="direccionManual"
                  value={formData.direccionManual}
                  onChange={handleDireccionManualChange} // Cambia el valor de direccionManual y sincroniza con direccion
                  placeholder="Escriba la dirección"
                />
                <label htmlFor="direccionManual">Escriba la dirección</label>
              </FloatLabel>
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '30px' }}>
            <FloatLabel>
              <InputText
                type="text"
                className="input-field"
                name="telefono"
                placeholder="Teléfono si tiene"
                onChange={handleChange}
              />
              <label htmlFor="telefono">Teléfono si tiene</label>
            </FloatLabel>
          </div>
        </form>

        {/* Componente Firma con los datos del formulario */}
        <Firma data={{ ...formData, direccion: formData.direccionManual || formData.direccion }} />

        {/* Pie de página */}
        <PiePag />
      </div>
    </>
  );
};

export default FirmaInput;
