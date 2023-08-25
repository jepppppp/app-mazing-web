import dbConnect from "../../utils/dbConnect";
import Highscore from "../../models/Highscore";
import { response } from "../../services/response";
import moment from "moment";

dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      const { from, to, lrn } = req.body;
      let newTo = moment(to).add(1, "days");
      try {
        const all_request = await Highscore.find({
          lrn,
          createdAt: { $gte: from, $lte: newTo },
        }).sort({ createdAt: -1 });
        response({
          res,
          status_code: 200,
          success: true,
          data: all_request,
        });
      } catch (error) {
        response({ res, status_code: 400, success: false, error });
      }
      break;
    default:
      response({
        res,
        status_code: 400,
        success: false,
        error: "Invalid RequestLog",
      });
      break;
  }
};
