//local state this is attached to
export default function (state = null, action) {
  switch (action.type) {
    case 'ACC_SELECTED':
      return action.payload;
  }
  return state;
};
