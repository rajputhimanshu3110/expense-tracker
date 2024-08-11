const authorization = require("../midllewares/auth");
const Expense = require("../models/Expense");

const expenseController = (router) => {
  router
    .route("/expense/add")
    .all(async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        const isLoggedIN = await authorization.authorization(token);

        if (isLoggedIN) next();
        else {
          res.json({
            success: false,
            message: "User must be logged In",
          });
        }
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .post(async (req, res, next) => {
      const { ptype, mode, amount, purpose, date, category, month, year, table } = req.body;
      try {
        const expense = await Expense.create({
            type: ptype,
            method:mode,
            amount: amount,
            purpose: purpose,
            CreationDate: date,
            Category: category,
            month: month,
            year: year,
            ExpenseTableID: table
          
        });
        res.json({
          status:true,
          message:"Expense Added Successfully",
        })
      } catch (err) {
        res.json({
          status: false,
          message: err,
        })
       }
    });


  router
    .route("/expense/view")
    .all(async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        const isLoggedIN = await authorization.authorization(token);

        if (isLoggedIN) next();
        else {
          res.json({
            success: false,
            message: "User must be logged In",
          });
        }
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .post(async (req, res, next) => {
      try {
        const {table,year,month} = req.body;
        //console.log(req.body);
        const expense = await Expense.find({ ExpenseTableID: table, year: year, month: month }).sort({"CreationDate":1});
        
        var Expenses = [];
        var balance = 0;
        expense.forEach((ex)=>{
          balance += (ex.type == 1 ? +ex.amount : -ex.amount);
          var temp = {
            id:ex._id,
            Category:ex.Category,
            method:ex.method,
            type:ex.type,
            amount:ex.amount,
            purpose:ex.purpose,
            credit:ex.type==1?ex.amount:'',
            debit: ex.type == 2 ? ex.amount : '',
            CreationDate: ex.CreationDate,
            balance: balance,
          }
          Expenses.push(temp);
        })
        
        res.json({
          status: true,
          data: Expenses.reverse(),
        })
      } catch (err) {
        //console.log(err);
        res.json({
          status: false,
          message: err,
        })
      }
    });

  router
    .route("/expense/update")
    .all(async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        const isLoggedIN = await authorization.authorization(token);

        if (isLoggedIN) next();
        else {
          res.json({
            success: false,
            message: "User must be logged In",
          });
        }
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .post(async (req, res, next) => {
      //console.log(req.body);
      const {id, expense} =req.body;
      await Expense.updateOne(
        { _id: id },
        {
          type: expense.ptype,
          method: expense.mode,
          amount: expense.amount,
          purpose: expense.purpose,
          CreationDate: expense.date,
          Category: expense.category,
          month: expense.month,
          year: expense.year,

        }
      );
      res.json({
        success: true,
        message: "Expense Updated",
      });
    });

  router
    .route("/expense/delete")
    .all(async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        const isLoggedIN = await authorization.authorization(token);

        if (isLoggedIN) next();
        else {
          res.json({
            success: false,
            message: "User must be admin",
          });
        }
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .post(async (req, res, next) => {
      //console.log(req.body);
      const expense = await Expense.deleteOne({ _id: req.body.id });
      res.json({
        success: true,
        message: "Expense Deleted",
      });
    });

  router
    .route("/dashboard")
    .all(async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        const isLoggedIN = await authorization.authorization(token);

        if (isLoggedIN) next();
        else {
          res.json({
            success: false,
            message: "User must be admin",
          });
        }
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .post(async (req, res, next) => {
      try{
        const {month,year,id} = req.body;

      }catch{

      }
    });
};

module.exports = expenseController;
