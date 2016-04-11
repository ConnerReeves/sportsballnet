export const createReducer = (initialState, handlers) => (state = initialState, action) => {
  return handlers[action.type] && handlers[action.type](state, action) || state;
};
