import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import "./dashboard.css";
import Divider from "@mui/material/Divider";
import DisplayCard from "../reusables/Card";
import SessionService from "../../service/SessionService";
import ExpenseService from "../../service/Requests/ExpenseService";





const Dashboard = () => {
  const [user, setUser] = React.useState(SessionService.get.loggedInUser);
  const loadDashboard = () =>{
    var today = new Date();
    var param = {
      month:today.getMonth()+1,
      year:today.getFullYear(),
      id:user.id
    }
    ExpenseService.dashboard(param,(res)=>{
      //console.log(res);
    })
  }
  return (
    <>
      <Box sx={{ mx: 3, mt: 3 }}>
        <Typography gutterBottom variant="h5" component="div">
          Hi, {user.name}
        </Typography>
        <Divider sx={{mb:2}}/>
        <div className="dashboard-flex">
          <Box
            sx={{
              // minWidth: { xs: "100%", sm: "250px" },
              // width: "20%",
              // margin: { xs: 0, sm: 1 },
              // paddingBottom: 1,
              position:'absolute',
              top:'50%',
              left:'50%',
              transform: 'translate(-50%,-50%)'
            }}
          >
            Feature Will be out soon
            {/* <Card variant="outlined">
              <DisplayCard/>
            </Card> */}
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Dashboard;
