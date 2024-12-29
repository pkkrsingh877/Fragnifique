import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        validate: {
            validator: function (v) {
                return v >= 0 && v <= 5;
            },
            message: function (props) {
                return `${props.value} is not a valid rating!`;
            }
        }
    },
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
