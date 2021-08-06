import React, { useState, useEffect, useContext } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CSelect,
  CLabel,
  CFormGroup,
  CButton,
  CToaster,
  CToast,
  CToastHeader,
  CToastBody
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { TIPOS, DEVSCODE}
  from 'src/constants.js'
import { CAMPANHAS } from 'src/campanhas'
import { hms } from 'src/reusable/funcoes.js'
import AppContext from 'src/services/AppContext.js'
import { getSiteData, addSiteData, getBacklogSiteData } from 'src/services/SiteService'


const ItensMes = ({match}) => {
  const [ sites, setSites ] = useState([]);
  const [ backlogsites, setBacklogSites ] = useState([]);
  const [ selecionado, setSelecionado ] = useState(0);
  const [ linha, setLinha ] = useState(-1);
  const [ siteSelecionado, setSiteSelecionado ] = useState(0);
  const [ campanhaSelecionado, setCampanhaSelecionado ] = useState(0);

  const [ notificacao , setNotificacao] = useState(false)

  useEffect( () => {
    async function loadData(){
      let _backlogdata = await getBacklogSiteData(_meta.mes, _meta.ano);
      let _data = await getSiteData();
      setBacklogSites( _backlogdata );
      setSites( _data );
    }
    loadData();
  }, []);

  const _meta = useContext( AppContext ).meta;
  const devscode = Object.getOwnPropertyNames(DEVSCODE);

  // Listando sessões
  let _items = []
  devscode.forEach( code => {
    _meta.devs[code].lista.dias.forEach( s => {
      TIPOS.forEach( tipo => {
          if( s.atividades[tipo].sessions.length > 0 ){
            _items = _items.concat( s.atividades[tipo].sessions )
          }
        } )
      })
  });

  // Somar as sessões por item
  let keys = []
  let sessoes = {};
  _items.forEach( item => {
    if( !keys.includes( item.itemid ) ){
      let k = item.itemid;
      keys.push( k );

      let _siteid = '-';
      _siteid = backlogsites.filter( s => s.itemid === parseInt(k) );
      
      if( _siteid.length > 0 ){
        _siteid = _siteid[0];
        if( _siteid.siteid === 0 && _siteid.campanha > 0 ){
          _siteid = `${_siteid.campanha}. ${CAMPANHAS[_siteid.campanha].titulo}`;
        }else{
          _siteid = `${_siteid.siteid}. ${_siteid.nome}`;
        }
      }else{
        _siteid = null;
      }

      sessoes[ k ] = { 
        duracao: 0,
        formatted: "",
        title: item.item,
        sessions: 0,
        siteid: _siteid
      }
    }
  });

  _items.forEach( item => {
    sessoes[ item.itemid ].duracao += item.duracao;
    sessoes[ item.itemid ].sessions ++;
  })

  function ligarSite(){
    async function loadData(){
      let data = {
        siteid: siteSelecionado,
        campanha: campanhaSelecionado,
        itemid: selecionado,
        itemtitle: sessoes[selecionado].title,
        duracao: sessoes[selecionado].duracao,
        sessoes: sessoes[selecionado].sessions,
        mes: _meta.mes,
        ano: _meta.ano
      }

      // TODO enviar notificação de gravado
      await addSiteData( data )
      setNotificacao( true );
      setTimeout( _ => { setNotificacao( false ) }, 3000 );
    }
    loadData()
  }

  function resetForm(){
    setSiteSelecionado(0);
    setCampanhaSelecionado(0);
  }

  function handleSelecionado( key, idx ){
    setLinha( idx );
    setSelecionado(key);
  }

  return (
    <>

    <CRow>
      <CCol md="8">
        <CCard>
          <CCardHeader>
            Itens do mês
            </CCardHeader>
          <CCardBody>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Item</th>
                  <th>Valor</th>
                  <th>Tempo</th>
                  <th>Sessões</th>
                  <th>Site/Campanha</th>
                  <th>Linkar</th>
                </tr>
              </thead>
              <tbody>
                { keys.map( (key, idx) => (
                  <tr className={ sessoes[key].siteid ? "bg-secondary" : ( linha === idx ) ? "bg-info" : ""}>
                    <td>{ key }</td>
                    <td>{ sessoes[key].title }</td>
                    <td>{ sessoes[key].duracao }s</td>
                    <td>{ hms( sessoes[key].duracao ) }</td>
                    <td>{ sessoes[key].sessions }</td>
                    <td>{ sessoes[key].siteid }  </td>
                    <td> 
                      <CFormGroup>
                        <CButton size="sm" className="float-right"
                          color="success" onClick={() => handleSelecionado(key, idx) }>
                          selecionar
                        </CButton>
                      </CFormGroup>
                    </td>
                  </tr>
                ) )  }
              </tbody>
            </table>
          
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="4">
        <CCard className="position-fixed">
          <CCardHeader>
            Linkar Item
            </CCardHeader>
          <CCardBody>
            { selecionado === 0 ? (
              <p>
              Selecione um item
              </p>
            ) : (
              <>
                <CFormGroup row>
                    <CCol md="3">
                      <CLabel>ID</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <p className="form-control-static">{ selecionado }</p>
                    </CCol>
                  </CFormGroup>
                          
                <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Item</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <p className="form-control-static">{ sessoes[selecionado].title }</p>
                    </CCol>
                  </CFormGroup>

                <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Duração</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <p className="form-control-static">
                        { sessoes[selecionado].duracao }s |&nbsp;
                        { hms(sessoes[selecionado].duracao) }
                      </p>
                    </CCol>
                  </CFormGroup>

                <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Sessões</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <p className="form-control-static">
                        { sessoes[selecionado].sessions }
                      </p>
                    </CCol>
                  </CFormGroup>

                <CFormGroup row>
                    <CCol md="3">
                      <CLabel>SiteID</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <p className="form-control-static">
                        <CSelect custom name={`item_${selecionado}`} id={`item_${selecionado}`}
                          onChange={e => setSiteSelecionado(e.currentTarget.value)} value={siteSelecionado}>
                            <option value='0'>Selecionar</option>
                          { sites.map( site => (
                            <option value={site.id}>{site.nome}</option>
                          )) }
                        </CSelect>
                      </p>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Campanha</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <p className="form-control-static">
                        <CSelect custom name={`campanha_${selecionado}`} id={`campanha_${selecionado}`}
                          onChange={e => setCampanhaSelecionado(e.currentTarget.value)} value={campanhaSelecionado}>
                            <option value='0'>Selecionar</option>
                          { CAMPANHAS.map( (campanha, idx) => {
                            if( _meta.mes === campanha.mes && _meta.ano === campanha.ano ) 
                              return (<option value={idx}>{idx}. {campanha.titulo}</option>)
                          }) }
                        </CSelect>
                      </p>
                    </CCol>
                </CFormGroup>

                  <CCardFooter>
                    <CButton type="button" size="sm"
                      color="primary" onClick={() => ligarSite()}>
                        <CIcon name="cil-scrubber" /> Enviar
                      </CButton> &nbsp; 
                      <CButton type="reset" onClick={() => resetForm()} size="sm" color="danger">
                        <CIcon name="cil-ban" /> Reset
                      </CButton>
                  </CCardFooter>
                </>
            ) }
            
          </CCardBody>
        </CCard>
      </CCol>

      
      <CToaster
        position='top-right'
        key='loadapi'
      >
        <CToast
          key={'toast1'}
          show={notificacao}
          autohide={3000}
          fade={true}
        >
          <CToastHeader closeButton={true}>
            Item Adicionado
          </CToastHeader>
          <CToastBody>
            {`O item #${selecionado} foi salvo.`}
          </CToastBody>
        </CToast>
          
      </CToaster>

      
    </CRow>

    </>
  )
}

export default ItensMes
