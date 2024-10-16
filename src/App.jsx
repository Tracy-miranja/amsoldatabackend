import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Overview from './overview';
import Form from './LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} /> 
        <Route path="/Dashboard" element={<Dashboard />} /> 
        <Route path="/overview" element={<Overview />} /> 
      </Routes>
    </Router>
  );
}

export default App;
