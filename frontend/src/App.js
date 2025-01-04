// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyNavbar from "./pages/MyNavbar";
import About from "./pages/About";
import UploadPage from "./pages/UploadPage";
import PreventMeasures from "./pages/PreventMeasures"; // Preventive Measures page
import Feedback from "./pages/Feedback"; // Feedback page
// import Welcome from "./pages/Welcome";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
        <Router>
               <MyNavbar />
            <Routes>
          
         
            
        <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About/>} />
                <Route path="/upload" element={<UploadPage/>} />
                <Route path="/prevent-measures" element={<PreventMeasures />} />
                <Route path="/feedback" element={<Feedback />} />
    
        </Routes>
        </Router>
    );
};

export default App;
