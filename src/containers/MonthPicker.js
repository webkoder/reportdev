import React, { useContext } from 'react'
import AppContext from 'src/services/AppContext.js'
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { getMes } from 'src/reusable/funcoes'


const MonthPicker = () => {
  const mes = useContext( AppContext ).mes;
  const label = `${getMes(mes.mes)}-${mes.ano}`
  const updateMes = useContext( AppContext ).updateMes

  // Lista dos ultimos 6 meses
  function getLista(){
    let lista = [];
    let date = new Date();
    for (let i = 6; i > 0; i--) {
      lista.push((
        <CDropdownItem>
          <CButton color="primary" size="sm"
            data-mes={date.getMonth()} data-ano={date.getFullYear()}
            onClick={(e) =>  updateMes(parseInt(e.target.dataset.mes), parseInt(e.target.dataset.ano)) }>
            { getMes(date.getMonth()) } - { date.getFullYear() }
          </CButton>
        </CDropdownItem>
      ));
      date.setMonth( date.getMonth() -1 );
    }

    return lista
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
      <CIcon name="cil-calendar" /> {label}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>Meses disponíveis</strong>
        </CDropdownItem>
        { getLista().map( item => (item)) }
        {/* <CDropdownItem>
          <CButton color="primary" size="sm"
            onClick={() => updateMes(5, 2021)}>
            Julho - 2021
          </CButton>
        </CDropdownItem>
        <CDropdownItem>
          <CButton color="primary" size="sm"
            onClick={() => updateMes(5, 2021)}>
            Junho - 2021
          </CButton>
        </CDropdownItem>
        <CDropdownItem>
          <CButton color="primary" size="sm"
            onClick={() => updateMes(4, 2021)}>
            Maio - 2021
          </CButton>
        </CDropdownItem>
        <CDropdownItem>
          <CButton color="primary" size="sm"
            onClick={() => updateMes(3, 2021)}>
            Abril - 2021
          </CButton>
        </CDropdownItem>
        <CDropdownItem>
          <CButton color="primary" size="sm"
            onClick={() => updateMes(2, 2021)}>
            Março - 2021
          </CButton>
        </CDropdownItem>
        <CDropdownItem>
          <CButton color="primary" size="sm"
            onClick={() => updateMes(1, 2021)}>
            Fevereiro - 2021
          </CButton>
        </CDropdownItem>
        <CDropdownItem>
          <CButton color="primary" size="sm"
            onClick={() => updateMes(0, 2021)}>
            Janeiro - 2021
          </CButton>
        </CDropdownItem>
        <CDropdownItem>
          <CButton color="primary" size="sm"
            onClick={() => updateMes(11, 2020)}>
            Dezembro - 2020
          </CButton>
        </CDropdownItem>
        <CDropdownItem>
          <CButton color="primary" size="sm"
            onClick={() => updateMes(10, 2020)}>
            Novembro - 2020
          </CButton>
        </CDropdownItem> */}

      </CDropdownMenu>
    </CDropdown>
  )
}

export default MonthPicker