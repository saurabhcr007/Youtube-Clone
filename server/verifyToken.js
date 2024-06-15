import jwt from "jsonwebtoken"
import { selferror } from "./error.js"

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.access_token;
//     console.log(req.cookie)
//     console.log(token)
//     if (!token) {
//         return next(selferror(401, "You're not authenticated"))
//     }
//     // try {
//     //     const decoded = jwt.verify(token, process.env.JWT)
//     //     req.user = decoded
//     // } catch (err) {
//     //     return next(selferror(403, "Token is not valid"))
//     // }
//     jwt.verify(token, process.env.JWT, (err, user) => {
//         if (err) {
//             return next(selferror(403, "Token is not valid"))
//         } else {
//             req.user = user;
//             next()
//         }
//     })
// }
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log(req)
    if (!token) return next(selferror(401, "You are not authenticated!"));
  
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return next(selferror(403, "Token is not valid!"));
      req.user = user;
      next()
    });
  };