import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className="marco">
      <div className="cart">
      <h1>Uppps !!! <br/>Pagina no existe</h1><br/>
      <div className='boton'>
        <Link to="/">Regresar al Home</Link>
      </div>
      </div>
    </main>
  )
}

export default NotFound