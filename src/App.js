import logo from './logo.svg';
import './App.css';
import SignUp from './Pages/SignUp/SignUp';
import SignIn from './Pages/SignIn/SignIn';
import ForgetPassword  from './Pages/ForgetPassword/ForgetPassword';
import ResetPassword  from './Pages/ResetPassword/ResetPassword';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Routes>
    <Route path="/SignUp" element={ <SignUp /> } />
    <Route path="/SignIn" element={ <SignIn /> } />
    <Route path="/ForgetPassword" element={ <ForgetPassword /> } />
    <Route path="/ResetPassword" element={ <ResetPassword /> } />
    </Routes>
    </div>
  );
}

export default App;
