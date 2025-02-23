import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerUser = asyncHandler(
    async (req, res) => {
        // ! todo 
        // taking user data
        // validate user 
        // is user provided data or some field is empty
        // is user name already exit
        // is user already register 
        // is avatar provided
        // upload files on server 
        // upload files on cloudinary  from server
        // return response with out password and jwt

        const { username, email, fullname, password } = req.body;

        if ([username, email, fullname, password].some((data) => (data.trim() == ""))) {
            throw new ApiError(400, "All field are required")
        }

        if (await User.findOne({email})) {
            throw new ApiError(400, "Account Already Exits")
        }

        if (await User.findOne({username})) {
            throw new ApiError(400, "User Name is taken")
        }

        const avatarLocalPath = req.files?.avatar[0]?.path;
        // console.log(req.files)
        let coverImageLocalPath
        if(req.files.length > 1){
            coverImageLocalPath = req.files?.cover[0]?.path;
        }

        if (!avatarLocalPath) {
            throw new ApiError("400", "Avatar File is required")
        }
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        const cover = await uploadOnCloudinary(coverImageLocalPath);
        // console.log(avatar)

        if (!avatar) {
            throw new ApiError("400", "Avatar File is yes required")
        }

        const user = await User.create({
            fullname,
            username,
            email,
            password,
            avatar: avatar.url,
            cover: cover.url || ""
        })

        if (!user) {
            throw new ApiError(500, "Something went wrong while registering the User")
        }

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        console.log(createdUser)

        res.status(200).json(
            // new ApiResponse(201, createdUser)
            new ApiResponse(201, createdUser)
        )
})

export { registerUser }