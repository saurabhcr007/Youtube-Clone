export const selferror=(status,message)=>{
    // return (err,req,res,next)=>{
    //     const status=err.status || 500;
    //     const message=err.message || "Something went wrong";
    //     return res.status(status).json({
    //         success:false,
    //         status:status,
    //         error:message,
    //     })
    // }
    const err=new Error()
    err.status=status
    err.message=message
    return err
}