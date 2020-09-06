const mongoose = require('mongoose');
//const { ObjecId } = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength: 50,
    },
    description: {
        type: String,
        require: true,
        maxlength: 2000,
    },
    price: {
        type: Number,
        trim: true,
        require: true,
        maxlength: 32,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true,
        maxlength: 32,
    },
    quantity: {
        type: Number,        
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    shipping: {
        required: false,
        type: Boolean,
    }


},
    { timestamps: true }
);



module.exports = mongoose.model("Product", productSchema);