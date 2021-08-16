import React, { useState, useEffect, useContext } from 'react'
import AppContext from 'src/services/AppContext.js'
import { getLastWorkday, dateformat, hms, getMes } from 'src/reusable/funcoes'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardHeader,
  CBadge,
  CProgress
} from '@coreui/react'
import { SessionOrderService } from '../../services/SessionOrderService'

const Diario = () => {
  const [ now, setNow ] = useState(new Date());

  useEffect(() => {
    setInterval( function(){
      setNow( new Date())
    }, 1000 )
  }, [])

  let meta = useContext( AppContext ).meta;
  let lastday = getLastWorkday();

  let today = [];
  let todaydate = new Date()
  let todaydatef = `${todaydate.getDate()} / ${getMes(todaydate.getMonth())}`

  let lastdaySession = meta.devscode.map( devcode => {
    let dev = meta.devs[ devcode ];
    let dias = dev.lista.dias;
    let sessions = new SessionOrderService()
    sessions.extractSessionsByDays( dias )

    // aproveitar o loop e pegar as atividades de hoje
    today.push( {
        "name": dev.name,
        "list": sessions.days[ todaydate.getDate() ],
        "total": dev.lista.dias[ todaydate.getDate() ].total
    })

    return {
      "name": dev.name,
      "list": sessions.days[ lastday.date ],
      "total": dev.lista.dias[ lastday.date ].total
    }
  })


  let current = meta.devscode.map( devcode => {
    let dev = meta.devs[ devcode ];
    if( dev.atuais.length === 0 ) return null;

    return {
      "name": dev.name,
      "atuais": dev.atuais
    }
  })
  .filter( dev => dev != null)

  function getDuration(ini){
    let _diff = now.getTime() - ini.getTime()
    return hms( _diff/1000 )
  }

  // TODO quando não houver nenhuma atividade, colocar mensagem
  // TODO Alterar visual do card das atividades atuais

  return (
    <>

      <h3>Atividades Atuais</h3>
      <CRow>

      {
        current.map( list => (
          <>
              <CCol md='4'>
              <CCard>
                <CCardHeader>
                  { list.name }
                </CCardHeader>
                <CCardBody>
              { list.atuais.map( session => (
                <>
                <h5>{session.item.substring(0, 28)}</h5>
                <a href={`https://nobeta.monday.com/boards/316368019/views/6997054/pulses/${session.itemid}`}
                  title={session.item} className={`sessoes ${session.status.toLowerCase()}`} target="blank">
                      <div className="timestamp">
                        <span>
                            { dateformat(session.ini, true) }
                          </span>
                          <span>
                            { dateformat(now, true) }
                          </span>
                      </div>
                      
                      <div className="duracao">
                          Duração: { getDuration(session.ini) }
                      </div>
                  </a>
                  </>
              )) }
              </CCardBody>
              </CCard>
              </CCol>
          </>
        ))
      }
      </CRow>


      <h3>Atividades de {todaydatef}</h3>
      {
        today.map( _today => (
          
            <CRow>
              <CCol>
                <CCard>
                <CCardHeader>
                { _today.name }
                </CCardHeader>
                <CCardBody>
                <CRow>
                  <CCol md="10">
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          <CBadge color={ _today.tempo === 0 ? "danger" : "success"}>{ _today.dia }</CBadge>
                          <br /> <b>{ _today.diasemana }</b><br />
                        </span>
                      </div>
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        </span>
                      </div>
                      <div className="progress-group-bars">
                      <div className="clearfix">
                          <div className="float-left">
                            <strong>{ _today.total.percent } %</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">{ _today.total.tempo }</small>
                          </div>
                        </div>
                        <CProgress className="progress-xs" 
                          color={ _today.total.diffclass }
                          value={ _today.total.percent } />
                      </div>
                    </div>
                  </CCol>
                  <CCol md="2">
                      <CBadge color={ _today.total.diffclass }>{ _today.total.diff }</CBadge> &nbsp; 
                      <br />
                      { _today.total.items } { _today.total.items > 1 ? "itens concluídos" : "item concluído" } 
                  </CCol>
                </CRow>

                <CRow>
                  <CCol md='12'>
                  <div className="sessoeswrap">
                    { _today.list.map( session => (
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
              
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        ))
      }

      <h3>Atividades de {lastday.datef}</h3>
      {
        lastdaySession.map( _lastday => (
          
            <CRow>
              <CCol>
                <CCard>
                <CCardHeader>
                { _lastday.name }
                </CCardHeader>
                <CCardBody>
                <CRow>
                  <CCol md="10">
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          <CBadge color={ _lastday.tempo === 0 ? "danger" : "success"}>{ _lastday.dia }</CBadge>
                          <br /> <b>{ _lastday.diasemana }</b><br />
                        </span>
                      </div>
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        </span>
                      </div>
                      <div className="progress-group-bars">
                      <div className="clearfix">
                          <div className="float-left">
                            <strong>{ _lastday.total.percent } %</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">{ _lastday.total.tempo }</small>
                          </div>
                        </div>
                        <CProgress className="progress-xs" 
                          color={ _lastday.total.diffclass }
                          value={ _lastday.total.percent } />
                      </div>
                    </div>
                  </CCol>
                  <CCol md="2">
                      <CBadge color={ _lastday.total.diffclass }>{ _lastday.total.diff }</CBadge> &nbsp; 
                      <br />
                      { _lastday.total.items } { _lastday.total.items > 1 ? "itens concluídos" : "item concluído" } 
                  </CCol>
                </CRow>

                <CRow>
                  <CCol md='12'>
                  <div className="sessoeswrap">
                    { _lastday.list.map( session => (
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
              
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        ))
      }
    </>
  )
}

export default Diario
