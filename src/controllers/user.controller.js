import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {
            accessToken, refreshToken
        }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating Access and Refresh Token ")
    }
}
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

        if (await User.findOne({ email })) {
            throw new ApiError(400, "Account Already Exits")
        }

        if (await User.findOne({ username })) {
            throw new ApiError(400, "User Name is taken")
        }

        const avatarLocalPath = req.files?.avatar[0]?.path;
        // console.log(req.files)
        let coverImageLocalPath
        if (req.files.length > 1) {
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

const loginUser = asyncHandler(
    async (req, res) => {
        // todo 
        // take email or username and password 
        // verify from database
        // if verified generate access token and save in secure cookie tray 
        // generate refresh token and store them in cookie tray 
        // after expiry of access token regenerate the access token if refresh token is present 

        const { username, email, password } = req.body;

        if (!username && !email) {
            throw new ApiError(400, "username or email required")
        }

        const user = User.findOne({
            $or: [{ username }, { email }]
        });

        if (!user) {
            throw new ApiError(404, "User name or Email doesn't exits")
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid User Credentials")
        }

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

        // as the refresh token is added in user which is in function therefore we can update this user or we 

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
        const options = {
            httpOnly: true,
            secure: true
        }
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                },
                "User Logged In SuccessFully "
            ))



    })

const logoutUser = asyncHandler(
    async (req, res) => {

        await User.findByIdAndUpdate(req.user._id, {
            $set: {
                refreshToken: undefined
            }
        }, { new: true })

        const options = {
            httpOnly: true,
            secure: true
        }

        res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User Log Out Successfully"))
    }
)


export { registerUser, loginUser, logoutUser }