import http from "./httpService";
import { earnPointsEndpoint } from "../config.json";

export function earnPoints(
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

  return http.post(earnPointsEndpoint, data);
}
