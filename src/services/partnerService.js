import http from "./httpService";
import { partnersEndoint } from "../config.json";

export function getPartners() {
  return http.get(partnersEndoint);
}

export function getPartner(partnerID) {
  return http.get(`${partnersEndoint}/${partnerID}`);
}

export function savePartner(partner) {
  // const partnerForMongo = {
  //   partnerID: partner.partnerID,
  //   name: partner.name,
  // };
  return http.post(partnersEndoint, partner);
}

export function saveItem(partnerID, item) {
  return http.put(`${partnersEndoint}/${partnerID}`, item);
}
