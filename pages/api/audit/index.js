import dbConnect from "../../../utils/dbConnect";
import Audit from "../../../models/Audit";
import { response } from "../../../services/response";

dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const all_audit = await Audit.find().sort({ createdAt: -1 });
        response({ res, status_code: 200, success: true, data: all_audit });
      } catch (error) {
        response({ res, status_code: 400, success: false, error });
      }
      break;

    default:
      response({ res, status_code: 400, success: false });
      break;
  }
};
