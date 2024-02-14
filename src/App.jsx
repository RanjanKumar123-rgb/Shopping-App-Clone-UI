import React from 'react'
import Header from './Component/Util/Header';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default App