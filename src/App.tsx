
import React from 'react';
import logo from './logo.svg';
import HairSalonCalendar from './HairSalonCalendar';
import './App.css';

function App() {
  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Welcome to Hair Salon Name. Book your slots below.
      </p>
    </header>

    <div style={{ padding: '2rem' }}>
      <HairSalonCalendar />
    </div>
  </div>
  );
}

export default App;
