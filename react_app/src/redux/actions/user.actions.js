export const actionTypes = {
  SET_USER: "SET_USER",
};

export const set_User = (payload) => {
  return {
    type: actionTypes.SET_USER,
    payload,
  };
};
