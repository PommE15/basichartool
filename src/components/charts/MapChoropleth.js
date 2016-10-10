import React from 'react'
import {connect} from 'react-redux'
import {drawMap} from './map'
import getParsedData from './mapData'
import {d3} from '../../lib/d3-lite'

/*
  data spec
  missing data accepted
  cols [2, 3]
  - string: country code and/or name  => mapping
  - number: any range                 => country's color
*/

const mapDispatchToProps = (dispatch) => ({
})

const mapStateToProps = (state) => ({
  stepActive: state.stepActive,
  dataCols: state.dataTable.cols,
  dataType: state.dataTable.type
})


class Map extends React.Component {
  //componentDidMount
  componentWillUpdate(){
    //console.log("MapChoropleth")
    if (!this.props.dataCols) return

    /* data */
    const dataChart = getParsedData(this.props.dataCols, this.props.dataType)

    /* draw */
    const els = this.refs

    if (dataChart) {
      drawMap(els)

      d3.select(els.svg)
      .classed("d-n", false)

      d3.select(els.countries)
      .selectAll("path")
      .attr("fill", (d) => {
        let val = dataChart.data[d.properties[dataChart.type]]
        let color = val ? dataChart.scaleColor(val) : "#dcdcdc" //n-4
        //console.log(color, dataChart.color.indexOf(dataChart.color1(val)), d.properties.code, val, d.properties.name)
        return color
      })

    } else {
      d3.select(els.svg)
      .classed("d-n", true)
    }
  }

  render() {
    return (
      <svg ref="svg">
        <g ref="countries"></g>
        <g ref="borders"></g>
        <g ref="lakes"></g>
      </svg>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)