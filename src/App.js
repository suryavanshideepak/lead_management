import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/dashboard/Dashboard';
import User from './pages/user/User';
import PrivateRoute from './routes/PrivateRoutes';
import Leads from './pages/Leads/Leads';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute Component={Dashboard}/>} />
      <Route path="/users" element={<PrivateRoute Component={User}/>} />
      <Route path="/leads" element={<PrivateRoute Component={Leads}/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
