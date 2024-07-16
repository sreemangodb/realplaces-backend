const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const enquirySchema = new Schema({
    propertyId: {
        type: Number,
    }, 
    agentEmail: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    required: {
        type: String
    },
    note: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Add the auto-incrementing plugin to the schema
enquirySchema.plugin(AutoIncrement, { inc_field: 'enquiryId' });

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
