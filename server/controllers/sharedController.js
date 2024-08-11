const { authorization } = require("../midllewares/auth");
const ExpenseTable = require("../models/ExpenseTable");
const User = require("../models/User");
const { ObjectId } = require('mongodb');

const sharedController = (router) => {

    router.route("/shared/all").all(async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const isLoggedIN = await authorization(token);

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
    }).post(async (req, res, next) => {
        try {
            //console.log(req.body.id);
            const uid = new ObjectId(req.body.id);
            const expenseTable = await ExpenseTable.aggregate([
                {
                    $match: {
                        $or: [
                            { access: uid },
                            { approver: uid }
                        ]
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
                        localField: "owner",
                        foreignField: "_id",
                        as: "ownerinfo",
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
            const shared = expenseTable.map((expense)=>{
                return {
                    id:expense._id,
                    owner:expense.ownerinfo[0].name,
                    name:expense.name,
                    credit:expense.credit,
                    debit:expense.debit,
                }
            })
            //console.log(shared);
            
            res.json({
                success:true,
                data:shared
            });
            
            
            
        } catch (e) {
            res.json(e)
        }
    })

}

module.exports = sharedController;