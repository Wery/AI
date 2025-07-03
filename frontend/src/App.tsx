import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth } from './AuthContext';

function App() {
  const { account, login, logout, getToken } = useAuth();
  const [apiResult, setApiResult] = useState('');

  const callApi = async () => {
    const token = await getToken();
    if (!token) {
      setApiResult('No token acquired');
      return;
    }
    const res = await fetch('/api/hello', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setApiResult(await res.text());
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {account ? (
          <>
            <p>Signed in as {account}</p>
            <button onClick={logout}>Logout</button>
            <button onClick={callApi}>Call API</button>
          </>
        ) : (
          <button onClick={login}>Login</button>
        )}
        <pre>{apiResult}</pre>
      </header>
    </div>
  );
}

export default App;
