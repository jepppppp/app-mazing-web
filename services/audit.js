import { getHTTPFormat } from "./tools";

export const getAudit = async () => await getHTTPFormat({ url: "/audit" });
