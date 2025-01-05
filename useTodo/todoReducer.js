export const todoReducer = (initialState = [], {type, payload} = {}) => {

  switch (type) {
    case 'ADD_TODO':
      return [...initialState, payload];
    case 'DELETE_TODO':
      return initialState.filter((item) => item.id !== payload);
    case 'TOGGLE_TODO':
      return initialState.map((item) => {
        if (item.id === payload) {
          return {
            ...item,
            done: !item.done
          }
        }
        return item;
      });
    default:
      return initialState;
  }

};