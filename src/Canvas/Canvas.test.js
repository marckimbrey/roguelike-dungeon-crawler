import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/App';

it('renders without crashing', () => {
  const div = document.createElement('canvas');
  ReactDOM.render(<App />,div);
});
