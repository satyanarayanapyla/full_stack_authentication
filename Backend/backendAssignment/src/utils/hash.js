
import bcrypt from "bcryptjs"

export const hashedPassword=async(pass)=>{
    return await bcrypt.hash(pass,10)
}