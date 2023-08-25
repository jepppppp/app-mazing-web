const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuditSchema = new Schema(
  {
    full_name: { type: String, required: true },
    id_number: { type: String, required: true },
    grade: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Audit || mongoose.model("Audit", AuditSchema);
