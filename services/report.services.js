import { postHTTPFormat } from "./tools";

export const getReports = async (newData) =>
  postHTTPFormat({ url: "/report", newData });
