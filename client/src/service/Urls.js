
// const base_url = "http://localhost:3100";
const base_url = "https://account-api-yelm.onrender.com";


const Urls = {    
  login: base_url + "/login",
  addTable: base_url + "/table/add",
  updateTable: base_url + "/table/update",
  Table: base_url + "/table",
  addViewer: base_url + "/table/addViewer",
  getViewer: base_url + "/table/getViewer",
  delTable: base_url + "/table/delete",
  addExpense :base_url+"/expense/add",
  getExpense: base_url+"/expense/view",
  updateExpense:base_url+"/expense/update",
  delExpense:base_url+"/expense/delete",
  getShared:base_url+"/shared/all",
  dashboard: base_url +"/dashboard",
  changePassword: base_url+"/change-password",
};

export default Urls