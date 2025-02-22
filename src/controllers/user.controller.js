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
            throw ApiError(400, "All field are required")
        }

        if (await User.findOne(email)) {
            throw ApiError(400, "Account Already Exits")
        }

        if (await User.findOne(username)) {
            throw ApiError(400, "User Name is taken")
        }

        const avatarLocalPath = res.files?.avatar[0]?.path;

        const coverImageLocalPath = res.files?.cover[0]?.path;
        if (!avatarLocalPath) {
            throw new ApiError("400", "Avatar File is required")
        }
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        const cover = await uploadOnCloudinary(coverImageLocalPath);

        if (!avatar) {
            throw new ApiError("400", "Avatar File is required")
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

        const createdUser = User.findById(user._id).select(
            "-password -refreshToken"
        )

        req.status(201).json(
            new ApiResponse(201, createdUser)
        )
    }
)

export { registerUser }