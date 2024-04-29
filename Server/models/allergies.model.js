const mongoose = require('mongoose');

const AllergySchema = mongoose.Schema(
    {
    Allergy: {
        type: String,
        required: true
    },
    Foods: {
        type: [String],
        required: true
    }
}

);

const Allergy = mongoose.model('Allergy', AllergySchema);
module.exports = Allergy;

