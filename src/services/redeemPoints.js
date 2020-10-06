import http from "./httpService";
import { redeemPointsEndpoint } from "../config.json";

export function redeemPoints(
  memberID,
  partnerID,
  pid,
  itemID,
  sumOfPoints,
  points
) {
  console.log(
    memberID,
    partnerID,
    pid,
    itemID,
    sumOfPoints,
    points,
    "PARAMETRE"
  );

  const data = { memberID, partnerID, pid, itemID, sumOfPoints, points };

  return http.post(redeemPointsEndpoint, data);
}
