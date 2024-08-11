import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Expense from './components/expenses/Expense';
import ExpenseCategory from './components/expenses/ExpenseCategory';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import SharedTable from './components/shared-expenses/SharedTable';
import ChangePassword from './components/ChangePassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/category" element={<ExpenseCategory />} />
          <Route path="/expense/:hash" element={<Expense />} />
          <Route path="/shared-expenses" element={<SharedTable/>} />
          <Route path='/change-password' element={<ChangePassword/>}/>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
