import http from "./httpService";
import jwtDecode from "jwt-decode";
import { memberAuthEndpoint } from "../config.json";
import { partnerAuthEndpoint } from "../config.json";

const tokenKey = "token";
export async function memberLogin(accountNum, accessCardID) {
  const { data: jwt } = await http.post(memberAuthEndpoint, {
    accountNum,
    accessCardID,
  });
  localStorage.setItem(tokenKey, jwt);
}

export async function partnerLogin(partnerID, accessCardID) {
  const { data: jwt } = await http.post(partnerAuthEndpoint, {
    partnerID,
    accessCardID,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  //get the jwt from the local storage, decode it and then update the state
  //for decoding we use the library jwt-decode
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
export default {
  memberLogin,
  partnerLogin,
  loginWithJWT,
  logout,
  getCurrentUser,
};
