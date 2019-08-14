import React from 'react';

import Books from './books';

export default function App() {
  return (
    <div className="container">
      <div className="header">
        <h3>
          Book Details
        </h3>
      </div>

      <Books/>
    </div>
  );
}