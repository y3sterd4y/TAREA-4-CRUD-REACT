import React, { useState } from 'react';
import Modal from '../Modal'; // Asegúrate de que la ruta sea correcta

function ModalAddSong() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [formData, setFormData] = useState({
    name_song: '',
    group_name: '',
    gender: '',
    popularity: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/canciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('Canción añadida correctamente');

        setFormData({
          name_song: '',
          group_name: '',
          gender: '',
          popularity: ''
        });
        setTimeout(() => {
          setMensaje('');
        }, 2000);
      } else {
        setMensaje(`Error: ${data.message || 'No se pudo añadir la canción'}`);
        setTimeout(() => {
          setMensaje('');
        }, 2000);
      }
    } catch (error)  {
      setMensaje(`Error: ${error.message}`);
      setTimeout(() => {
        setMensaje('');
      }, 2000);
    }
  };



  return (
    <div className="block">
      
      <button className="button is-primary" onClick={openModal}>
        Añadir Canción
      </button>
      
      <Modal 
        isActive={isModalOpen}
        onClose={closeModal}
        title="Detalles de la canción"
        footer={false}
      >
        <form onSubmit={handleSubmit}>
          <div className="field">

            <div className="control">
            <label className='label'>Name Song</label>
              <input className='input' type="text" name='name_song' value={formData.name_song} onChange={handleChange} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
            <label className='label'>Name Group</label>
              <input className='input' type="text" name='group_name' value={formData.group_name} onChange={handleChange} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
            <label className='label'>Gender</label>
              <input className='input' type="text" name='gender' value={formData.gender} onChange={handleChange} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className='label'>Popularity</label>
              <input className='input' type="text" name='popularity' value={formData.popularity} onChange={handleChange} required/>
            </div>
          </div>
          {mensaje && <div className={`notification ${mensaje.includes('Error') ? 'is-danger' : 'is-success'}`}>
            {mensaje}
            </div>}
            <div className="buttons">
              <button className="button is-success" type="submit">
                Agregar Cancion
              </button>
              <button className="button" type="button" onClick={closeModal}>
                Cancelar
              </button>
            </div>
        </form>
      </Modal>
    </div>
  );
}

export default ModalAddSong;