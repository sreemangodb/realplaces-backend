const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);



// Location Schema
const locationSchema = new Schema({
    state: { type: String, required: true },
    districtCity: { type: String, required: true },
    mandalLocation: { type: String, required: true },
    address: { type: String, required: true },
    pinCode: { type: String, required: true },
    displayName: { type: String, required: true },
    displayNumber: { type: String, required: true }
});

// Project Title Schema
const projectTitleSchema = new Schema({
    projectTitle: { type: String, required: true },
    projectSubtitle: { type: String, required: true }
});

// About Project Schema
const aboutProjectSchema = new Schema({
    aboutProject: { type: String, required: true },
    projectArea: { type: String, required: true },
    projectSize: { type: String, required: true },
    size: { type: String, required: true },
    avgSftPrice: { type: String, required: true },
    launchDate: { type: String, required: true },
    possessionStarts: { type: String, required: true },
    lpNumber: { type: String, required: true },
    reraNumber: { type: String, required: true }
});

// Project Highlight Schema
const projectHighlightSchema = new Schema({
    projectArea: { type: String, required: true },
    projectSize: { type: String, required: true }
});

// Floor Plan Schema
const floorPlanSchema = new Schema({
    typeOf: { type: String, required: true },
    flatSize: { type: String, required: true },
    bathRoom: { type: String, required: true },
    balcony: { type: String, required: true },
    others: { type: String, required: true },
    floorPlanImage:{ type: [String] },
});

// Main Schema
const propertySchema = new Schema({
    select: { type: String, enum: ['agent', 'owner'], required: true },
    propertyType:{ type: String, required: true },
    propertyViews:{ type: Number, default: 0 },
    location: locationSchema,
    agentEmail:{ type: String, required: true },
    projectTitleData: projectTitleSchema,
    aboutProjectData: aboutProjectSchema,
    projectHighlight: [projectHighlightSchema],
    locationHighlight: [projectHighlightSchema],
    floorPlan: [floorPlanSchema],
    googleMap: { type: String, required: true },
    videoLinks: { type: [String], required: true },
    keywords: { type: [String], required: true },
    dateUpload: {type:Date,default: Date.now },
    adminAllowed: {type:Boolean, default:false}
});






// Apply auto-increment plugin to the id field
propertySchema.plugin(AutoIncrement, { inc_field: 'propertyid' });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
