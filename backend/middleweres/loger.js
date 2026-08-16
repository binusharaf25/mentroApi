export const loger= (req,res,next)=>{
    const timeStamp=new Date().toISOString()
    console.log(`❌ [ ${timeStamp} ] - ${req.method} - ${req.url}` )
    next();
}