/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["pages/index"],{

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?absolutePagePath=%2FUsers%2Fdavid.calap%2Fdev%2Fworkspace%2Fjsenent%2Fwagmi-tests%2Fcreate-wagmi%2Ftemplates%2Fnext%2Frainbowkit%2Fsrc%2Fpages%2Findex.tsx&page=%2F!":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?absolutePagePath=%2FUsers%2Fdavid.calap%2Fdev%2Fworkspace%2Fjsenent%2Fwagmi-tests%2Fcreate-wagmi%2Ftemplates%2Fnext%2Frainbowkit%2Fsrc%2Fpages%2Findex.tsx&page=%2F! ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n    (window.__NEXT_P = window.__NEXT_P || []).push([\n      \"/\",\n      function () {\n        return __webpack_require__(/*! ./src/pages/index.tsx */ \"./src/pages/index.tsx\");\n      }\n    ]);\n    if(true) {\n      module.hot.dispose(function () {\n        window.__NEXT_P.push([\"/\"])\n      });\n    }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWNsaWVudC1wYWdlcy1sb2FkZXIuanM/YWJzb2x1dGVQYWdlUGF0aD0lMkZVc2VycyUyRmRhdmlkLmNhbGFwJTJGZGV2JTJGd29ya3NwYWNlJTJGanNlbmVudCUyRndhZ21pLXRlc3RzJTJGY3JlYXRlLXdhZ21pJTJGdGVtcGxhdGVzJTJGbmV4dCUyRnJhaW5ib3draXQlMkZzcmMlMkZwYWdlcyUyRmluZGV4LnRzeCZwYWdlPSUyRiEuanMiLCJtYXBwaW5ncyI6IjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxvREFBdUI7QUFDOUM7QUFDQTtBQUNBLE9BQU8sSUFBVTtBQUNqQixNQUFNLFVBQVU7QUFDaEI7QUFDQSxPQUFPO0FBQ1A7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvPzIyNTkiXSwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgKHdpbmRvdy5fX05FWFRfUCA9IHdpbmRvdy5fX05FWFRfUCB8fCBbXSkucHVzaChbXG4gICAgICBcIi9cIixcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoXCIuL3NyYy9wYWdlcy9pbmRleC50c3hcIik7XG4gICAgICB9XG4gICAgXSk7XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93Ll9fTkVYVF9QLnB1c2goW1wiL1wiXSlcbiAgICAgIH0pO1xuICAgIH1cbiAgIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?absolutePagePath=%2FUsers%2Fdavid.calap%2Fdev%2Fworkspace%2Fjsenent%2Fwagmi-tests%2Fcreate-wagmi%2Ftemplates%2Fnext%2Frainbowkit%2Fsrc%2Fpages%2Findex.tsx&page=%2F!\n"));

/***/ }),

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wagmi */ \"./node_modules/wagmi/dist/index.js\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/index.mjs\");\n\nvar _s = $RefreshSig$();\n\n\nfunction Page() {\n    _s();\n    const { isConnected  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_1__.useAccount)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Center, {\n            marginTop: \"20px\",\n            marginBottom: \"20px\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Sprintcheckout\"\n            }, void 0, false, {\n                fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/index.tsx\",\n                lineNumber: 12,\n                columnNumber: 13\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/index.tsx\",\n            lineNumber: 11,\n            columnNumber: 9\n        }, this)\n    }, void 0, false);\n}\n_s(Page, \"zfhL8yMEhsc9LbuqnTKJ2EdeNdk=\", false, function() {\n    return [\n        wagmi__WEBPACK_IMPORTED_MODULE_1__.useAccount\n    ];\n});\n_c = Page;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page);\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXgudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDa0M7QUFHTTtBQUV4QyxTQUFTRSxPQUFPOztJQUNkLE1BQU0sRUFBRUMsWUFBVyxFQUFFLEdBQUdILGlEQUFVQTtJQUNsQyxxQkFDRTtrQkFDSSw0RUFBQ0Msb0RBQU1BO1lBQUNHLFdBQVU7WUFBT0MsY0FBYTtzQkFDbEMsNEVBQUNDOzBCQUFHOzs7Ozs7Ozs7Ozs7QUFPaEI7R0FaU0o7O1FBQ2lCRiw2Q0FBVUE7OztLQUQzQkU7QUFjVCwrREFBZUEsSUFBSUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvaW5kZXgudHN4PzE5YTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29ubmVjdEJ1dHRvbiB9IGZyb20gJ0ByYWluYm93LW1lL3JhaW5ib3draXQnXG5pbXBvcnQgeyB1c2VBY2NvdW50IH0gZnJvbSAnd2FnbWknXG5cbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICcuLi9jb21wb25lbnRzJ1xuaW1wb3J0IHtDZW50ZXJ9IGZyb20gXCJAY2hha3JhLXVpL3JlYWN0XCI7XG5cbmZ1bmN0aW9uIFBhZ2UoKSB7XG4gIGNvbnN0IHsgaXNDb25uZWN0ZWQgfSA9IHVzZUFjY291bnQoKVxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICAgIDxDZW50ZXIgbWFyZ2luVG9wPVwiMjBweFwiIG1hcmdpbkJvdHRvbT1cIjIwcHhcIj5cbiAgICAgICAgICAgIDxoMT5TcHJpbnRjaGVja291dDwvaDE+XG4gICAgICAgIDwvQ2VudGVyPlxuXG4gICAgICB7Lyo8Q29ubmVjdEJ1dHRvbiAvPiovfVxuICAgICAgey8qe2lzQ29ubmVjdGVkICYmIDxBY2NvdW50IC8+fSovfVxuICAgIDwvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VcbiJdLCJuYW1lcyI6WyJ1c2VBY2NvdW50IiwiQ2VudGVyIiwiUGFnZSIsImlzQ29ubmVjdGVkIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwiaDEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n"));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["pages/_app","main"], function() { return __webpack_exec__("./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?absolutePagePath=%2FUsers%2Fdavid.calap%2Fdev%2Fworkspace%2Fjsenent%2Fwagmi-tests%2Fcreate-wagmi%2Ftemplates%2Fnext%2Frainbowkit%2Fsrc%2Fpages%2Findex.tsx&page=%2F!"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);