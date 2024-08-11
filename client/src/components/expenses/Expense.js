import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, FormControl, InputLabel } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpenseService from "../../service/Requests/ExpenseService";
import { useParams } from 'react-router-dom';
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import values from "../../service/common/values";
import CryptoJS from "crypto-js";
import { usePDF } from 'react-to-pdf';


const Expense = () => {
  
  const { hash } = useParams();
  const [table,setTable] = useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isOwner, setIsOwner] = useState();
  const [ptype, setPtype] = useState(0);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({ mode: '', from: '', to: '', amount: '', date: '', purpose: '', category: '' });
  const [rows, setRows] = useState([]);
  const [current, setCurrent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(()=>{var t = new Date(); return t.getMonth()+1});
  const [year, setYear] = useState(() => { var t = new Date(); return t.getFullYear() });
  const [bal, setBal] = useState(0);
  const yearView = [2024,2025,2026,2027,2028];
  const { toPDF, targetRef } = usePDF({ filename: "Statement_" + currentMonth +"_"+year+".pdf" });
  var month = [
    {
      "month": 1,
      "name": "January"
    },
    {
      "month": 2,
      "name": "February"
    },
    {
      "month": 3,
      "name": "March"
    },
    {
      "month": 4,
      "name": "April"
    },
    {
      "month": 5,
      "name": "May"
    },
    {
      "month": 6,
      "name": "June"
    },
    {
      "month": 7,
      "name": "July"
    },
    {
      "month": 8,
      "name": "August"
    },
    {
      "month": 9,
      "name": "September"
    },
    {
      "month": 10,
      "name": "October"
    },
    {
      "month": 11,
      "name": "November"
    },
    {
      "month": 12,
      "name": "December"
    }
  ];
  var balance = bal;

 

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const addExpense = (e) => {
  
    e.preventDefault();
    if (ptype == 1) {
      formData.purpose = "Credited from " + formData.from;

    } else if (ptype == 3) {
      formData.purpose = "Payed to " + formData.to;
      formData.category = 1;
    }
    if(formData.amount && formData.date && formData.amount && formData.purpose && formData.mode){
    var params = {
      ptype: ptype>2?2:ptype,
      mode: formData.mode,
      amount: formData.amount,
      purpose: formData.purpose,
      date: formData.date,
      category: formData.category,
      month: formData.date.split("-")[1],
      year: formData.date.split("-")[0],
      table: table,
    };
    ExpenseService.addExpense(params, (res) => {
      //console.log(res);
      setLoad((x) => (x = !x));
    })
    setOpen(!open);
    setFormData({});
    setPtype(0);
  }
  }

  useEffect(() => {
    const url = decodeURIComponent(hash);
    const bytes = CryptoJS.AES.decrypt(url, values.secretKey);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setTable(data.id);
    setIsOwner(data.isOwner);
    getExpense(currentMonth,year,data.id);
  }, [load]);

  const getExpense = (m=currentMonth,y=year,t=table) => {
    var param = {
      table: t,
      month:m,
      year:y,
    }
    ExpenseService.getExpense(param, (res) => {
      if(res.status)
      setRows(res.data);

    })
  }

  const onMonthChange = (e) =>{
    setCurrentMonth(e.target.value);
    getExpense(e.target.value);
  }
  const onYearChange = (e) => {
    setYear(e.target.value);
    getExpense(currentMonth, e.target.value);
  } 

  const editExpense = (row) => {
    console.log(row);
    setCurrent(row.id);
    setPtype(row.type);
    setOpen(true);
    var from;
    if (row.type == 1) {
      from = row.purpose.split(" ").slice(2,).toString();
      from = from.replaceAll(",", " ").trim();
    }
    //console.log(row);
    setFormData({ mode: row.method, from: from, amount: row.amount, date: row.CreationDate.split("T")[0], purpose: row.purpose, category: row.Category })
  }

  const updateExpense = () => {
    if (ptype == 1) {
      formData.purpose = "Credited from " + formData.from;
    } else if (ptype == 3) {
      formData.purpose = "Payed to " + formData.to;
      formData.category = 1;
    }
    var params = {
      id: current,
      expense: {
        ptype: ptype >2 ? 2 : ptype,
        mode: formData.mode,
        amount: formData.amount,
        purpose: formData.purpose,
        date: formData.date,
        category: formData.category,
        month: formData.date.split("-")[1],
        year: formData.date.split("-")[0]
      }
    }
    //console.log(params);
    ExpenseService.updateExpense(params, (res) => {
      if(res.success){
        setLoad((x) => (x = !x));
      }
    })
    setOpen(false);
    setFormData({});
    setPtype(0);
    setCurrent(null);
  }

  const deleteExpense = (id) => {
    var params = {
      id: id
    }
    //console.log(params);
    ExpenseService.delExpense(params, (res) => {
      //console.log(res);
      setLoad((x) => (x = !x));
    })
  }


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setFormData({})
    setPtype(0);
    setCurrent();
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <Box sx={{ paddingY: 2}}>
        <Typography
          gutterBottom
          variant="h5"
          sx={{ marginLeft: 2, float:"left" }}
        >
          Expenses
        </Typography>
        <Box sx={{ float: "right"}}>
          <Button
            sx={{ marginRight: 2, display: (isOwner ? '' : 'none') }}
          variant="outlined"
          color="success"
          onClick={handleOpen}
        >
          + Add Expense
        </Button>
          <Button variant="outlined"
            color="primary" onClick={() => toPDF()} >Download Statement</Button>
        <FormControl variant="standard" sx={{ m: 1, minWidth:120 }}>
          <Select value={currentMonth} onChange={onMonthChange}>
              {month.map((x) => (<MenuItem key={x.month} value={x.month}>{x.name}</MenuItem>))}
          </Select>
        </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select value={year} onChange={onYearChange}>
              {yearView.map((x) => (<MenuItem key={x} value={x}>{x}</MenuItem>))}
            </Select>
          </FormControl>
        </Box>
        
      </Box>

      <TableContainer component={Paper} ref={targetRef}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Purpose</TableCell>
              <TableCell align="center">Credit</TableCell>
              <TableCell align="center">Debit</TableCell>
              <TableCell align="center">Balance</TableCell>
              {isOwner?(<TableCell align="center">Action Button</TableCell>):''}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(rowsPerPage*page,rowsPerPage*(page+1)).map((row,index) => {
              return (
                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center">{row.CreationDate.split("T")[0]}</TableCell>
                  <TableCell align="center">{row.purpose}</TableCell>
                  <TableCell align="center">{row.credit}</TableCell>
                  <TableCell align="center">{row.debit}</TableCell>
                  <TableCell align="center" sx={{ color: (row.balance < 0 ? 'red' : 'green') }}>{row.balance}</TableCell>
                  {isOwner?(<TableCell align="center">
                    <IconButton
                      sx={{display:(isOwner?'':'none')}}
                      color="success"
                      onClick={() => {
                        editExpense(row);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ display: (isOwner ? '' : 'none') }}
                      color="error"
                      onClick={() => {
                        deleteExpense(row._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>):''}
                </TableRow>
              ) 
              
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Expense</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 240 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={ptype?ptype:0}
                label="Type"
                onChange={(e) => {
                  setPtype(e.target.value);
                }}
              >
                <MenuItem value="0">
                  <em>Select Type</em>
                </MenuItem>
                <MenuItem value={1}>Credit</MenuItem>
                <MenuItem value={2}>Debit</MenuItem>
                <MenuItem value={3}>Pay to</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: 240,
                display: ptype == 2 ? "" : "none",
              }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Category"
                value={formData.category ? formData.category:0}
                name="category"
                onChange={handleFormChange}
              >
                <MenuItem value="0">
                  <em>Select Type</em>
                </MenuItem>
                {values.categories.map((x)=>(
                  <MenuItem value={x.value}>{x.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: 240,
                display: ptype != 0 ? "" : "none",
              }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Mode
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formData.mode ? formData.mode:0}
                name="mode"
                onChange={handleFormChange}
                label="Type"
              >
                <MenuItem value="0">
                  <em>Select Type</em>
                </MenuItem>
                {values.paymentMode.map((x) => (
                  <MenuItem value={x.value}>{x.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="From"
              variant="standard"
              value={formData.from}
              name="from"
              onChange={handleFormChange}
              sx={{
                m: 1,
                minWidth: 233,
                display: ptype == 1 ? "" : "none",
              }}
            />
            <TextField
              label="Purpose"
              variant="standard"
              value={formData.purpose}
              name="purpose"
              onChange={handleFormChange}
              sx={{
                m: 1,
                minWidth: 233,
                display: ptype == 2 ? "" : "none",
              }}
            />
            <TextField
              label="To"
              variant="standard"
              value={formData.to}
              name="to"
              onChange={handleFormChange}
              sx={{
                m: 1,
                minWidth: 233,
                display: ptype == 3 ? "" : "none",
              }}
            />
            <TextField
              label="Amount"
              variant="standard"
              type="number"
              value={formData.amount}
              name="amount"
              onChange={handleFormChange}
              sx={{
                m: 1,
                minWidth: 233,
                display: ptype != 0 ? "" : "none",
              }}
            />
            <TextField
              type="date"
              label="Date"
              variant="standard"
              value={formData.date}
              name="date"
              onChange={handleFormChange}
              sx={{
                m: 1,
                minWidth: 233,
                display: ptype != 0 ? "" : "none",
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button sx={{display:(!current?'':'none')}} onClick={addExpense} autoFocus>
            Submit
          </Button>
          <Button sx={{ display: (current ? '' : 'none') }} onClick={updateExpense} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Expense;
