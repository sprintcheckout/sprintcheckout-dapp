"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/components/Account.tsx":
/*!************************************!*\
  !*** ./src/components/Account.tsx ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Account\": function() { return /* binding */ Account; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wagmi */ \"./node_modules/wagmi/dist/index.js\");\n\nvar _s = $RefreshSig$();\n\nfunction Account() {\n    _s();\n    const { address  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_1__.useAccount)();\n    const { data: ensName  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_1__.useEnsName)({\n        address\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        children: [\n            ensName !== null && ensName !== void 0 ? ensName : address,\n            ensName ? \" (\".concat(address, \")\") : null\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/components/Account.tsx\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, this);\n}\n_s(Account, \"CO65l89PQg5MGxBzpetTsIuLseM=\", false, function() {\n    return [\n        wagmi__WEBPACK_IMPORTED_MODULE_1__.useAccount,\n        wagmi__WEBPACK_IMPORTED_MODULE_1__.useEnsName\n    ];\n});\n_c = Account;\nvar _c;\n$RefreshReg$(_c, \"Account\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9BY2NvdW50LnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBOEM7QUFFdkMsU0FBU0UsVUFBVTs7SUFDeEIsTUFBTSxFQUFFQyxRQUFPLEVBQUUsR0FBR0gsaURBQVVBO0lBQzlCLE1BQU0sRUFBRUksTUFBTUMsUUFBTyxFQUFFLEdBQUdKLGlEQUFVQSxDQUFDO1FBQUVFO0lBQVE7SUFFL0MscUJBQ0UsOERBQUNHOztZQUNFRCxvQkFBQUEscUJBQUFBLFVBQVdGLE9BQU87WUFDbEJFLFVBQVUsS0FBYSxPQUFSRixTQUFRLE9BQUssSUFBSTs7Ozs7OztBQUd2QyxDQUFDO0dBVmVEOztRQUNNRiw2Q0FBVUE7UUFDSkMsNkNBQVVBOzs7S0FGdEJDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL0FjY291bnQudHN4Pzc4YjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlQWNjb3VudCwgdXNlRW5zTmFtZSB9IGZyb20gJ3dhZ21pJ1xuXG5leHBvcnQgZnVuY3Rpb24gQWNjb3VudCgpIHtcbiAgY29uc3QgeyBhZGRyZXNzIH0gPSB1c2VBY2NvdW50KClcbiAgY29uc3QgeyBkYXRhOiBlbnNOYW1lIH0gPSB1c2VFbnNOYW1lKHsgYWRkcmVzcyB9KVxuXG4gIHJldHVybiAoXG4gICAgPHA+XG4gICAgICB7ZW5zTmFtZSA/PyBhZGRyZXNzfVxuICAgICAge2Vuc05hbWUgPyBgICgke2FkZHJlc3N9KWAgOiBudWxsfVxuICAgIDwvcD5cbiAgKVxufVxuIl0sIm5hbWVzIjpbInVzZUFjY291bnQiLCJ1c2VFbnNOYW1lIiwiQWNjb3VudCIsImFkZHJlc3MiLCJkYXRhIiwiZW5zTmFtZSIsInAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/Account.tsx\n"));

/***/ })

});