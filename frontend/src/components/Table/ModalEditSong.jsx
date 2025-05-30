import React, { useState } from 'react';
import Modal from '../Modal'; // Asegúrate de que la ruta sea correcta

function ModalEditSong({ item, fetchData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editSong, setEditSong] = useState({
    name_song: '',
    group_name: '',
    gender: '',
    popularity: ''
  });
  const [mensaje, setMensaje] = useState('');

  const openModal = () => {
    setEditSong({
        name_song: item.name_song,
        group_name: item.group_name,
        gender: item.gender,
        popularity: item.popularity
    });
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMensaje('');
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEditSong({
        ...editSong,
        [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/canciones/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editSong)
        });

        if(response.ok) {
            setMensaje('Canción editada correctamente');
            fetchData(); // Refresca la tabla después de editar
            setTimeout(() => {
              setMensaje('');
            }, 2000);
        }
        else {
            const data = await response.json();
            setMensaje(`Error: ${data.message || 'No se pudo editar la canción'}`);
            setTimeout(() => {
              setMensaje('');
            }, 2000);
        }
    } catch (error) {
        setMensaje(`Error: ${error.message}`);
        setTimeout(() => {
          setMensaje('');
        }, 2000);
    }
  };

  //////////  ELIMINAR SONG //////////

  const handleDelete = async () => {
    if(confirm('¿Estás seguro de que deseas eliminar esta canción?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/canciones/${item.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMensaje('Canción eliminada correctamente');
          fetchData(); // Refresca la tabla después de eliminar
        } else {
          const data = await response.json();
          setMensaje(`Error: ${data.message || 'No se pudo eliminar la canción'}`);
        }
      } catch (error) {
        setMensaje(`Error: ${error.message}`);
      }
    }
  }
  

  return (
    <div className='buttons'>
      <button className="button is-primary is-small is-info is-dark" onClick={openModal}>
        Editar
      </button>
      <button class="button is-link is-small is-danger is-dark" onClick={handleDelete}>Eliminar</button>
      
      <Modal 
        isActive={isModalOpen}
        onClose={closeModal}
        title="Editar Canción"
        footer={false}
      >
        <form onSubmit={handleSubmit}>
          <div className="field">

            <div className="control">
            <label className='label'>Name Song</label>
              <input className='input' type="text" name='name_song' value={editSong.name_song} onChange={handleChange} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
            <label className='label'>Name Group</label>
              <input className='input' type="text" name='group_name' value={editSong.group_name} onChange={handleChange} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
            <label className='label'>Gender</label>
              <input className='input' type="text" name='gender' value={editSong.gender} onChange={handleChange} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className='label'>Popularity</label>
              <input className='input' type="text" name='popularity' value={editSong.popularity} onChange={handleChange} required/>
            </div>
          </div>
          {mensaje && <div className={`notification ${mensaje.includes('Error') ? 'is-danger' : 'is-success'}`}>
            {mensaje}
            </div>}
            <div className="buttons">
              <button className="button is-success" type="submit">
                Agregar cambios
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

export default ModalEditSong;