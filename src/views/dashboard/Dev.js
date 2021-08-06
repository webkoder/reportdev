import React, { lazy, useContext } from 'react'
import AppContext from 'src/services/AppContext.js'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CDataTable
} from '@coreui/react'
import { TIPOS, DEVLIST } from 'src/constants.js'
import { SessionOrderService } from '../../services/SessionOrderService'

const SummaryWidget = lazy(() => import('../widgets/SummaryWidget.js'))

const Dev = ({match}) => {
  
  let devcode = DEVLIST[ match.params.name ];
  let meta = useContext( AppContext ).meta;
  let dev = meta.devs[ devcode ];
  let dias = dev.lista.dias;
  let tableData = TIPOS.map( item => {
    return {
      "categoria": item,
      "items" : dev.resumo.atividades[item].items,
      "horas" : dev.resumo.atividades[item].formatted
    }
  });
  let fields = ['categoria', 'items', 'horas'];

  // Ordernar as sessões pelao horário de inicio
  let sessions = new SessionOrderService()
  sessions.extractSessionsByDays( dias )
  // console.log( sessions )
  // dias.map( (item, day) => {
  //   console.log( day, sessions.days[day])
  // })
  
  return (
    <>
      <h1>
        { dev.name }
      </h1>
      <SummaryWidget data={dev.resumo} />

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Produção Diária
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="12" xl="12">

                  <CRow>
                    <CCol sm="3">
                      <CCallout color="success">
                        <small className="text-muted">Previstos</small>
                        <br />
                        <strong className="h4">
                          { dev.resumo.atividades.previsto.items } |&nbsp;
                          { dev.resumo.atividades.previsto.formatted }
                        </strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="3">
                      <CCallout color="danger">
                        <small className="text-muted">Imprevistos</small>
                        <br />
                        <strong className="h4">
                        { dev.resumo.atividades.imprevisto.items } |&nbsp;
                        { dev.resumo.atividades.imprevisto.formatted }
                        </strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="3">
                      <CCallout color="info">
                        <small className="text-muted">Recorrentes</small>
                        <br />
                        <strong className="h4">
                          { dev.resumo.atividades.recorrente.items } |&nbsp;
                          { dev.resumo.atividades.recorrente.formatted }
                        </strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="3">
                      <CCallout color="warning">
                        <small className="text-muted">Formatos</small>
                        <br />
                        <strong className="h4">
                          { dev.resumo.atividades.formatos.items } |&nbsp;
                          { dev.resumo.atividades.formatos.formatted }
                        </strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="3">
                      <CCallout color="primary">
                        <small className="text-muted">Redes HB</small>
                        <br />
                        <strong className="h4">
                        { dev.resumo.atividades.redes.items } |&nbsp;
                        { dev.resumo.atividades.redes.formatted }
                        </strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="3">
                      <CCallout color="primary">
                        <small className="text-muted">Camp. Diretas</small>
                        <br />
                        <strong className="h4">
                        { dev.resumo.atividades.direta.items } |&nbsp;
                        { dev.resumo.atividades.direta.formatted }
                        </strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="3">
                      <CCallout color="warning">
                        <small className="text-muted">IAB</small>
                        <br />
                        <strong className="h4">
                        { dev.resumo.atividades.iab.items } |&nbsp;
                        { dev.resumo.atividades.iab.formatted }
                        </strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="3">
                      <CCallout color="success">
                        <small className="text-muted">ADM</small>
                        <br />
                        <strong className="h4">
                        { dev.resumo.atividades.adm.items } |&nbsp;
                        { dev.resumo.atividades.adm.formatted }
                        </strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="3">
                      <CCallout color="warning">
                        <small className="text-muted">Painel</small>
                        <br />
                        <strong className="h4">
                        { dev.resumo.atividades.painel.items } |&nbsp;
                        { dev.resumo.atividades.painel.formatted }
                        </strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                    { dias.map( (item, day) => {
                      return (
                      <>
                      <CRow>
                        <CCol md="10">
                          <div className="progress-group mb-4">
                            <div className="progress-group-prepend">
                              <span className="progress-group-text">
                                <CBadge color={ item.tempo === 0 ? "danger" : "success"}>{ item.dia }</CBadge>
                                <br /> <b>{ item.diasemana }</b><br />
                              </span>
                            </div>
                            <div className="progress-group-prepend">
                              <span className="progress-group-text">
                              </span>
                            </div>
                            <div className="progress-group-bars">
                            <div className="clearfix">
                                <div className="float-left">
                                  <strong>{ item.total.percent } %</strong>
                                </div>
                                <div className="float-right">
                                  <small className="text-muted">{ item.total.tempo }</small>
                                </div>
                              </div>
                              <CProgress className="progress-xs" 
                                color={ item.total.diffclass }
                                value={ item.total.percent } />
                            </div>
                          </div>
                        </CCol>
                        <CCol md="2">
                            <CBadge color={ item.total.diffclass }>{ item.total.diff }</CBadge> &nbsp; 
                            <br />
                            { item.total.items } { item.total.items > 1 ? "itens concluídos" : "item concluído" } 
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol md='12'>
                          <div className="sessoeswrap">
                            { sessions.days[day].map( session => (
                                  <a href={`https://nobeta.monday.com/boards/316368019/views/6997054/pulses/${session.itemid}`}
                                    title={session.item} className={`sessoes ${session.status.toLowerCase()}`} target="blank">
                                        <div className="timestamp">
                                          <span>
                                            {session.horainicio}
                                          </span>
                                          <span>
                                            {session.horafim}
                                          </span>
                                        </div>
                                        {session.item.substring(0, 28)}
                                        <div className="duracao">
                                            duração: {session.duracaotempo}
                                        </div>
                                    </a>
                              ))
                            }
                          </div>
                        </CCol>
                      </CRow>
                      <hr className="mt-1" />
                      </>
                    )} ) }
                  
                </CCol>
              </CRow>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      
      <CDataTable
        items={tableData}
        fields={fields}
      />

    </>
  )
}

export default Dev