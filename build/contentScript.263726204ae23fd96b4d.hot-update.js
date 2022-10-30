"use strict";
self["webpackHotUpdatereview"]("contentScript",{

/***/ "./src/pages/Content/modules/Root.jsx":
/*!********************************************!*\
  !*** ./src/pages/Content/modules/Root.jsx ***!
  \********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_modern_drawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-modern-drawer */ "./node_modules/react-modern-drawer/dist/index.modern.js");
/* harmony import */ var react_modern_drawer_dist_index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-modern-drawer/dist/index.css */ "./node_modules/react-modern-drawer/dist/index.css");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_marker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/marker */ "./src/pages/Content/modules/components/marker.jsx");
/* harmony import */ var _components_markersidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/markersidebar */ "./src/pages/Content/modules/components/markersidebar.jsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






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
const Root = ({
  urlId,
  roomId,
  url
}) => {
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [leftOpen, setLeftOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [comment, setComment] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [type, setType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('kudos');
  const [selector, setSelector] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [markers, setMarkers] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [highlighted, setHighlighted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    window.addEventListener('click', e => {
      if (e.ctrlKey) {
        e.preventDefault();
        let element = e.target;
        if (!e.target) return;
        while (!(element?.nodeName && element.nodeName !== 'path' && element.nodeName !== 'svg' && element.nodeName !== 'text' && element.nodeName !== 'IMG')) {
          element = element.parentNode;
        }
        console.log('the element', element.nodeName);
        const path = getDomPath(element);
        e.target.style.border = '2px solid yellow';
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
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetch(`https://review-backend-production.up.railway.app/markers/get?roomId=${roomId}&urlId=${urlId}`).then(res => {
      if (res.ok) {
        return res.json();
      }
      sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
    }).then(data => {
      console.log(data);
      setMarkers(data);
      setLoading(false);
    });
  }, [urlId, roomId]);
  const toggleDrawer = () => {
    setOpen(prev => !prev);
  };
  const toggleLeftDrawer = () => {
    setLeftOpen(prev => !prev);
  };
  const handleAddMarker = () => {
    if (loading) return;
    if (!window.getSelection().anchorNode?.parentElement) return;
    const selectionPath = getDomPath(window.getSelection().anchorNode.parentElement);
    setSelector(selectionPath);
    toggleDrawer();
  };
  const handleCommentChange = e => {
    setComment(e.target.value);
  };
  const handleTypeChange = e => {
    setType(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (loading) return;
    if (!selector) return;
    const data = {
      roomId,
      urlId,
      comment,
      type,
      selector
    };
    fetch('https://review-backend-production.up.railway.app/markers/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      sweetalert2__WEBPACK_IMPORTED_MODULE_3___default().fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
    }).then(data => {
      console.log('markers', data);
      setLoading(false);
    });
    setComment('');
    setSelector('');
    toggleDrawer();
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    style: {
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 10000,
      backgroundColor: 'black',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '50px'
    },
    onClick: handleAddMarker
  }, loading ? 'Loading...' : 'Add Marker'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    style: {
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      zIndex: 10000,
      backgroundColor: 'black',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '50px'
    },
    onClick: toggleLeftDrawer
  }, "View Markers"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    style: {
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      zIndex: 10000,
      backgroundColor: 'black',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '50px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
    href: `${url}?url_id=${urlId}&room_id=${roomId}`,
    target: "_blank",
    rel: "noreferrer",
    style: {
      color: 'white',
      textDecoration: 'none'
    }
  }, `${url}?url_id=${urlId}&room_id=${roomId}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_modern_drawer__WEBPACK_IMPORTED_MODULE_1__["default"], {
    open: open,
    direction: "right",
    onClose: toggleDrawer
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      marginTop: '30%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", {
    style: {
      textAlign: 'center',
      fontSize: '2rem'
    }
  }, "Add marker"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      gap: '20px'
    },
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", {
    type: "text",
    placeholder: "Add comment",
    value: comment,
    style: {
      borderRadius: '10px',
      width: '100%'
    },
    onChange: handleCommentChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("select", {
    name: "type",
    id: "type",
    style: {
      borderRadius: '10px',
      width: '100%'
    },
    value: type,
    onChange: handleTypeChange
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "kudos"
  }, "Kudos"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "bug"
  }, "Bug"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "improvement"
  }, "Improvement"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "query"
  }, "Query")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    style: {
      padding: '10px 20px',
      background: 'black',
      color: 'white',
      borderRadius: '100px'
    },
    type: "submit"
  }, "Add")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_modern_drawer__WEBPACK_IMPORTED_MODULE_1__["default"], {
    open: leftOpen,
    direction: "left",
    onClose: toggleLeftDrawer
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    }
  }, !!markers.length ? markers.map(marker => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_markersidebar__WEBPACK_IMPORTED_MODULE_5__["default"], {
    key: marker.id,
    comment: marker.comment,
    selector: marker.selector
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "No markers"))), !!markers.length && markers.map(marker => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_marker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: marker.id,
    markerData: marker
  })));
};
__signature__(Root, "useState{[loading, setLoading](true)}\nuseState{[open, setOpen](false)}\nuseState{[leftOpen, setLeftOpen](false)}\nuseState{[comment, setComment]('')}\nuseState{[type, setType]('kudos')}\nuseState{[selector, setSelector]('')}\nuseState{[markers, setMarkers]([])}\nuseState{[highlighted, setHighlighted](null)}\nuseEffect{}\nuseEffect{}");
const _default = Root;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getDomPath, "getDomPath", "C:\\Projects\\extensions\\review\\src\\pages\\Content\\modules\\Root.jsx");
  reactHotLoader.register(Root, "Root", "C:\\Projects\\extensions\\review\\src\\pages\\Content\\modules\\Root.jsx");
  reactHotLoader.register(_default, "default", "C:\\Projects\\extensions\\review\\src\\pages\\Content\\modules\\Root.jsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("251f427417197413df65")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=contentScript.263726204ae23fd96b4d.hot-update.js.map