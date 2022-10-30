import React from 'react';
import { useEffect } from 'react';
import './Popup.css';

const Popup = () => {
  const [activeTab, setActiveTab] = React.useState('view');

  return (
    <div>
      <div
        style={{
          width: '100%',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: '50%',
            fontSize: '18px',
            padding: '5px 0',
            cursor: 'pointer',
            textAlign: 'center',
            color: activeTab === 'view' ? '#00bcd4' : '#000',
            borderBottom: '1px solid black',
          }}
          onClick={() => setActiveTab('view')}
        >
          view
        </div>
        <div
          style={{
            width: '50%',
            textAlign: 'center',
            padding: '5px 0',
            cursor: 'pointer',
            fontSize: '18px',
            color: activeTab === 'create' ? '#00bcd4' : '#000',
            borderBottom: '1px solid black',
          }}
          onClick={() => setActiveTab('create')}
        >
          create
        </div>
      </div>
      {activeTab === 'view' ? (
        <div>view</div>
      ) : (
        <div>create</div>
      )}
    </div>
  );
};

export default Popup;
