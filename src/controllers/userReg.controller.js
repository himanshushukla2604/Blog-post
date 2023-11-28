// Import the asyncHandler utility function
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/apiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
   

   console.log(req.body);
   const {username, email, fullName, password} = req.body
    // if(fullName === ""){
    //     throw new ApiError(400, "full name is required");
    // }

    // validation
    if([fullName, email, username, password].some((field) =>{field?.trim() === ""})){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "email id or username alrady existed");
    }

   

    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password"// this is syntex to ignore the given field and not return 
    );
    
    if(!createdUser){
        return new ApiError(500, "User not created!, Something went wrong")
    }
    console.log(createdUser)

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registerd succesfully")
    )

});

// Export the registerUser function for use in other modules
export { registerUser, };
