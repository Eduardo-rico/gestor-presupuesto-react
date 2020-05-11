import React, { useState } from 'react'
import Error from './Error'
import shortid from 'shortid'

import PropTypes from 'prop-types'


const Formulario = ({guardarGasto, guardarCreargasto}) => {
    const [nombre, guardarNombre] = useState('')
    const [cantidad, guardarCantidad] = useState(0)
    const [error, guardarError] = useState(false)
    //cuando el usr agrega un gasto
    const agregarGasto = e =>{
        e.preventDefault();
        
        //validar
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true)
            return
        }
        //para eliminar el mensaje de error, cuando todo esta bien
        guardarError(false)
        //construir el gasto
        const gasto = {
            nombre, 
            cantidad,
            id: shortid.generate()
        }

       //console.log(gasto);

        
        //pasar el gasto al componente principal
        guardarGasto(gasto)
        guardarCreargasto(true)

        //resetear el form
        guardarNombre('')
        guardarCantidad(0)

    }


    return (
        <form onSubmit={agregarGasto}> 
            <h2>Agrega tus gastos aqui</h2>
            { error ? <Error mensaje='Ambos campos son obligatorio o el presupuesto es incorrecto' /> : null}
            <div className='campo'>
                <label>Nombre gasto</label>
                <input 
                    type='text'
                    className='u-full-width'
                    placeholder='Ej. Transporte'
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
                <label>Cantidad gasto</label>
                <input 
                    type='number'
                    className='u-full-width'
                    placeholder='Ej. 300'
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value, 10))}
                />

                <input
                    type='submit'
                    className='button-primary u-full-width'
                    value='Agregar Gasto'
                />
                

            </div>
        </form>
    )
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCreargasto: PropTypes.func.isRequired
}


export default Formulario
