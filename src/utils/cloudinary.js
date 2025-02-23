import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

// Configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY__API_SECRET
// });

// 

const uploadOnCloudinary = async (localFilePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        if (!localFilePath) return "";
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        // file has been uploaded successfully 
        console.log("File has been uploaded to server", response.url);

        return response

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the temporary uploaded file corrupted file
    }
}

export {uploadOnCloudinary}