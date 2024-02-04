const mongoose = require("mongoose");

const focusSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
    },
    
}, {
    timestamps: true,
});

const focusModel = mongoose.model("focus", focusSchema);

module.exports = focusModel;