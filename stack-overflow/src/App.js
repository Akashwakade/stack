
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { Forum } from './pages/Forum';
import { Answer } from './pages/Answer';
import { Box } from '@chakra-ui/react';
import ProtectedRoute from './component/PrivatRoute';




function App() {
  return (
    <div className="App">

    <Box style={{width:"100%",color:"white", backgroundColor:"teal",margin:"auto",border:"2px solid black",display:"flex", justifyContent:"space-around"}}>
      <Link to={"/signup"}>SignUp</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/forum"}>Forum</Link>
    </Box>

      
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forum' element={<ProtectedRoute> <Forum /></ProtectedRoute> } />
        <Route path='/answer' element={<Answer />} />
      </Routes>


    </div>
  );
}

export default App;
