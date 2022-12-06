
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultPage from './pages/DefaultPage';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import MyOrder from './pages/MyOrder';
import Register from './pages/Register';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

function App() {
  const [counter, setCounter] = useState(0);

  const sw = navigator.serviceWorker;

  const decrement = () => {
    stateToServiceWorker({
      state: counter - 1
    });

    setCounter(counter - 1);
  };

  const increment = () => {
    stateToServiceWorker({
      state: counter + 1
    });

    setCounter(counter + 1);
  };

  const stateToServiceWorker = data => {
    // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/controller
    // controller: read-only property of the ServiceWorkerContainer interface which returns a ServiceWorker object if its state is activated
    // The ServiceWorker interface inherits methods from its parent, Worker
    if (sw?.controller) {
      sw.controller.postMessage(data);
    }
  };

 
useEffect(() => {
serviceWorkerRegistration.register()
console.log("ok");
},[])
  return (
    <div className="App">
    {counter}
    <button onClick={decrement}>test</button>
    <button onClick={increment}>test</button>
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
