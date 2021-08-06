import React from 'react'
import {
  CCardGroup,
  CWidgetProgressIcon,
  CRow, CCol, CWidgetProgress
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const SummaryWidget = ({data}) => {

    return (
        <>
            <CCardGroup className="mb-4">
                
                <CWidgetProgressIcon
                header={ data.produtividade.executado.formatted }
                text="Uso de tempo"
                color="gradient-primary"
                value={ data.produtividade.executado.percent }
                inverse
                >
                <CIcon name="cil-speedometer" height="36"/>
                </CWidgetProgressIcon>

                <CWidgetProgressIcon
                    header={ data.tempo.executado.formatted }
                    text="Tempo médio por item"
                    color="gradient-success"
                    value={ data.tempo.executado.percent }
                    inverse
                >
                <CIcon name="cil-userFollow" height="36"/>
                </CWidgetProgressIcon>

                <CWidgetProgressIcon
                    header={ data.items.executado.value }
                    text="Itens Concluídos"
                    color="gradient-warning"
                    value={ data.items.executado.percent }
                    inverse
                >
                <CIcon name="cil-basket" height="36"/>
                </CWidgetProgressIcon>

            </CCardGroup>
            <CRow>
                <CCol xs="12" sm="6" lg="3">
                    <CWidgetProgress inverse
                        color="primary"
                        header={ data.produtividade.acumulado.formatted }
                        text="Tempo Acumulado"
                        value={ data.produtividade.acumulado.percent }
                        footer={ `Total de ${ data.produtividade.final.formatted }` }/>
                </CCol>

                <CCol xs="12" sm="6" lg="3">
                    <CWidgetProgress inverse
                        color="primary"
                        header={ data.produtividade.saldo.formatted }
                        text="Saldo de tempo"
                        value={ data.produtividade.acumulado.percent }
                        footer={ `Teto de ${ data.produtividade.teto.formatted }` }/>
                </CCol>

                <CCol xs="12" sm="6" lg="3">
                    <CWidgetProgress inverse
                        color="success"
                        header={ data.tempo.saldo.formatted }
                        text="Saldo de horas por item"
                        value={ 50 }
                        footer={ `Total de ${ data.tempo.final.formatted }` }/>
                </CCol>

                <CCol xs="12" sm="6" lg="3">
                    <CWidgetProgress inverse
                        color="warning"
                        header={ `${data.items.saldo.value} itens` }
                        text="Saldo de Itens"
                        value={ data.items.saldo.percent }
                        footer={ `Total de ${ data.items.final.value }` }/>
                </CCol>


            </CRow>
        </>
    )
}

export default SummaryWidget