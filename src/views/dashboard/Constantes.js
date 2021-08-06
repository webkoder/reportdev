import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CListGroup,
  CListGroupItem,
  CButton
} from '@coreui/react'
import { TIPOS, TIPOSF, DEVS, MONDAYDEVNAME,
  METAPRODUTIVIDADE, KPIITEMS, METAITEMS,  KPITEMPO, METATEMPO,
  MONDAYGROUPS, 
  FERIADOS}
  from 'src/constants.js'
import { hms } from 'src/reusable/funcoes.js'
import { getGroupsData } from 'src/services/ProdutividadeService'


const Constantes = ({match}) => {
  const [ grupos, setGrupos ] = useState([])
  let _devcodes = Object.getOwnPropertyNames(MONDAYDEVNAME);

  useEffect( () => {
    let _g = MONDAYGROUPS.map( item => { return {id:item, title:"", inUse:true }} )
    setGrupos( _g );
  }, []);

  function checkGroups(){
    async function loadData(){
      let _data = await getGroupsData();
      let _g = _data.map( item => {
        item.inUse = MONDAYGROUPS.includes( item.id )
        return item
      });
      setGrupos( _g );
      
    }
    loadData();
  }
  
  return (
    <>

    <p>
      Valores hard-coded no sistema, localizado em <code className="highlighter-rouge">./src/constants.js</code>
    </p>

    <CRow>
      <CCol md="6">
        <CCard>
          <CCardHeader>
            Métricas
            </CCardHeader>
          <CCardBody>
          <CListGroup>
            <CListGroupItem>
              <mark> Meta de produtividade: </mark> { METAPRODUTIVIDADE }
              <span className="float-right"> {METAPRODUTIVIDADE*100}% </span>
            </CListGroupItem>
            <CListGroupItem>
              <mark> KPI de itens concluídos: </mark> { KPIITEMS }
              <span className="float-right"> {KPIITEMS*100}% </span>
            </CListGroupItem>
            <CListGroupItem>
              <mark> Meta de itens concluídos: </mark> { METAITEMS }
              <span className="float-right"> {METAITEMS*100}% </span>
            </CListGroupItem>
            <CListGroupItem>
              <mark> KPI de horas por itens: </mark> { KPITEMPO }
              <span className="float-right"> {hms(KPITEMPO)} </span>
            </CListGroupItem>
            <CListGroupItem>
              <mark> Meta de horas por itens: </mark> { METATEMPO }
              <span className="float-right"> {hms(METATEMPO)} </span>
            </CListGroupItem>
          </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CRow>
      <CCol md="6">
        <CCard>
          <CCardHeader>
            Grupo de Backlog (Monday)
            <CButton className="float-right"
              color="primary" size="sm"
              onClick={() => checkGroups()}>Verificar</CButton>
            </CCardHeader>
          <CCardBody>
          <CListGroup>
          { grupos.map( item => (
            <CListGroupItem className={ item.inUse ? "previsto" : "imprevisto" }>
              { item.id } { item.title }
            </CListGroupItem>
          )) }
          </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="6">
        <CCard>
          <CCardHeader>
            Days Off
            </CCardHeader>
          <CCardBody>
          <CListGroup>
          { FERIADOS.map( item => (<CListGroupItem>{ item.dia }/{ item.mes }/{ item.ano }: &nbsp;
            { item.texto }</CListGroupItem>)) }
          </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CRow>
      <CCol md="6">
        <CCard>
          <CCardHeader>
            Tipos de atividades
            </CCardHeader>
          <CCardBody>
          <CListGroup>
          { TIPOS.map( item => (<CListGroupItem className={item}>{ item }</CListGroupItem>)) }
          </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="6">
        <CCard>
          <CCardHeader>
            Tipos de atividades Formatados
            </CCardHeader>
          <CCardBody>
          <CListGroup>
          { TIPOSF.map( item => (<CListGroupItem>{ item }</CListGroupItem>)) }
          </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CRow>
      <CCol md="6">
        <CCard>
          <CCardHeader>
            Devs
            </CCardHeader>
          <CCardBody>
          <CListGroup>
          { DEVS.map( item => (<CListGroupItem className={item.toLocaleLowerCase()}>{ item }</CListGroupItem>)) }
          </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="6">
        <CCard>
          <CCardHeader>
            ID Devs (Monday)
            </CCardHeader>
          <CCardBody>
          <CListGroup>
          { _devcodes.map( item => (<CListGroupItem>{ item }: { MONDAYDEVNAME[item] }</CListGroupItem>)) }
          </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>


    </>
  )
}

export default Constantes
