import React, { useEffect } from 'react'
import Header from '../Util/Header'

const Home = () => {
  let isRefreshRequested = false;
  const pageHeader = Header();
  useEffect(() => {
    pageHeader;
  }, []);
  return (
    <div>
      Home
    </div>
  )
}

export default Home