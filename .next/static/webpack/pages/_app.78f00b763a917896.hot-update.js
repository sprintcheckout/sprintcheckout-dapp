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

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rainbow-me/rainbowkit/styles.css */ \"./node_modules/@rainbow-me/rainbowkit/dist/index.css\");\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @rainbow-me/rainbowkit */ \"./node_modules/@rainbow-me/rainbowkit/dist/index.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! wagmi */ \"./node_modules/wagmi/dist/index.js\");\n/* harmony import */ var _wagmi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../wagmi */ \"./src/wagmi.ts\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/index.mjs\");\n/* harmony import */ var _components_Pruebas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Pruebas */ \"./src/components/Pruebas.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\nfunction App(param) {\n    let { Component , pageProps  } = param;\n    _s();\n    const [mounted, setMounted] = react__WEBPACK_IMPORTED_MODULE_3__.useState(false);\n    react__WEBPACK_IMPORTED_MODULE_3__.useEffect(()=>setMounted(true), []);\n    let amount;\n    let selectedToken;\n    let selectedCurrency;\n    const { isConnected  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_6__.useAccount)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.ChakraProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_6__.WagmiConfig, {\n            client: _wagmi__WEBPACK_IMPORTED_MODULE_4__.client,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_8__.RainbowKitProvider, {\n                chains: _wagmi__WEBPACK_IMPORTED_MODULE_4__.chains,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                            children: \"My wagmi + RainbowKit App\"\n                        }, void 0, false, {\n                            fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                            lineNumber: 46,\n                            columnNumber: 25\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                        lineNumber: 45,\n                        columnNumber: 21\n                    }, this),\n                    mounted && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                        lineNumber: 49,\n                        columnNumber: 33\n                    }, this),\n                    'const search = window.location.search; const params = new URLSearchParams(search); console.log(\"params\"); console.log(params);',\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Center, {\n                        border: \"1px\",\n                        borderColor: \"gray.200\",\n                        borderRadius: \"12px\",\n                        alignSelf: \"center\",\n                        maxWidth: \"70ch\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.TableContainer, {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Table, {\n                                variant: \"simple\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Thead, {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Tr, {\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Th, {\n                                                    isNumeric: true,\n                                                    children: \"AMOUNT\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                                    lineNumber: 62,\n                                                    columnNumber: 41\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Th, {\n                                                    children: \"CURRENCY\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                                    lineNumber: 63,\n                                                    columnNumber: 41\n                                                }, this)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                            lineNumber: 61,\n                                            columnNumber: 37\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                        lineNumber: 60,\n                                        columnNumber: 33\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Tbody, {\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Tr, {\n                                                children: [\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Td, {\n                                                        isNumeric: true,\n                                                        children: \"25.4\"\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                                        lineNumber: 68,\n                                                        columnNumber: 41\n                                                    }, this),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Td, {\n                                                        children: \"USD\"\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                                        lineNumber: 69,\n                                                        columnNumber: 41\n                                                    }, this)\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                                lineNumber: 67,\n                                                columnNumber: 37\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Tr, {\n                                                children: [\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Td, {\n                                                        isNumeric: true,\n                                                        children: \"30.48\"\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                                        lineNumber: 72,\n                                                        columnNumber: 41\n                                                    }, this),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Td, {\n                                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Select, {\n                                                            placeholder: \"Select token\",\n                                                            borderRadius: \"20px\",\n                                                            children: [\n                                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                                    value: \"option1\",\n                                                                    children: \"USDC\"\n                                                                }, void 0, false, {\n                                                                    fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                                                    lineNumber: 75,\n                                                                    columnNumber: 49\n                                                                }, this),\n                                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                                    value: \"option2\",\n                                                                    children: \"DAI\"\n                                                                }, void 0, false, {\n                                                                    fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                                                    lineNumber: 76,\n                                                                    columnNumber: 49\n                                                                }, this),\n                                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                                    value: \"option3\",\n                                                                    children: \"USDT\"\n                                                                }, void 0, false, {\n                                                                    fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                                                    lineNumber: 77,\n                                                                    columnNumber: 49\n                                                                }, this)\n                                                            ]\n                                                        }, void 0, true, {\n                                                            fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                                            lineNumber: 74,\n                                                            columnNumber: 45\n                                                        }, this)\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                                        lineNumber: 73,\n                                                        columnNumber: 41\n                                                    }, this)\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                                lineNumber: 71,\n                                                columnNumber: 37\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                        lineNumber: 66,\n                                        columnNumber: 33\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                lineNumber: 59,\n                                columnNumber: 29\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                            lineNumber: 58,\n                            columnNumber: 25\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                        lineNumber: 56,\n                        columnNumber: 21\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Center, {\n                        children: [\n                            amount,\n                            selectedToken,\n                            \" per \",\n                            selectedCurrency,\n                            \" (No hidden fees \",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Link, {\n                                href: \"https://www.coingecko.com/\",\n                                children: \"Coingecko)\"\n                            }, void 0, false, {\n                                fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                                lineNumber: 86,\n                                columnNumber: 92\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                        lineNumber: 86,\n                        columnNumber: 21\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Center, {\n                        alignContent: \"center\",\n                        width: \"50%\",\n                        marginTop: \"15px\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Button, {\n                            backgroundColor: \"#0E76FD\",\n                            children: \" Paga\"\n                        }, void 0, false, {\n                            fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                            lineNumber: 90,\n                            columnNumber: 25\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                        lineNumber: 89,\n                        columnNumber: 21\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Center, {\n                        alignContent: \"center\",\n                        width: \"50%\",\n                        marginTop: \"15px\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_8__.ConnectButton, {}, void 0, false, {\n                            fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                            lineNumber: 96,\n                            columnNumber: 25\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                        lineNumber: 95,\n                        columnNumber: 21\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Container, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Pruebas__WEBPACK_IMPORTED_MODULE_5__.Pruebas, {}, void 0, false, {\n                            fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                            lineNumber: 102,\n                            columnNumber: 25\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                        lineNumber: 101,\n                        columnNumber: 21\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n                lineNumber: 44,\n                columnNumber: 17\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n            lineNumber: 43,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/pages/_app.tsx\",\n        lineNumber: 42,\n        columnNumber: 9\n    }, this);\n}\n_s(App, \"puJSPIqvLfJJDBtg0bawskbfYbA=\", false, function() {\n    return [\n        wagmi__WEBPACK_IMPORTED_MODULE_6__.useAccount\n    ];\n});\n_c = App;\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\nvar _c;\n$RefreshReg$(_c, \"App\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQztBQUM4QjtBQUV4QztBQUNGO0FBQ2U7QUFFTjtBQWlCZDtBQUVxQjtBQUk5QyxTQUFTc0IsSUFBSSxLQUFnQyxFQUFFO1FBQWxDLEVBQUNDLFVBQVMsRUFBRUMsVUFBUyxFQUFXLEdBQWhDOztJQUNULE1BQU0sQ0FBQ0MsU0FBU0MsV0FBVyxHQUFHdkIsMkNBQWMsQ0FBQyxLQUFLO0lBRWxEQSw0Q0FBZSxDQUFDLElBQU11QixXQUFXLElBQUksR0FBRyxFQUFFO0lBQzFDLElBQUlHO0lBQ0osSUFBSUM7SUFDSixJQUFJQztJQUNKLE1BQU0sRUFBQ0MsWUFBVyxFQUFDLEdBQUc1QixpREFBVUE7SUFFaEMscUJBRUksOERBQUNNLDREQUFjQTtrQkFDWCw0RUFBQ0wsOENBQVdBO1lBQUNFLFFBQVFBLDBDQUFNQTtzQkFDdkIsNEVBQUNOLHNFQUFrQkE7Z0JBQUNLLFFBQVFBLDBDQUFNQTs7a0NBQzlCLDhEQUFDSixrREFBUUE7a0NBQ0wsNEVBQUMrQjtzQ0FBTTs7Ozs7Ozs7Ozs7b0JBR1ZSLHlCQUFXLDhEQUFDRjt3QkFBVyxHQUFHQyxTQUFTOzs7Ozs7b0JBQUs7a0NBT3pDLDhEQUFDZixvREFBTUE7d0JBQUN5QixRQUFPO3dCQUFNQyxhQUFZO3dCQUFXQyxjQUFhO3dCQUFPQyxXQUFVO3dCQUFTQyxVQUFTO2tDQUV4Riw0RUFBQ3ZCLDREQUFjQTtzQ0FDWCw0RUFBQ0QsbURBQUtBO2dDQUFDeUIsU0FBUTs7a0RBQ1gsOERBQUNwQixtREFBS0E7a0RBQ0YsNEVBQUNDLGdEQUFFQTs7OERBQ0MsOERBQUNGLGdEQUFFQTtvREFBQ3NCLFNBQVM7OERBQUM7Ozs7Ozs4REFDZCw4REFBQ3RCLGdEQUFFQTs4REFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0RBR1osOERBQUNGLG1EQUFLQTs7MERBQ0YsOERBQUNJLGdEQUFFQTs7a0VBQ0MsOERBQUNILGdEQUFFQTt3REFBQ3VCLFNBQVM7a0VBQUM7Ozs7OztrRUFDZCw4REFBQ3ZCLGdEQUFFQTtrRUFBQzs7Ozs7Ozs7Ozs7OzBEQUVSLDhEQUFDRyxnREFBRUE7O2tFQUNDLDhEQUFDSCxnREFBRUE7d0RBQUN1QixTQUFTO2tFQUFDOzs7Ozs7a0VBQ2QsOERBQUN2QixnREFBRUE7a0VBQ0MsNEVBQUNKLG9EQUFNQTs0REFBQzRCLGFBQVk7NERBQWVMLGNBQWE7OzhFQUM1Qyw4REFBQ007b0VBQU9DLE9BQU07OEVBQVU7Ozs7Ozs4RUFDeEIsOERBQUNEO29FQUFPQyxPQUFNOzhFQUFVOzs7Ozs7OEVBQ3hCLDhEQUFDRDtvRUFBT0MsT0FBTTs4RUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQVNwRCw4REFBQ2xDLG9EQUFNQTs7NEJBQUVvQjs0QkFBUUM7NEJBQWM7NEJBQU1DOzRCQUFpQjswQ0FBaUIsOERBQUNuQixrREFBSUE7Z0NBQ3hFZ0MsTUFBSzswQ0FBNkI7Ozs7Ozs7Ozs7OztrQ0FFdEMsOERBQUNuQyxvREFBTUE7d0JBQUNvQyxjQUFhO3dCQUFTQyxPQUFNO3dCQUFNQyxXQUFVO2tDQUNoRCw0RUFBQ3ZDLG9EQUFNQTs0QkFBQ3dDLGlCQUFnQjtzQ0FDdkI7Ozs7Ozs7Ozs7O2tDQUlMLDhEQUFDdkMsb0RBQU1BO3dCQUFDb0MsY0FBYTt3QkFBU0MsT0FBTTt3QkFBTUMsV0FBVTtrQ0FDaEQsNEVBQUMvQyxpRUFBYUE7Ozs7Ozs7Ozs7a0NBS2xCLDhEQUFDVyx1REFBU0E7a0NBQ04sNEVBQUNVLHdEQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZaEM7R0FuRlNDOztRQU9pQmxCLDZDQUFVQTs7O0tBUDNCa0I7QUFxRlQsK0RBQWVBLEdBQUdBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL19hcHAudHN4P2Y5ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdAcmFpbmJvdy1tZS9yYWluYm93a2l0L3N0eWxlcy5jc3MnXG5pbXBvcnQge0Nvbm5lY3RCdXR0b24sIFJhaW5ib3dLaXRQcm92aWRlcn0gZnJvbSAnQHJhaW5ib3ctbWUvcmFpbmJvd2tpdCdcbmltcG9ydCB0eXBlIHtBcHBQcm9wc30gZnJvbSAnbmV4dC9hcHAnXG5pbXBvcnQgTmV4dEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge3VzZUFjY291bnQsIFdhZ21pQ29uZmlnfSBmcm9tICd3YWdtaSdcblxuaW1wb3J0IHtjaGFpbnMsIGNsaWVudH0gZnJvbSAnLi4vd2FnbWknXG5cbmltcG9ydCB7XG4gICAgQnV0dG9uLFxuICAgIENlbnRlcixcbiAgICBDaGFrcmFQcm92aWRlcixcbiAgICBDb250YWluZXIsXG4gICAgTGluayxcbiAgICBTZWxlY3QsXG4gICAgVGFibGUsXG4gICAgVGFibGVDYXB0aW9uLFxuICAgIFRhYmxlQ29udGFpbmVyLFxuICAgIFRib2R5LFxuICAgIFRkLFxuICAgIFRoLFxuICAgIFRoZWFkLFxuICAgIFRyXG59IGZyb20gJ0BjaGFrcmEtdWkvcmVhY3QnXG5cbmltcG9ydCB7UHJ1ZWJhc30gZnJvbSBcIi4uL2NvbXBvbmVudHMvUHJ1ZWJhc1wiO1xuaW1wb3J0IHtBY2NvdW50fSBmcm9tIFwiLi4vY29tcG9uZW50c1wiO1xuXG5cbmZ1bmN0aW9uIEFwcCh7Q29tcG9uZW50LCBwYWdlUHJvcHN9OiBBcHBQcm9wcykge1xuICAgIGNvbnN0IFttb3VudGVkLCBzZXRNb3VudGVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKVxuXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHNldE1vdW50ZWQodHJ1ZSksIFtdKVxuICAgIGxldCBhbW91bnQ7XG4gICAgbGV0IHNlbGVjdGVkVG9rZW47XG4gICAgbGV0IHNlbGVjdGVkQ3VycmVuY3k7XG4gICAgY29uc3Qge2lzQ29ubmVjdGVkfSA9IHVzZUFjY291bnQoKVxuXG4gICAgcmV0dXJuIChcblxuICAgICAgICA8Q2hha3JhUHJvdmlkZXI+XG4gICAgICAgICAgICA8V2FnbWlDb25maWcgY2xpZW50PXtjbGllbnR9PlxuICAgICAgICAgICAgICAgIDxSYWluYm93S2l0UHJvdmlkZXIgY2hhaW5zPXtjaGFpbnN9PlxuICAgICAgICAgICAgICAgICAgICA8TmV4dEhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGl0bGU+TXkgd2FnbWkgKyBSYWluYm93S2l0IEFwcDwvdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDwvTmV4dEhlYWQ+XG5cbiAgICAgICAgICAgICAgICAgICAge21vdW50ZWQgJiYgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPn1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2ggPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHNlYXJjaCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFyYW1zXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIDxDZW50ZXIgYm9yZGVyPScxcHgnIGJvcmRlckNvbG9yPSdncmF5LjIwMCcgYm9yZGVyUmFkaXVzPVwiMTJweFwiIGFsaWduU2VsZj1cImNlbnRlclwiIG1heFdpZHRoPVwiNzBjaFwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8VGFibGVDb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxlIHZhcmlhbnQ9J3NpbXBsZSc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUaGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGggaXNOdW1lcmljPkFNT1VOVDwvVGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRoPkNVUlJFTkNZPC9UaD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUYm9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGQgaXNOdW1lcmljPjI1LjQ8L1RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZD5VU0Q8L1RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ucj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGQgaXNOdW1lcmljPjMwLjQ4PC9UZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3QgcGxhY2Vob2xkZXI9J1NlbGVjdCB0b2tlbicgYm9yZGVyUmFkaXVzPVwiMjBweFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nb3B0aW9uMSc+VVNEQzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nb3B0aW9uMic+REFJPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdvcHRpb24zJz5VU0RUPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RhYmxlQ29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L0NlbnRlcj5cblxuICAgICAgICAgICAgICAgICAgICA8Q2VudGVyPnthbW91bnR9e3NlbGVjdGVkVG9rZW59IHBlciB7c2VsZWN0ZWRDdXJyZW5jeX0gKE5vIGhpZGRlbiBmZWVzIDxMaW5rXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmPSdodHRwczovL3d3dy5jb2luZ2Vja28uY29tLyc+Q29pbmdlY2tvKTwvTGluaz48L0NlbnRlcj5cblxuICAgICAgICAgICAgICAgICAgICA8Q2VudGVyIGFsaWduQ29udGVudD1cImNlbnRlclwiIHdpZHRoPVwiNTAlXCIgbWFyZ2luVG9wPVwiMTVweFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBiYWNrZ3JvdW5kQ29sb3I9XCIjMEU3NkZEXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID4gUGFnYVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvQ2VudGVyPlxuXG4gICAgICAgICAgICAgICAgICAgIDxDZW50ZXIgYWxpZ25Db250ZW50PVwiY2VudGVyXCIgd2lkdGg9XCI1MCVcIiBtYXJnaW5Ub3A9XCIxNXB4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29ubmVjdEJ1dHRvbi8+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Lyp7aXNDb25uZWN0ZWQgJiYgPEFjY291bnQvPn0qL31cbiAgICAgICAgICAgICAgICAgICAgPC9DZW50ZXI+XG5cblxuICAgICAgICAgICAgICAgICAgICA8Q29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFBydWViYXMvPlxuICAgICAgICAgICAgICAgICAgICA8L0NvbnRhaW5lcj5cblxuXG4gICAgICAgICAgICAgICAgICAgIHsvKjxSZXR1cm5Ub1N0b3JlIC8+Ki99XG4gICAgICAgICAgICAgICAgICAgIHsvKjxFcmMyMERyb3Bkb3duIC8+Ki99XG4gICAgICAgICAgICAgICAgICAgIHsvKjxQYXltZW50RGV0YWlscyAvPiovfVxuICAgICAgICAgICAgICAgICAgICB7Lyo8UGF5QnV0dG9uIC8+Ki99XG4gICAgICAgICAgICAgICAgPC9SYWluYm93S2l0UHJvdmlkZXI+XG4gICAgICAgICAgICA8L1dhZ21pQ29uZmlnPlxuICAgICAgICA8L0NoYWtyYVByb3ZpZGVyPlxuICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwXG4iXSwibmFtZXMiOlsiQ29ubmVjdEJ1dHRvbiIsIlJhaW5ib3dLaXRQcm92aWRlciIsIk5leHRIZWFkIiwiUmVhY3QiLCJ1c2VBY2NvdW50IiwiV2FnbWlDb25maWciLCJjaGFpbnMiLCJjbGllbnQiLCJCdXR0b24iLCJDZW50ZXIiLCJDaGFrcmFQcm92aWRlciIsIkNvbnRhaW5lciIsIkxpbmsiLCJTZWxlY3QiLCJUYWJsZSIsIlRhYmxlQ29udGFpbmVyIiwiVGJvZHkiLCJUZCIsIlRoIiwiVGhlYWQiLCJUciIsIlBydWViYXMiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJtb3VudGVkIiwic2V0TW91bnRlZCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiYW1vdW50Iiwic2VsZWN0ZWRUb2tlbiIsInNlbGVjdGVkQ3VycmVuY3kiLCJpc0Nvbm5lY3RlZCIsInRpdGxlIiwiYm9yZGVyIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJSYWRpdXMiLCJhbGlnblNlbGYiLCJtYXhXaWR0aCIsInZhcmlhbnQiLCJpc051bWVyaWMiLCJwbGFjZWhvbGRlciIsIm9wdGlvbiIsInZhbHVlIiwiaHJlZiIsImFsaWduQ29udGVudCIsIndpZHRoIiwibWFyZ2luVG9wIiwiYmFja2dyb3VuZENvbG9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n"));

/***/ })

});