import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import MainContainer from './components/MainContainer';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <MainContainer />
    </div>
  );
};

export default App;
