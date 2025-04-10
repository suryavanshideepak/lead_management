import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/dashboard/Dashboard';
import User from './pages/user/User';
import PrivateRoute from './routes/PrivateRoutes';
import Leads from './pages/Leads/Leads';
import EmployeeLeads from './pages/EmployeeLeads/EmployeeLeads';
import { useSelector } from 'react-redux';
import { selectAuthState } from './app/auth/authSlice';

function App() {
  const { user } = useSelector(selectAuthState)
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute Component={Dashboard}/>} />
      {user?.role === 'ADMIN' ? <Route path="/users" element={<PrivateRoute Component={User}/>} /> : null}
      <Route path="/leads" element={<PrivateRoute Component={user?.role === 'ADMIN' ? Leads : EmployeeLeads }/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
