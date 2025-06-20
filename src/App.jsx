import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';

function App() {
  return (
     <>

    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />} />
     
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    
    </>
  );
}

export default App;

