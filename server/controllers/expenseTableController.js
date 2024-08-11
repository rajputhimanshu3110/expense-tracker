const authorization = require("../midllewares/auth");
const ExpenseTable = require("../models/ExpenseTable");
const User = require("../models/User");
const { ObjectId } = require('mongodb');

const expenseTableController = (router) => {
  router
    .route("/table/add")
    .all(async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        const isLoggedIN = await authorization.authorization(token);

        if (isLoggedIN) next();
        else {
          res.json({
            success: false,
            message: "User must be logged in",
          });
        }
      } catch (err) {
        //console.log(err);
        res.status(500).json(err);
      }
    })
    .post(async (req, res, next) => {
      try {
        const { name, approver, owner } = req.body;
        const user = await User.findOne({ email: approver });
        var category;
        if (user) {
          category = {
            name: name,
            approver: user._id,
            owner: owner,
          };
        } else {
          category = {
            name: name,
            owner: owner,
          };
        }
        await ExpenseTable.create(category);
        res.json({
          success: true,
          message: "Expense Table Created Successfully",
        });
      } catch (err) {
        res.json({
          success: false,
          message: err,
        });
      }
    });

  router
    .route("/table")
    .all(async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        const isLoggedIN = await authorization.authorization(token);

        if (isLoggedIN) next();
        else {
          res.json({
            success: false,
            message: "User must be logged in",
          });
        }
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .post(async (req, res, next) => {
      try {
        const uid = new ObjectId(req.body.userID);
        const expenseTable = await ExpenseTable.aggregate([
          {
            $match: {
              owner: uid
            }
          }, 
          {
            $lookup: {
              from: "expenses",
              localField: "_id",
              foreignField: "ExpenseTableID",
              as: "expense",
            },
            
          },
          {
            $lookup: {
              from: "users",
              localField: "approver",
              foreignField: "_id",
              as: "approverInfo",
            },
          },
          {
            $addFields: {
              credit: {
                $sum: {
                  $map: {
                    input: {
                      $filter: {
                        input: "$expense",
                        cond: { $eq: ["$$this.type", 1] }
                      }
                    },
                    as: "creditExp",
                    in: "$$creditExp.amount"
                  }
                }
              },
              debit: {
                $sum: {
                  $map: {
                    input: {
                      $filter: {
                        input: "$expense",
                        cond: { $eq: ["$$this.type", 2] }
                      }
                    },
                    as: "debitExp",
                    in: "$$debitExp.amount"
                  }
                }
              }
            }
          },
        ]);
        const data = [];
        expenseTable.forEach((cat) => {
          //console.log(cat.approverInfo[0] ? cat.approverInfo[0].email : '');
          var temp = {
            id: cat._id,
            name: cat.name,
            credit: cat.credit,
            debit: cat.debit,
            approver: cat.approverInfo[0] ? cat.approverInfo[0].email : '',
            approver_name: cat.approverInfo[0] ? cat.approverInfo[0].name : '',
          };
          data.push(temp);
        });
        res.json({
          success: true,
          data: data,
        });
      } catch (err){
        //console.log(err);
        res.json({
          success: false,
          message: "Server Error",
        });
      }

    });

  router
    .route("/table/addViewer")
    .all(async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        const isLoggedIN = await authorization.authorization(token);

        if (isLoggedIN) next();
        else {
          res.json({
            success: false,
            message: "User must be logged in",
          });
        }
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .post(async (req, res, next) => {
      var email = req.body.email.toLowerCase();
      const user = await User.findOne({ email: email });
      if (user) {
        const expenseTable = await ExpenseTable.findByIdAndUpdate(
          req.body.id,
          { $push: { access: user._id } },
          { new: true }
        );
        res.json({
          success: true,
          message: user.name + " added as viwer",
        });
      } else {
        res.json({
          success: false,
          message: "Viewer not found",
        });
      }
    });

  router
    .route("/table/getViewer")
    .all(async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        const isLoggedIN = await authorization.authorization(token);

        if (isLoggedIN) next();
        else {
          res.json({
            success: false,
            message: "User must be logged in",
          });
        }
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .post(async (req, res, next) => {
      try {
        const expenseTable = await ExpenseTable.findOne({
          _id: req.body.id,
        }).populate('access');
        var viewers = [];
        expenseTable.access.forEach((user) => {
          viewers.push({ id: user._id, name: user.name, email: user.email });
        });
        res.json({
          success: true,
          data: viewers,
        });
      } catch {
        res.json({
          success: false,
          data: "Server Error",
        });
      }

    });

  router
    .route("/table/delete")
    .all(async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        const isLoggedIN = await authorization.authorization(token);

        if (isLoggedIN) next();
        else {
          res.json({
            success: false,
            message: "User must be logged in",
          });
        }
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .post(async (req, res, next) => {
      await ExpenseTable.findOneAndDelete({ _id: req.body.id });
      res.json({
        success: true,
        message: "Successfully Deleted"
      });
    });

  router
    .route("/table/update")
    .all(async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        const isLoggedIN = await authorization.authorization(token);

        if (isLoggedIN) next();
        else {
          res.json({
            success: false,
            message: "User must be logged in",
          });
        }
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .post(async (req, res, next) => {
      try {
        const { name, email } = req.body.data;
        const user = await User.findOne({ email: email });
        var update;
        var message;
        if (user) {
          update = {
            name: name,
            approver: user._id,
          }
          message = "Successfully Updated";
        } else {
          update = {
            name: name,
          }
          message = "Successfully Updated, approver not found";
        }
        await ExpenseTable.findOneAndUpdate({ _id: req.body.id }, update).catch((err) => {
          //console.log(err);
        });
        res.json({
          success: true,
          message: message
        });
      } catch {
        res.json({
          success: false,
          message: "Server Failed"
        });
      }

    });


};

module.exports = expenseTableController;
