import http from "./httpService";
import { transactionsEndpoint } from "../config.json";

export function getMemberTransactions(memberID) {
  return http.get(`${transactionsEndpoint}/member/${memberID}`);
}

export function getPartnerTransactions(partnerID) {
  return http.get(`${transactionsEndpoint}/partner/${partnerID}`);
}

// export function getPartnerTransactionsBlock(accessCardID, partnerID) {
//   let partner = {
//     accessCardID: accessCardID,
//     partnerID: partnerID,
//   };
//   return http.post(`${blockchainEndpoint}/partnerdata`, partner);
// }
