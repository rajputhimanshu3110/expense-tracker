const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authorization = async (token) => {
  
  try{
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const { userID, password } = decodeToken;
    const user = await User.findOne({ userID: userID });
    
    return bcrypt.compare(password, user.password);
     
}catch{
  return false;
}
};
const adminAuthorization = async (token) => {
  try {
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const { userID, password } = decodeToken;
    const user = await User.findOne({ userID: userID });

    return (bcrypt.compare(password, user.password) && user.role==1);
  } catch {
    return false;
  }
};

module.exports = { authorization, adminAuthorization };