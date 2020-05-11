import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {

  //definir el state que fluye por varios componentes al de Pregunta
  const [presupuesto, guardarPresupuesto] = useState(0)
  const [restante, guardarRestante] = useState(0)

  //carga condicional
  const [mostrarpregunta, actualizarPregunta] = useState(true)

  //crear listado de gastos
  const [gastos, guardarGastos] = useState([])

  //
  const [gasto, guardarGasto] = useState({})
  const [creargasto, guardarCreargasto] = useState(false)
  //useeffect que actualiza el restante
  useEffect( () => {
    if(creargasto){

      //agrega el nuevo presupuesto
      guardarGastos([
        ...gastos,
        gasto
      ])
      //resta del presupuesto actual

      const presupuestoRestante = restante - gasto.cantidad
      guardarRestante(presupuestoRestante)
    }
    guardarCreargasto(false)
  }, [gasto, gastos, creargasto, restante])

//  //cuando agregamos un nuevo gasto
//   const agregarNuevoGasto = gasto => {
//     //console.log(gasto);
//     guardarGastos([
//       ...gastos,
//       gasto
//     ])
//   }

  return (
    <div className='container'>
      <header>
        <h1>Gasto semanal</h1>
        <div className='contenido-principal contenido'>
          { mostrarpregunta ? (
              <Pregunta
                guardarPresupuesto={guardarPresupuesto}
                guardarRestante={guardarRestante}
                actualizarPregunta={actualizarPregunta}
              />
          ) : (
            <div className='row'>
              <div className='one-half column'>
                <Formulario 
                  guardarGasto={guardarGasto}
                  guardarCreargasto={guardarCreargasto}
                />
              </div>

              <div className='one-half column'>
                <Listado gastos={gastos}/>
                <ControlPresupuesto 
                  presupuesto={presupuesto}
                  restante={restante}
                />
              </div>

          </div>

          ) }
        </div>
      </header>
    </div>

  );
}

export default App;
