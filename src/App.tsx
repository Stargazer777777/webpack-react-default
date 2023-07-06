import React from 'react';

function Profile() {
  return (
    <>
      <div
        style={{ backgroundColor: 'skyblue', width: '200px', height: '200px' }}
      ></div>
    </>
  );
}

function App() {
  return (
    <div>
      <Profile />
      <Profile />
      <Profile />
    </div>
  );
}

export default App;
