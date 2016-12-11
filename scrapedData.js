// require mongoose
var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

// new Schema
var ScrapedDataSchema = Schema({
	title: {
		type: String,
		required: true,
		unique: true // make sure the article is not repeated again
	},
	
	link: {
		type: String,
		required: true
	},
	comments: [{
		text: {
			type: String 
		}
	}]
});

var ScrapedData = mongoose.model('ScrapedData', ScrapedDataSchema);

// export the model so the server can use it
module.exports = ScrapedData;