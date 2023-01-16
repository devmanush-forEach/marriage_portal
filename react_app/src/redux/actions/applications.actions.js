import { axiosGet } from "../../helpers/axiosRequests";

export const actionTypes = {
  SET_APPLICATIONS: "SET_APPLICATIONS",
};

export const set_Applications = (payload) => {
  return {
    type: actionTypes.SET_APPLICATIONS,
    payload,
  };
};

export const get_Applications = () => {
  return async (dispatch) => {
    try {
      const { data: applications } = await axiosGet("/application/all");

      dispatch(set_Applications(applications));
    } catch (error) {}
  };
};
