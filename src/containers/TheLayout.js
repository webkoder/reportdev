import React, {  useState, useEffect } from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { AppProvider } from '../services/AppContext';
import DevMeta from 'src/models/DevMeta';
import { getTimeControlData, getBacklogItemsData } from '../services/ProdutividadeService';
import { Redirect } from 'react-router-dom';


const TheLayout = () => {
  let currentdate = new Date();
  // Objeto Principal com todos os dados da aplicação
  const [meta, setMeta] = useState( new DevMeta() );
  const [mes, setMes] = useState( { mes: currentdate.getMonth(), ano: currentdate.getFullYear() } );
  const [isLoading, setLoading] = useState( true );
  const logado = (document.cookie.match(/nbtitcontract=xbjSm6HH4EM4QxQ9/) !== null);

  function updateMes(mes, ano){
    setLoading( true )
    setMes({mes, ano })
  }

  useEffect( () => {
    async function loadData(){
        // Lista de grupos com dev, tempo de produtividade e status
        let _timedata = await getTimeControlData();
        // Lista de grupos com data de criação, status, dev
        let _itemsdata = await getBacklogItemsData();
        let _meta = new DevMeta(mes);
        _meta.setTimeControlData( _timedata );
        _meta.setBacklogItemsData( _itemsdata );
        _meta.calc();
        _meta.formatter();
        setMeta( _meta );
        setLoading( false );
    }
    loadData();
  }, [mes] );


  if( !logado ){
    return (<Redirect to="/login" />)
  }

  return (
    <div className="c-app c-default-layout">
      <AppProvider value={{ meta, mes, updateMes }}>
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader loading={isLoading}/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </AppProvider>
    </div>
  )
}

export default TheLayout
