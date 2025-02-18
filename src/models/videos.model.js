import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // Cloudinary
            required: true
        },
        thumbnail: {
            type: String, // Cloudinary
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,  // Cloudinary give duration after uploading
            required: true
        },
        views: {
            type: Number,  // Cloudinary give duration after uploading
            required: true,
            default: 0
        },
        isPublished: {
            type: Boolean,
            required: true
        }
    }, { timestamps: true }
)
mongoose.plugin(mongooseAggregatePaginate) // for making aggregation pipe line simple and easy 

export const Video = mongoose.model("Video", videoSchema)