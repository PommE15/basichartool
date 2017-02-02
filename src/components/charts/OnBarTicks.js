import React from 'react'
import {connect} from 'react-redux'
import {d3} from '../../lib/d3-lite'
import {updateChartData} from '../../actions'
import {addBarsBackground} from './onBar'


const barHeight = 16
const tickWidth = 6
const tickShift = tickWidth / 2
const tickBorderRadius = 2

const mapStateToProps = (state) => ({
  data: state.dataChart,
  colors: state.dataSetup.colors
})

const mapDispatchToProps = (dispatch) => ({
  onSelect: (keys, scale) => dispatch(updateChartData(keys, scale))
})


class TickOnBar extends React.Component {

  componentDidMount() {
    this.renderChart()
  }
  componentDidUpdate() {
    this.renderChart()
  }

  render() {
    const {data, onSelect, callByStep} = this.props
    const setChartData = () => {
      if (callByStep === 3) { onSelect(data.keys, this.scale) }
    }

    return (
      <div className="chart" ref="div" onClick={setChartData}></div>
    )
  }

  renderChart() {

    /* data */
    const {data, colors} = this.props

    // scale
    this.scale = {}
    this.scale.x = d3.scaleLinear()
    .domain(d3.extent(data.numbers))
    .range([0, 100])

    // chart
    this.dataChart = data.numberRows.map((numbers, i) => {
      const count = {}
      numbers.forEach(num => count[num] = (count[num] || 0) + 1)
      //             (num => count[num] = count[num] ? count[num] + 1 : 1)
      return numbers.map((num, i) => ({
        value: num,
        index: numbers.slice(0, i+1).filter(n => n === num).length,
        count: count[num],
        color: colors[i]
      }))
      // sort to help with overlapped layout
      .sort((num1, num2) => num1.value - num2.value)
      .sort((num1, num2) => num1.count - num2.count)
    })


    /* draw */
    this.drawChart({scaleX: this.scale.x})
  }

  drawChart(opt) {

    let gs = addBarsBackground(this.refs.div, this.dataChart, tickShift)

    // ticks
    gs.append("div")
    .attr("title", d => d.value)
    .style("background-color", d => d.color)
    //.style("opacity", 0.85)
    .style("width", tickWidth + "px")
    .style("height", d => (barHeight/d.count) + "px")
    .style("position", "absolute")
    .style("top", d => (barHeight * (d.index-1) / d.count) + "px")
    .style("left", d => "calc(" + opt.scaleX(d.value) + "% - " + tickShift + "px)")
    //.style("border-radius", tickBorderRadius + "px")
    .style("border-top-right-radius",    d => d.index === 1       ? tickBorderRadius + "px" : false)
    .style("border-top-left-radius",     d => d.index === 1       ? tickBorderRadius + "px" : false)
    .style("border-bottom-right-radius", d => d.index === d.count ? tickBorderRadius + "px" : false)
    .style("border-bottom-left-radius",  d => d.index === d.count ? tickBorderRadius + "px" : false)
    // hide null data
    .style("opacity", d => d.value === null ? 0 : false)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TickOnBar)
