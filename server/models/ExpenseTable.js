const mongoose = require("mongoose");
const { Schema } = mongoose;

const Table = new Schema({
  name: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  approver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  access: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  CreationDate: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model("Table", Table);
