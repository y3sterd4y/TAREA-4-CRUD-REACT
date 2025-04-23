import 'bulma/css/bulma.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/Header'
import Table from './components/Table/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <Table/>
  </StrictMode>,
)
 