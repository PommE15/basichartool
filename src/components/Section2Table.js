import React from 'react';
import {connect} from 'react-redux';
import './Section2Table.css';
import {nextStep, activeStep} from '../actions';
//import scrollTo from '../lib/scrollTo';


const STEP = 2;
const mapDispatchToProps = (dispatch) => ({
  onClickCreate: () => {
    dispatch(nextStep(STEP));
    dispatch(activeStep(STEP + 1));
  },
  // TODO:
  // onChangeFormat: () => {}
  // onToggleRows: () => {}
  // onToggleCols: () => {}
  // onTranspose: () => {}
});

const mapStateToProps = (state) => ({
    dataTable: state.dataTable,
    stepActive: state.stepActive
});


class Section extends React.Component {
    componentDidMount() {
      //this.node = React.findDOMNode(this);
    }
    componentDidUpdate() {
      //this.node.innerHTML = this.props.value;
    }

    render() {
        const {dataTable, stepActive, onClickCreate/*, onChangeContent*/} = this.props;
        //console.log(this.props)
        const isData = dataTable.body ? true : false;
        const dataTypes = isData ? dataTable.type : [];
        const tableHead = isData ? dataTable.head : [];
        const tableBody = isData ? dataTable.body : [];

        return (
            <div className={"section" + ((stepActive>=STEP)?"":" d-n")} id="section2">
                <h1>2. Toggle your dataset</h1>
                <div className={isData?"":" o-0"}>

                {/* table */}
                <div className="table">
                <table>
                  <thead>
                    <tr>{tableHead.map((head, i) =>
                      <th key={"lab-"+i}>{head}</th>
                    )}</tr>
                    <tr>{dataTypes.map((type, i) =>
                      <th key={"key-"+i} className={type.list[0] + " fw-n ws-n"}>
                        {/*<span contentEditable={true}>*/}
                        {/* how about use text input ? */}
                          {type.list[0].toUpperCase() +
                          (type.format!=="" ? " : " + type.format : "")}
                        {/*</span>*/}
                      </th>
                    )}</tr>
                  </thead>
                  <tbody>
                    {tableBody.map((tr, i) =>
                      <tr key={"row-"+(i+1)}>{[i+1].concat(tr).map((td, j) =>
                        <td key={"col-"+(j+1)} className={dataTypes[j].list[0] + (!td ? " null" : "") + " ws-n"}>
                          {td ? td : "null"}
                        </td>)}
                      </tr>
                    )}
                  </tbody>
                </table>
                </div>

                {/* button */}
                <input
                  type="button"
                  className={"button btn-create"}
                  value="Create Visualizations"
                  onClick={() => onClickCreate()}
                />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section);
