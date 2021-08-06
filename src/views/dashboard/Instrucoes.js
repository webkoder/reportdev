import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import { categorias } from 'src/instrucoes'


const Instrucoes = () => {
  
  return (
    <>

    <p>
      Valores hard-coded no sistema, localizado em <code className="highlighter-rouge">./src/instrucoes.js</code>
    </p>

    <CRow>
    {
    categorias.map( item => (
        <CCol md="6">
          <CCard>
            <CCardHeader  className={ item.class }>
              { item.nome }
              </CCardHeader>
            <CCardBody>
              { item.data.map( p => (<p>{ p }</p>) ) }
            </CCardBody>
          </CCard>
        </CCol>
      ))
    }

    </CRow>

    </>
  )
}

export default Instrucoes
