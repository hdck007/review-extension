import React from 'react';
import { createPortal } from 'react-dom';
import { IoLocationSharp } from 'react-icons/io5';

const TypeElement = ({ type }) => {
  switch (type) {
    case 'kudos': {
      return (
        <span
          style={{
            color: 'orange',
            fontSize: '12px !important',
          }}
        >
          {type}
        </span>
      );
    }
    case 'bug': {
      return (
        <span
          style={{
            fontSize: '12px !important',
            color: 'red',
          }}
        >
          {type}
        </span>
      );
    }
    case 'improvement': {
      return (
        <span
          style={{
            fontSize: '12px !important',
            color: 'green',
          }}
        >
          {type}
        </span>
      );
    }
    case 'query': {
      return (
        <span
          style={{
            fontSize: '12px !important',
            color: 'blue',
          }}
        >
          {type}
        </span>
      );
    }
    default: {
      return <span>{type}</span>;
    }
  }
};

const MarkerContainer = ({ comment, type }) => {
  const [open, setOpen] = React.useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      style={{
        display: 'flex',
        margin: '0 auto',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1000000,
        padding: '10px',
        backgroundColor: open ? 'black' : 'transparent',
        color: 'white',
        fontSize: '16px',
        width: '300px',
      }}
      onClick={toggle}
    >
      {open ? (
        <div>
          <p
            style={{
              fontSize: '16px',
            }}
          >
            {comment}
          </p>
          <TypeElement type={type} />
        </div>
      ) : (
        <span
          style={{
            background: 'black',
            borderRadius: '500px',
            padding: '10px',
            border: '2px solid yellow',
            justifySelf: 'flex-start',
            alignSelf: 'flex-start',
          }}
        >
          <IoLocationSharp
            color="white"
            style={{
              color: 'white',
            }}
            size={20}
          />
        </span>
      )}
    </div>
  );
};

export default function Marker({ markerData }) {
  const node = document.querySelector(markerData.selector);
  if (!node) return null;
  return createPortal(
    <MarkerContainer comment={markerData.comment} type={markerData.type} />,
    node
  );
}
