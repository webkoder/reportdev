import React, { lazy, useContext } from 'react'
import AppContext from 'src/services/AppContext.js'

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCallout,
  CWidgetSimple
} from '@coreui/react'

import ChartAtividade from '../charts/ChartAtividade.js'
import { TIPOS } from 'src/constants.js'
import { mf } from 'src/reusable/funcoes.js'

const SummaryWidget = lazy(() => import('../widgets/SummaryWidget.js'))

const Diario = () => {

  const tech = useContext( AppContext ).meta.tech;

  return (
    <>
      <h2>Diario</h2>

    </>
  )
}

export default Diario
