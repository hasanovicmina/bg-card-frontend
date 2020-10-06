import http from "./httpService";
import { membersEndpoint } from "../config.json";

export function saveMember(member) {
  return http.post(membersEndpoint, member);
}

export function addPoints(member) {
  return http.put(`${membersEndpoint}/${member._id}`, member);
}

export function getMember(memberID) {
  return http.get(`${membersEndpoint}/${memberID}`);
}
