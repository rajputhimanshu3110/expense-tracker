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
import CryptoJS from "crypto-js";
import values from "../../service/common/values";
import { useNavigate } from "react-router-dom";

const ExpenseTable = () => {
  const [open, setOpen] = useState(false);
  const [openViewer, setopenViewer] = useState(false);
  const [load, setLoad] = useState(false);
  const [current, setCurrent] = useState("");
  const [table, setTable] = useState({ name: "", email: "" });
  const [viewer, setViewer] = useState([]);
  const [inputViewer, setInputViewer] = useState("");
  const [user, setUser] = useState(SessionService.get.loggedInUser);
  const [alert, setAlert] = useState({ type: "success", msg: "b" });
  const [alertOpen, setAlertOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const openExpense = (row) => {
    const url = CryptoJS.AES.encrypt(JSON.stringify({id:row.id,isOwner:true}), values.secretKey).toString()
    navigate("/expense/" + encodeURIComponent(url));
  };


  //for Table modal
  const handleOpen = () => {
    setIsEdit(false);
    setTable({ name: '', email: '' })
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //for snackbar
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  //for viewer modal dialog
  const handleOpenViewer = (id) => {
    setCurrent(id);
    getViewer(id);
    setopenViewer(true);
  };
  const handleCloseViewer = () => {
    setopenViewer(false);
  };

  useEffect(() => {
    viewTable();
  }, [load]);

  const addViewer = () => {
    var params = {
      id: current,
      email: inputViewer,
    };
    ExpenseService.addViewer(params, (res) => {
      if (res.success) {
        setAlert({ type: "success", msg: res.message });
        handleCloseViewer();
        setInputViewer("");
      } else {
        setAlert({ type: "error", msg: res.message });
      }
      setAlertOpen(true);
    });

  };

  const getViewer = (id) => {
    var params = {
      id: id ? id : current,
    };
    ExpenseService.getViewer(params, (res) => {
      //console.log(res);
      setViewer(res.data);
    });
  };

  const viewTable = () => {
    var param = {
      userID: user.id,
    };
    ExpenseService.viewTable(param, (res) => {
      setRows(res.data);
      console.log(res.data);
    });
  };

  //handel Table form chage

  const onCatChange = (e) => {
    const { name, value } = e.target;
    setTable({ ...table, [name]: value });
  };

  const addTable = () => {
    if (table.name) {
      handleClose();
      var param = {
        name: table.name,
        approver: table.email,
        owner: user.id,
      };
      ExpenseService.addTable(param, (res) => {
        //console.log(alertOpen);
        if (res.success) {
          setAlertOpen(true);
          setAlert({ type: "success", msg: res.message });
          setLoad((x) => (x = !x));
        } else {
          setAlertOpen(true);
          setAlert({ type: "error", msg: "Table Not Added" });
        }
        // setTimeout(setAlertOpen(false),2000);
      });
      setTable("");
    }else{
      setAlertOpen(true);
      setAlert({ type: "error", msg: "Table name must be filled" });
    }
  };

  function deleteTable(row) {
    var params = {
      id: row.id,
    };
    ExpenseService.delTable(params, (res) => {
      setAlertOpen(true);
      setAlert({ type: "success", msg: res.message });
      setLoad((x) => (x = !x));
    });
  }

  const editTable = (row) => {
    setTable({ name: row.name, email: row.approver })
    setIsEdit(true);
    setCurrent(row.id);
    setOpen(true);
  }

  const updateTable = () => {
    var param = {
      id: current,
      data: table,
    }
    ExpenseService.updateTable(param, (res) => {
      setAlertOpen(true);
      setAlert({ type: "success", msg: res.message });
      setLoad(!load);
    })
    setIsEdit(false);
    handleClose();
    setTable({})
  }

  return (
    <>
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alert.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert.msg}
        </Alert>
      </Snackbar>
      <Box sx={{ paddingY: 2 }}>
        <Button
          sx={{ float: "right", marginRight: 2 }}
          variant="outlined"
          color="success"
          onClick={handleOpen}
        >
          + Add Expense Table
        </Button>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ marginLeft: 2 }}
        >
          Expense Table
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Sno</TableCell>
              <TableCell align="center">Expense Name</TableCell>
              <TableCell align="center">Approver</TableCell>
              <TableCell align="center">Total Credit</TableCell>
              <TableCell align="center">Total Debit</TableCell>
              <TableCell align="center">Balance</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
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
                <TableCell align="center">{row.approver_name}</TableCell>
                <TableCell align="center">{row.credit}</TableCell>
                <TableCell align="center">{row.debit}</TableCell>
                <TableCell align="center" sx={{ color: ((row.credit - row.debit)>=0?'green':'red')}}>{row.credit - row.debit}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleOpenViewer(row.id);
                    }}
                  >
                    <VisibilityIcon></VisibilityIcon>
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() => {
                      editTable(row);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      deleteTable(row);
                    }}
                  >
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Expense Table</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Table Name"
              variant="standard"
              name="name"
              required
              value={table.name}
              onChange={onCatChange}
              sx={{
                m: 1,
                minWidth: 233,
              }}
            />
            <TextField
              label="Approver email"
              variant="standard"
              required
              name="email"
              value={table.email}
              onChange={onCatChange}
              sx={{
                m: 1,
                minWidth: 233,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button sx={{ display: (isEdit ? "" : "none") }} onClick={updateTable} autoFocus>
            Update
          </Button>
          <Button sx={{ display: (isEdit ? "none" : "") }} onClick={addTable} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openViewer}
        onClose={handleCloseViewer}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add/Update Viewer</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              placeholder="Enter email to add viewer"
              variant="standard"
              value={inputViewer}
              onChange={(e) => {
                setInputViewer(e.target.value);
              }}
              sx={{
                my: 1,
                minWidth: 233,
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{ my: 1, display: viewer.length ? "" : "none" }}
          >
            Viewer List
          </Typography>
          <TableContainer sx={{ display: viewer.length ? "" : "none" }}>
            <Table>
              <TableHead>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>#</TableCell>
              </TableHead>
              <TableBody>
                {viewer.map((x) => (
                  <TableRow key={x.id}>
                    <TableCell>{x.name}</TableCell>
                    <TableCell>{x.email}</TableCell>
                    <TableCell>#</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewer}>Back</Button>
          <Button onClick={addViewer} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExpenseTable;
