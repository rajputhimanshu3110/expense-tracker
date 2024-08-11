import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ganesaImg from "../../assets/img/ganesha.png";
import UserService from "../../service/Requests/UserService";
import SessionService from "../../service/SessionService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [user,setUser] = useState(SessionService.get.loggedInUser);
  const [loginData, setLoginData] = React.useState({
    userID: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateLoginData = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const submitLogin = () => {
    if (loginData.userID && loginData.password) {
      var params = {
        userID: loginData.userID,
        password: loginData.password,
      };
      UserService.getLogin(params, (res) => {
        if (res.success) {
          SessionService.set.header(res.data.token);
          navigate("/");
        } else {
          setError("UserId/Password must be valid");
        }
      });
    }else{
      setError("UserId/Password must be filled");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  useEffect(()=>{
    if (user) {
      navigate("/");
    }
  },[])
  
  if(!user){
  return (
    <>
      <Box
        sx={{
          padding: "20px 20px 10px 20px",
          minWidth: "300px",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <img src={ganesaImg} width="100px" style={{ borderRadius: "50%" }} />
        <Typography variant="h6" mt={2}>
          Welcome Again!
        </Typography>
        <Typography sx={{ fontSize: 12, mb: 6 }}>
          Nice to see you back with us, login and manage your Expenses
        </Typography>
        <Box sx={{ my: 2, display: "block" }}>
          <TextField
            label="Username"
            name="userID"
            value={loginData.userID}
            onChange={updateLoginData}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ my: 2, display: "block" }}>
          <TextField
            label="Password"
            name="password"
            value={loginData.password}
            onChange={updateLoginData}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            color="error"
            sx={{ fontSize: 12, py: 1, opacity: 0.7, display: (error?"":"none") }}
          >
            {error}
          </Typography>
        </Box>
        <Box sx={{ my: 2, display: "block" }}>
          <Button
            sx={{ width: "80%" }}
            variant="contained"
            onClick={submitLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
}

};

export default Login;
