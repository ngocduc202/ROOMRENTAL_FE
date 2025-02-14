import actionTypes from "../action/actionTypes";

const initState = {
  currentData: {}
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT:
      return {
        ...state,
        currentData: action.currentData || {}
      }
      case actionTypes.LOGOUT:
      return {
        ...state,
        currentData: {}
      }
    default:
      return state;
  }
}


export default userReducer