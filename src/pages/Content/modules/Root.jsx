import React, { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import Swal from 'sweetalert2';
import Marker from './components/marker';
import MarkerSidebarElement from './components/markersidebar';

function getDomPath(el) {
  if (!el) {
    return;
  }
  var stack = [];
  var isShadow = false;
  while (el.parentNode != null) {
    // console.log(el.nodeName);
    var sibCount = 0;
    var sibIndex = 0;
    // get sibling indexes
    for (var i = 0; i < el.parentNode.childNodes.length; i++) {
      var sib = el.parentNode.childNodes[i];
      if (sib.nodeName == el.nodeName) {
        if (sib === el) {
          sibIndex = sibCount;
        }
        sibCount++;
      }
    }
    // if ( el.hasAttribute('id') && el.id != '' ) { no id shortcuts, ids are not unique in shadowDom
    //   stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
    // } else
    var nodeName = el.nodeName.toLowerCase();
    if (isShadow) {
      nodeName += '::shadow';
      isShadow = false;
    }
    if (sibCount > 1) {
      stack.unshift(nodeName + ':nth-of-type(' + (sibIndex + 1) + ')');
    } else {
      stack.unshift(nodeName);
    }
    el = el.parentNode;
    if (el.nodeType === 11) {
      // for shadow dom, we
      isShadow = true;
      el = el.host;
    }
  }
  stack.splice(0, 1); // removes the html element
  return stack.join(' > ');
}

const Root = ({ urlId, roomId, url }) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [type, setType] = useState('kudos');
  const [selector, setSelector] = useState('');
  const [markers, setMarkers] = useState([]);
  const [highlighted, setHighlighted] = useState(null);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        let element = e.target;
        if (!e.target) return;
        while (
          element?.nodeName &&
          element.nodeName !== 'path' &&
          element.nodeName !== 'svg' &&
          element.nodeName !== 'text'
        ) {
          element = element.parentNode;
        }
        const path = getDomPath(e.target);
        e.target.style.border = '2px solid yellow';
        console.log(e.target);
        setHighlighted(e.target);
        setSelector(path);
        setOpen(true);
        return;
      }
      if (highlighted) {
        console.log(highlighted);
        highlighted.style.border = 'none';
      }
    });
  }, [highlighted]);

  useEffect(() => {
    fetch(`http://localhost:8000/markers/get?roomId=${roomId}&urlId=${urlId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      })
      .then((data) => {
        console.log(data);
        setMarkers(data);
        setLoading(false);
      });
  }, [urlId, roomId]);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const toggleLeftDrawer = () => {
    setLeftOpen((prev) => !prev);
  };

  const handleAddMarker = () => {
    if (loading) return;
    if (!window.getSelection().anchorNode?.parentElement) return;
    const selectionPath = getDomPath(
      window.getSelection().anchorNode.parentElement
    );
    setSelector(selectionPath);
    toggleDrawer();
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    if (!selector) return;
    const data = {
      roomId,
      urlId,
      comment,
      type,
      selector,
    };
    fetch('http://localhost:8000/markers/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      })
      .then((data) => {
        console.log('markers', data);
        setLoading(false);
      });
    setComment('');
    setSelector('');
    toggleDrawer();
  };

  return (
    <>
      <button
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 10000,
          backgroundColor: 'black',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '50px',
        }}
        onClick={handleAddMarker}
      >
        {loading ? 'Loading...' : 'Add Marker'}
      </button>
      <button
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          zIndex: 10000,
          backgroundColor: 'black',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '50px',
        }}
        onClick={toggleLeftDrawer}
      >
        View Markers
      </button>
      <button
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          zIndex: 10000,
          backgroundColor: 'black',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '50px',
        }}
      >
        <a
          href={`${url}?url_id=${urlId}&room_id=${roomId}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          {`${url}?url_id=${urlId}&room_id=${roomId}`}
        </a>
      </button>
      <Drawer open={open} direction="right" onClose={toggleDrawer}>
        <div
          style={{
            marginTop: '30%',
          }}
        >
          <h1
            style={{
              textAlign: 'center',
            }}
          >
            Add marker
          </h1>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              gap: '20px',
            }}
            onSubmit={handleSubmit}
          >
            <textarea
              type="text"
              placeholder="Add comment"
              value={comment}
              style={{
                borderRadius: '10px',
              }}
              onChange={handleCommentChange}
            />
            <select
              name="type"
              id="type"
              style={{
                borderRadius: '10px',
                width: '100%',
              }}
              value={type}
              onChange={handleTypeChange}
            >
              <option value="kudos">Kudos</option>
              <option value="bug">Bug</option>
              <option value="improvement">Improvement</option>
              <option value="query">Query</option>
            </select>
            <button
              style={{
                padding: '10px 20px',
                background: 'black',
                color: 'white',
                borderRadius: '100px',
              }}
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      </Drawer>
      <Drawer open={leftOpen} direction="left" onClose={toggleLeftDrawer}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          {!!markers.length ? (
            markers.map((marker) => (
              <MarkerSidebarElement
                comment={marker.comment}
                selector={marker.selector}
              />
            ))
          ) : (
            <h1>No markers</h1>
          )}
        </div>
      </Drawer>
      {!!markers.length &&
        markers.map((marker) => <Marker markerData={marker} />)}
    </>
  );
};

export default Root;
