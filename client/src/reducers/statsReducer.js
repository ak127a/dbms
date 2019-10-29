import { UPDATE_FOOTER } from "../actions/types";

const INITIAL_STATE = {
  noOfRerenders: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FOOTER:
      return { noOfRerenders: state.noOfRerenders + 1 };
    default:
      return state;
  }
};
