import { SIGN_IN, SIGN_OUT, UPDATE_FOOTER } from "./types";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const updateFooter = () => {
  return {
    type: UPDATE_FOOTER
  };
};
