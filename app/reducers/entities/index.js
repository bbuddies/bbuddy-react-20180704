import merge from 'lodash/merge'
const initialState = {
  accounts: {},
  budgets: {}
}

export default function entities(state = initialState, action) {
  if (action.data && action.data.entities) {
    return merge({}, state, action.data.entities)
  }

  return state
}

