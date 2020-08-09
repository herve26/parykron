import React from 'react';
import { ReactReader } from 'react-reader';
import logo from './logo.svg';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function App() {
  return (
    <div className="App">
      <header style={{position: 'relative', height: '100vh'}}>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <ReactReader
          url={"/life.epub"}
          location={2}
          locationChanged={epubcifi => console.log(epubcifi)}
        />
      </header>
    </div>
  );
}

export default App;
