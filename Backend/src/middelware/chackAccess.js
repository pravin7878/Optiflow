export const chackAccess =(accessUser)=>(req,res,next)=>{
const role = req.user
next()
}