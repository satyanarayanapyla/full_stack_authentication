import jwt from "jsonwebtoken";


export const vereifyToken=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message:"Token Missing",status:false});
        }
        const token=authHeader.split(" ")[1]
        const decode=jwt.verify(token,process.env.JWT_SECRET_TOKEN)
        res.user=decode;
        next();
    }catch(err){
         return res.status(401).json({ message: "Invalid token", status: false });
    }
}