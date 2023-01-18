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
      let { data: applications } = await axiosGet("/application/all");

      applications = applications.sort((a, b) => {
        return b.isActive - a.isActive;
      });

      dispatch(set_Applications(applications));
    } catch (error) {}
  };
};
