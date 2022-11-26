import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import DefaultPage from './pages/DefaultPage';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import MyOrder from './pages/MyOrder';
import Register from './pages/Register';
function App() {

  return (
    <div className="App">
    <p>test</p>
      <Routes>
        <Route path='/hamberger/' element={<DefaultPage />}>
          <Route path='/hamberger/login' element={<Login />}/>
          <Route path='/hamberger/' element={<HomePage />}/>
          <Route path='/hamberger/register' element={<Register />}/>
          <Route path='/hamberger/orders' element={<MyOrder />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
