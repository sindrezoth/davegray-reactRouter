import {useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({width: null, height: null});

  useEffect(() => {
    function resizeHandle() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    window.addEventListener('resize', resizeHandle);
    
    resizeHandle();
    return ()=>window.removeEventListener('resize', resizeHandle);
  },[]);
  
  return windowSize;
}

export default useWindowSize;