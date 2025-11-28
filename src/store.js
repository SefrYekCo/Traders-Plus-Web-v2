import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  userModal:false,
  planTypeModal:false
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'USERMODAL':
      return { ...state, userModal:!state.userModal }
    case 'planTypeModal':
      return { ...state, planTypeModal:!state.planTypeModal }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
