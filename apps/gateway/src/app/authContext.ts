import  jwt  from 'jsonwebtoken';
export const authContext=({req})=>{
  const token=req.headers.authorization;
  return {user:jwt.verify(token.replace("Bearer ",""),process.env.JWT_SECRET)}
}
