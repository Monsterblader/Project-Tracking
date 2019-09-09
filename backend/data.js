// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This will be our database's data structure.
const DataSchema = new Schema(
  {
    id: Number,
    item: String
  },
  { timestamps: true }
);

// Export the new Schema so we can modify it using Node.js.
module.exports = mongoose.model("Data", DataSchema);
