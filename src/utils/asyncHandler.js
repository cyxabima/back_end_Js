// using promise 

const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=> next(err))
    }
}


// remember express run the function we don't here we are creating new function and returning  with .catch() for error handling and we are passing error to next function provided by express
// however simply catch is not enough as if function is async then it is already a promise and it had catch but if it is not therefore we are creating a Promise and resolve it so that if function is not async it will became promise  
// all the arguments are automatically added by express 

// or direct 

// evaluation 
// const handler = (fx)=> { return (req,res,next)=>{ fx(req,res,next)}}
// !Use this approach if you want per-handler control over the error response.

// const handler = (func)=>async(req,res,next)=>{
//     try {
//         await func(req,res,next);
//     } catch (error) {
//         res.status(error.code|| 500).json({
//             success : false,
//             message: error.message
//         })
//     }
// }