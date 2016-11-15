var mongoose = require('mongoose');
var url = process.env.MONGODB_URI || "mongodb://localhost:27017/main"
mongoose.connect(url);

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var historySchema = new Schema({
    id          : ObjectId,
    query         : String,
    created_at  : Date
})

var History = mongoose.model('History', historySchema, 'History');
module.exports = History
