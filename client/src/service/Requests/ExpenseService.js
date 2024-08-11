import APIService from "../APIService"
import Urls from "../Urls"


const ExpenseService = {
  addTable: function (param, cb) {
    APIService.post(Urls.addTable, param, cb);
  },
  viewTable: function (param, cb) {
    APIService.post(Urls.Table, param, cb);
  },
  updateTable: function (param, cb) {
    APIService.post(Urls.updateTable, param, cb);
  },
  addViewer: function (param, cb) {
    APIService.post(Urls.addViewer, param, cb);
  },
  getViewer: function (param, cb) {
    APIService.post(Urls.getViewer, param, cb);
  },
  delTable: function (param, cb) {
    APIService.post(Urls.delTable, param, cb);
  },
  addExpense: function (param, cb) {
    APIService.post(Urls.addExpense, param, cb);
  },
  getExpense: function (param, cb) {
    APIService.post(Urls.getExpense, param, cb);
  },
  updateExpense: function (param, cb) {
    APIService.post(Urls.updateExpense, param, cb);
  },
  delExpense: function (param, cb) {
    APIService.post(Urls.delExpense, param, cb);
  },
  dashboard: function (param, cb) {
    APIService.post(Urls.dashboard, param, cb);
  },
};

export default ExpenseService
