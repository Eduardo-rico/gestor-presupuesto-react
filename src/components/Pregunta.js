import React, { Fragment, useState } from 'react';
import Error from './Error'

import PropTypes from 'prop-types'

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {
    const [cantidad, guardarCantidad] = useState(0);

    //el estado del error
    const [error, guardarError] = useState(false)

    //funcion que lee el presupuesto del form
    const definirPresupuesto = (e) => {
        //e como parametro para acceder a los valores
        //console.log(parseInt(e.target.value));
        //pasa de string a int

        guardarCantidad(parseInt(e.target.value, 10))

        //tambien se puede poner en el onchange = { e => guardarCantidad(parseInt(e.target.value, 10))}
    }

    //funcion que define el presupuesto en onSubmit
    const agregarPresupuesto = (e) => {
        e.preventDefault();
        
        //validar
        if (cantidad < 1 || isNaN( cantidad )){
            guardarError(true)
            return; //que no se olvide el return 
        }

        //si pasa la validacion qué pasa
        guardarError(false);
        guardarPresupuesto(cantidad)
        guardarRestante(cantidad)
        actualizarPregunta(false)

    }

    return (
        <Fragment>
            <h2>Coloca tu presupuesto</h2>
            { error ? <Error mensaje='El presupuesto es incorrecto' /> :null}
            <form
                onSubmit={agregarPresupuesto}
            >
                <input
                    type='number'
                    className='u-full-width'
                    placeholder='Coloca tu presupuesto'
                    onChange={definirPresupuesto}
                />

                <input
                    type='submit'
                    className='button-primary u-full-width'
                    value='Definir presupuesto'
                />
            </form>
        </Fragment>
    )
}

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}


export default Pregunta
