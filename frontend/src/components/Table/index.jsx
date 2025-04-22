import { useCallback, useEffect, useState } from 'react';
import ModalAddSong from './ModalAddSong'; // Asegúrate de que la ruta sea correcta
import ModalEditSong from './ModalEditSong'; // Asegúrate de que la ruta sea correcta


const TableComponent = () => {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/canciones`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container">
      <div className="Container is-flex is-align-items-center is-justify-content-space-between my-5">
        <h1 className="title is-4">Favorites Songs</h1>
        <ModalAddSong/>
      </div>
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>ID</th>
            <th>name song</th>
            <th>name group</th>
            <th>gender</th>
            <th>popularity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name_song}</td>
              <td>{item.group_name}</td>
              <td>{item.gender}</td>
              <td>{item.popularity}</td>
              <td>
              <div class="buttons">
                <ModalEditSong item={item} fetchData={fetchData}/>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;