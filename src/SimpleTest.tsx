import React from 'react';

function SimpleTest() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1 style={{ color: 'red' }}>Hello World - React is Working!</h1>
      <p>This is a simple test to verify React is rendering properly.</p>
      <button onClick={() => alert('Button clicked!')}>Test Button</button>
    </div>
  );
}

export default SimpleTest;