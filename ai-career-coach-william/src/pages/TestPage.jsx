import React from 'react';

const TestPage = () => {
  console.log('TestPage rendering...');
  
  return (
    <div style={{ padding: '20px', backgroundColor: 'lightblue' }}>
      <h1>TEST PAGE - If you see this, React is working!</h1>
      <p>This is a simple test to verify React is rendering.</p>
    </div>
  );
};

export default TestPage;
