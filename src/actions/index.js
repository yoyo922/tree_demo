export function selectAcc(acc) {
  //selectbook is an actioncreator, return action
  return {
    type: 'ACC_SELECTED',
    payload: acc
  };
}
