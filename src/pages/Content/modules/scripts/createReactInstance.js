import React from 'react';
import { render } from 'react-dom';
import Root from '../Root';
import { ID } from '../constants';

const createTheReactInstance = (urlId, roomId, url) => {
  const root = document.createElement('div');
  root.id = ID;
  document.body.appendChild(root);
  render(<Root urlId={urlId} roomId={roomId} url={url} />, root);
};

export default createTheReactInstance;
