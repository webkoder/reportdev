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

const Dashboard = () => {

  const tech = useContext( AppContext ).meta.tech;

  return (
    <>
      <SummaryWidget data={tech} />

      <CRow>
        <CCol md="6">
          <CRow>
            <CCol md="6">
              <CCard>
                <CCardBody>
                  <CCallout color="success">
                    <small className="text-muted">Previstos</small>
                    <br />
                    <strong className="h4">
                    { tech.atividades.previsto.items } |&nbsp;
                    { tech.atividades.previsto.formatted }
                    </strong>
                  </CCallout>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md="6">
              <CCard>
                <CCardBody>
                  <CCallout color="danger">
                    <small className="text-muted">Imprevisto</small>
                    <br />
                    <strong className="h4">
                    { tech.atividades.imprevisto.items } |&nbsp;
                    { tech.atividades.imprevisto.formatted }
                    </strong>
                  </CCallout>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow>
            <CCol md="6">
              <CCard>
                <CCardBody>
                  <CCallout color="info">
                    <small className="text-muted">Recorrentes</small>
                    <br />
                    <strong className="h4">
                    { tech.atividades.recorrente.items } |&nbsp;
                    { tech.atividades.recorrente.formatted }
                    </strong>
                  </CCallout>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md="6">
              <CCard>
                <CCardBody>
                  <CCallout color="warning">
                    <small className="text-muted">Formatos</small>
                    <br />
                    <strong className="h4">
                    { tech.atividades.formatos.items } |&nbsp;
                    { tech.atividades.formatos.formatted }
                    </strong>
                  </CCallout>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow>
            <CCol md="6">
              <CCard>
                <CCardBody>
                  <CCallout color="primary">
                    <small className="text-muted">Redes Header Bidding</small>
                    <br />
                    <strong className="h4">
                    { tech.atividades.redes.items } |&nbsp;
                    { tech.atividades.redes.formatted }
                    </strong>
                  </CCallout>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md="6">
              <CCard>
                <CCardBody>
                  <CCallout color="primary">
                    <small className="text-muted">Campanhas Diretas</small>
                    <br />
                    <strong className="h4">
                    { tech.atividades.direta.items } |&nbsp;
                    { tech.atividades.direta.formatted }
                    </strong>
                  </CCallout>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow>
            <CCol md="6">
              <CCard>
                <CCardBody>
                  <CCallout color="warning">
                    <small className="text-muted">IAB</small>
                    <br />
                    <strong className="h4">
                    { tech.atividades.iab.items } |&nbsp;
                    { tech.atividades.iab.formatted }
                    </strong>
                  </CCallout>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol md="6">
              <CCard>
                <CCardBody>
                  <CCallout color="success">
                    <small className="text-muted">ADM</small>
                    <br />
                    <strong className="h4">
                    { tech.atividades.adm.items } |&nbsp;
                    { tech.atividades.adm.formatted }
                    </strong>
                  </CCallout>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          
          <CRow>
            <CCol md="6">
              <CCard>
                <CCardBody>
                  <CCallout color="warning">
                    <small className="text-muted">Painel</small>
                    <br />
                    <strong className="h4">
                    { tech.atividades.painel.items } |&nbsp;
                    { tech.atividades.painel.formatted }
                    </strong>
                  </CCallout>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

        </CCol>

        <CCol md="6">
        <CWidgetSimple header="Atividades">
          <ChartAtividade  style={{ height: '300px' }}
            dataPoints={ [
              TIPOS.map( tipo => tech.atividades[tipo].items ),
              TIPOS.map( tipo => mf(tech.atividades[tipo].produtividade/3600) )
            ] } />
        </CWidgetSimple>
        </CCol>
      </CRow>

    </>
  )
}

export default Dashboard
