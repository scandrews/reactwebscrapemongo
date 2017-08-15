var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HistorySchema = new Schema({
  title: {
    type: String
  },
  link: {
    type: String
  }
});

var History = mongoose.model("History", HistorySchema);
module.exports = History;
