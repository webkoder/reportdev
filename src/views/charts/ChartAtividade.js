import React from 'react'
import PropTypes from 'prop-types'
import { getColor } from '@coreui/utils'
import { CChartBar } from '@coreui/react-chartjs'
import { TIPOSF } from 'src/constants'

const ChartAtividade = props => {

  const {
    backgroundColor,
    pointHoverBackgroundColor,
    dataPoints,
    label,
    pointed,
    ...attributes
  } = props

  const defaultDatasets = (()=>{
    return [
      {
        data: dataPoints[0],
        backgroundColor: [
          '#40D698',
          '#E2445C',
          '#FFCB00',
          '#A25DDC',
          '#7E3B8A',
          '#ff642e',
          '#579BFC',
          '#003b14',
          '#995e00'
        ],
        pointHoverBackgroundColor: getColor(pointHoverBackgroundColor),
        label: 'Itens',
        barPercentage: 0.8,
        categoryPercentage: 1
      },
      {
        data: dataPoints[1],
        backgroundColor: [
          '#20B476',
          '#C0223A',
          '#DDA900',
          '#903BBA',
          '#5C1998',
          '#DD420C',
          '#3576DA',
          '#016322',
          '#633e01'
        ],
        pointHoverBackgroundColor: getColor(pointHoverBackgroundColor),
        label: 'Produtividade',
        barPercentage: 0.8,
        categoryPercentage: 1
      },
    ]
  })()

  const defaultOptions = (()=>{
    return {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    }
  })()

  // render
  return (
    <CChartBar
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={TIPOSF}
    />
  )
}

ChartAtividade.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  //
  backgroundColor: PropTypes.string,
  pointHoverBackgroundColor: PropTypes.string,
  dataPoints: PropTypes.array,
  label: PropTypes.string,
  pointed: PropTypes.bool
};

ChartAtividade.defaultProps = {
  backgroundColor: 'rgba(0,0,0,.2)',
  dataPoints: [10, 22, 34, 46, 58, 70, 46],
  label: 'Itens'
};

export default ChartAtividade
