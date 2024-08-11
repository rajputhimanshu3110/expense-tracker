const mongoose = require("mongoose");
const { Schema } = mongoose;

const Expense = new Schema({
  purpose: {
    type: String,
  },
  ExpenseTableID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
  },
  amount: {
    type: Number,
  },
  Category: {
    type: Number,
  },
  method: {
    type: String,
  },
  type: {
    type: Number,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
  CreationDate: {
    type: Date,
  },
  ModifiedDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Expenses", Expense);
