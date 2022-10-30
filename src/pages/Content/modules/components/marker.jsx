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
        border: '2px solid yellow',
        backgroundColor: 'black',
        color: 'white',
        fontSize: '16px !important',
        borderRadius: open ? 0 : '500px',
      }}
      onClick={toggle}
    >
      {open ? (
        <div>
          <p>{comment}</p>
          <TypeElement type={type} />
        </div>
      ) : (
        <>
          <IoLocationSharp
            color="white"
            style={{
              color: 'white',
            }}
            size={20}
          />
        </>
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
