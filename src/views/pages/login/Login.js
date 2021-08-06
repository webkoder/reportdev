import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { contact, report, TOKEN } from 'src/config'

const Login = () => {
  const [usuario, setUsuario] = useState({name:'', password: ''});
  const [log, setLog] = useState(false);

  const entrar = () => {
    if( usuario.name === contact ){
      if( usuario.password === report ){
        document.cookie = `nbtitcontract=${TOKEN}`;
        setLog(true)
      }else{
        // TODO trocar pela notificação do sistema
        alert('Senha inválida')
      }
    }else{
      alert('usuário/senha inválido')
    }
  }

  const setField = event => {
    event.persist();
    let _u = {...usuario}
    _u[event.target.name] = event.target.value;
    setUsuario(_u);
  }

  if( log ){
    return (<Redirect to="/dashboard" />)
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Dev Report</h1>
                    <p className="text-muted"></p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username"
                        name='name'
                        onChange={setField}
                        autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password"
                        name='password'
                        onChange={setField}
                        autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={entrar}>Login</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>:)</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
