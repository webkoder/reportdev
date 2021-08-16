import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CAlert
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs';
import { getAllItems } from '../../services/ProdutividadeService';
import ItemsProcess from '../../services/ItemsProcess';


const Items = () => {
  const [items, setItems] = useState( new ItemsProcess() );
  const [loading, setLoading] = useState( true );

  useEffect( () => {
    async function loadData(){
      let _data = await getAllItems();
      let data = new ItemsProcess( );
      data.process( _data );
      setItems( data );
      setLoading( false );
    }
    loadData();
  }, []);

  const line = items.toDataSet();

  return (
    <>

    <CAlert color="warning" show={loading}>
      Carregando dados ... aguarde
    </CAlert>

    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <CChart type="line"
              datasets={ line.datasets } labels={ line.labels } />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <p>
     Total de itens { items.total.total }, { items.total.abertos } itens em aberto e { items.total.concluidos } finalizados
    </p>

    <p className="small">
      <b>Total:</b> Itens criados no mês; <b>Abertos:</b> Itens que não tem data de conclusão,
      <b>Concluídos:</b> Itens que foram concluído no mês, independente da data de criação,
      <b>No Mes:</b> Itens que foram criados e concluídos no mesmo mês,
      <b>Saldo:</b> Evolução dos itens em aberto do mês anterior
    </p>

    <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Evolução do Backlog
            </CCardHeader>
            <CCardBody>

              <CDataTable
                items={ items.meses }
                fields={['mesanof', 'total', 'abertos', 'concluidos', 'no_mes', 'saldo']}
              />

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}

export default Items
