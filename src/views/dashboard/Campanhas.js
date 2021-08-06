import React, { useContext, useEffect, useState } from 'react'
import AppContext from 'src/services/AppContext.js'

import {
  CCol,
  CRow,
  CWidgetIcon,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { getSiteInfoData } from 'src/services/SiteService'
import { hms, mf } from 'src/reusable/funcoes'
import { CAMPANHAS } from 'src/campanhas'


const Campanhas = () => {
  const [sites, setSites] = useState([]);
  const [total, setTotal] = useState([]);
  const _meta = useContext( AppContext ).meta;

  useEffect( () => {
    async function loadData(){
      let _data = await getSiteInfoData(_meta.mes, _meta.ano);
      let _total = {duracao:0, sessoes: 0}

      _data = _data.filter( item => {
        if(item.siteid === 0)
          return item;
        return null;
      });

      _data.forEach( item => {
        if( item.siteid === 0 && item.campanha > 0 ){
          item.nome = CAMPANHAS[ item.campanha ].titulo;
          item.siteid = item.campanha;
        }
        _total.duracao += parseInt(item.duracao);
        _total.sessoes += parseInt(item.sessoes);
      });

      _data = _data.map( item => {
        item.percent = mf((item.duracao / _total.duracao) * 100)
        return item
      })

      _total.duracao = hms( _total.duracao )

      setTotal( _total );
      setSites( _data );
    }
    loadData();
  }, []);

  return (
    <>

      <CRow>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetIcon text="tempo total" header={total.duracao} color="primary" iconPadding={false}>
            <CIcon width={24} name="cil-laptop" className="mx-5"/>
          </CWidgetIcon>
        </CCol>

        <CCol xs="12" sm="6" lg="4">
          <CWidgetIcon text="Sessões" header={total.sessoes} color="warning" iconPadding={false}>
            <CIcon width={24} name="cil-calendar" className="mx-5"/>
          </CWidgetIcon>
        </CCol>
      </CRow>

      <CRow className="mb-2">
        { sites.map( site => (
        <CCol className="mb-2" xs="12" sm="6" lg="4">
          <div className="sitecard">
            <div className="header">
              <div className="logo" style={{background:'#FFCC00'}}>
                &nbsp;
              </div>
              <div className="title">
                {site.nome.substring(0,25)}
              </div>
            </div>
            <div className="body">
            {site.percent}%<b>{ hms(site.duracao) }</b>
            <CProgress
              className="mb-1 bg-dark"
              color="success"
              value={site.percent} />
            </div>
          </div>
        </CCol>
        ) ) }
      </CRow>

      <CRow>
        <CCol md="8">
          
        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
            <thead className="thead-light">
              <tr>
                <th className="text-center"><CIcon name="cil-people" /></th>
                <th>Site</th>
                <th>Uso</th>
                <th className="text-center">Duração</th>
                <th>Sessões</th>
              </tr>
            </thead>
            <tbody>
              { sites.map( site => (
                <tr>
                  <td className="text-center">
                    <div className="c-avatar" style={{background:'#'+site.bg}}>
                      { site.logo ? (
                        <img src={`data:image/png;base64, ${site.logo}`} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                      ) : '' }
                    </div>
                  </td>
                  <td>
                    <div>{site.nome}</div>
                    <div className="small text-muted">
                      <span>ID</span> {site.siteid}
                    </div>
                  </td>
                  <td>
                    <div className="clearfix">
                      <div className="float-left">
                        <strong>{site.percent}%</strong>
                      </div>
                      <div className="float-right">
                        <small className="text-muted"></small>
                      </div>
                    </div>
                    <CProgress className="progress-xs" color="success" value={site.percent} />
                  </td>
                  <td className="text-center">
                    { hms(site.duracao) }
                  </td>
                  <td>
                    <div className="small text-muted">Número de sessões</div>
                    <strong>{site.sessoes}</strong>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
          
        </CCol>
      </CRow>

    </>
  )
}

export default Campanhas
