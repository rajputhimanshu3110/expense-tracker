import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography, Snackbar, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import ExpenseService from "../../service/Requests/ExpenseService";
import SessionService from "../../service/SessionService";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import SharedService from "../../service/Requests/SharedService";
import CryptoJS from "crypto-js";
import values from "../../service/common/values";
import { useNavigate } from "react-router-dom";

const SharedTable = () => {
    const [user, setUser] = useState(SessionService.get.loggedInUser);
    const [rows, setTableData] = useState([]);
    const navigate = useNavigate();
    const openExpense = (row) => {
        const url = CryptoJS.AES.encrypt(JSON.stringify({ id: row.id, isOwner: false }), values.secretKey).toString()
        navigate("/expense/" + encodeURIComponent(url));
    };
    
    const getAll = function(){
        var param = {
            id : user.id
        }
        SharedService.getAll(param,(res)=>{
            // console.log(res.data);
            setTableData(res.data);
        })
    }

    useEffect(()=>{
        getAll()
    },[])
    return (
        <>
            <Box sx={{ paddingY: 2 }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ marginLeft: 2 }}
                >
                    Shared Expenses
                </Typography>
            </Box>

            
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sno</TableCell>
                            <TableCell align="center">Expense Name</TableCell>
                            <TableCell align="center">Owner</TableCell>
                            <TableCell align="center">Total Credit</TableCell>
                            <TableCell align="center">Total Debit</TableCell>
                            <TableCell align="center">Balance</TableCell>
                            {/* <TableCell align="center">Action</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell align="center">{index+1}</TableCell>
                                <TableCell
                                    sx={{ cursor: "pointer" }}
                                    align="center"
                                    onClick={() => {
                                        openExpense(row);
                                    }}
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.owner}</TableCell>
                                <TableCell align="center">{row.credit}</TableCell>
                                <TableCell align="center">{row.debit}</TableCell>
                                <TableCell align="center" sx={{ color: ((row.credit - row.debit) >= 0 ? 'green' : 'red') }}>{row.credit - row.debit}</TableCell>
                                {/* <TableCell align="center">
                                    
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default SharedTable;
