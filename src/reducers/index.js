import { combineReducers } from 'redux';

// function dummyReducer(prevState = {}, action) {
//     switch (action.type) {
//     case 'GO_TO_BED':
//       // return {
//       //   ...prevState,
//       //   sleeping: true,
//       // };
//       return Object.assign(
//         {},
//         prevState,
//         stomach: prevState.stomach,
//         {sleeping: true}
//       );
//     case 'EAT_SOMETHING':
//       if (prevState.sleeping) {
//         // cannot eat and sleep
//       }
//       return {
//         ...prevState,
//         stomach: [...prevState.stomach, action.food],
//       };
//     default:
//       return prevState;
//     }
// }

function step(step = 1, action) {
  switch(action.type) {
    // navigation
    case 'CHANGE_STEP':
      return action.step
    /*case 'NEXT_STEP':
      return action.step + 1
    */
    // sections
    case 'CLEAR_DATA':
      return 1
    case 'IMPORT_DATA':
      return 2
    case 'ANALYZE_DATA':
      return 3

    default:
      return step
  }
}
function stepActive(stepActive = 1, action) {
  switch(action.type) {
    /*/ navigation
    case 'ACTIVE_STEP':
      return action.stepActive
    */
    // sections
    case 'CLEAR_DATA':
      return 1
    case 'IMPORT_DATA':
      return 2
    case 'ANALYZE_DATA':
      return 3

    default:
      return stepActive
  }
}

function dataInput(dataInput = "", action) {
  switch(action.type) {
    case 'CLEAR_DATA':
      return ''
    case 'INPUT_DATA':
      return action.dataInput
    default:
      return dataInput
  }
}

function dataTable(dataTable = {}, action) {
  switch(action.type) {
    case 'CLEAR_DATA':
      return ''
    case 'IMPORT_DATA':
      return action.dataTable

    case 'TRANSPOSE_DATA':
      let newDataTable = { ...dataTable }

      console.log(dataTable.head)
      console.log(dataTable.rows)
      console.log(dataTable.cols)

      let head = [dataTable.head[0]].concat(dataTable.cols[0])
      let rows = dataTable.cols.slice(1).map((col, i) => [dataTable.head[i+1]].concat(col))

      console.log(rows)
      console.log(head)

      newDataTable.cols = dataTable.rows
      newDataTable.rows = rows
      newDataTable.body = rows
      newDataTable.head = head

      return newDataTable

    default:
      return dataTable
  }
}

function show(show = {col: [], row: []}, action) {
  switch(action.type) {
    case 'IMPORT_DATA':
      return {
        row: action.dataTable.rows.map(() => true),
        col: action.dataTable.cols.map(() => true),
      }

    case 'TOGGLE_DATA':
      const {target, index} = action
      const newVal = show[target][index] ? false : true

      let newShow = { ...show }

      newShow[target] = [
        ...show[target].slice(0, index),
        newVal,
        ...show[target].slice(index + 1),
      ]

      //console.log('Toggling ', target, index);
      //console.log('new val ', newVal);
      //console.log(show[target][index]);
      //console.log(newShow[target][index]);
      //console.dir(newShow);
      return newShow

    default:
      return show
  }
}

function dataBrief(dataBrief = {}, action) {
  switch(action.type) {
    case 'ANALYZE_DATA':
      return action.dataBrief
    default:
      return dataBrief
  }
}

const app = combineReducers({
  step,
  stepActive,
  dataInput,
  dataTable,
  show,
  dataBrief
});

export default app
