import 'bulma/css/bulma.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar/'
import Table from './components/Table/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <Table/>
  </StrictMode>,
)
 