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

/***/ "./src/components/Pruebas.tsx":
/*!************************************!*\
  !*** ./src/components/Pruebas.tsx ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Pruebas\": function() { return /* binding */ Pruebas; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! wagmi */ \"./node_modules/wagmi/dist/index.js\");\n/* harmony import */ var _wagmi_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wagmi/core */ \"./node_modules/@wagmi/core/dist/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/index.mjs\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nfunction Pruebas() {\n    _s();\n    // const [param, setParam] = useState(\"\");\n    // const SPRINTCHECKOUT_CONTRACT_ADDRESS = '0x515EBd37Cd83B31570345426B6309c40eeceA50e';\n    const spcAbi = [\n        {\n            \"inputs\": [\n                {\n                    \"internalType\": \"address\",\n                    \"name\": \"selectedToken\",\n                    \"type\": \"address\"\n                },\n                {\n                    \"internalType\": \"address\",\n                    \"name\": \"customer\",\n                    \"type\": \"address\"\n                },\n                {\n                    \"internalType\": \"address\",\n                    \"name\": \"merchant\",\n                    \"type\": \"address\"\n                },\n                {\n                    \"internalType\": \"address\",\n                    \"name\": \"sprintcheckout\",\n                    \"type\": \"address\"\n                },\n                {\n                    \"internalType\": \"uint256\",\n                    \"name\": \"amount\",\n                    \"type\": \"uint256\"\n                },\n                {\n                    \"internalType\": \"uint256\",\n                    \"name\": \"spcFee\",\n                    \"type\": \"uint256\"\n                }\n            ],\n            \"name\": \"transferFrom\",\n            \"outputs\": [],\n            \"stateMutability\": \"nonpayable\",\n            \"type\": \"function\"\n        }\n    ];\n    const erc20Abi = [\n        {\n            \"constant\": false,\n            \"inputs\": [\n                {\n                    \"name\": \"spender\",\n                    \"type\": \"address\"\n                },\n                {\n                    \"name\": \"tokens\",\n                    \"type\": \"uint256\"\n                }\n            ],\n            \"name\": \"approve\",\n            \"outputs\": [\n                {\n                    \"name\": \"success\",\n                    \"type\": \"bool\"\n                }\n            ],\n            \"payable\": false,\n            \"stateMutability\": \"nonpayable\",\n            \"type\": \"function\"\n        },\n        {\n            \"constant\": true,\n            \"inputs\": [\n                {\n                    \"name\": \"owner\",\n                    \"type\": \"address\"\n                },\n                {\n                    \"name\": \"spender\",\n                    \"type\": \"address\"\n                }\n            ],\n            \"name\": \"allowance\",\n            \"outputs\": [\n                {\n                    \"name\": \"\",\n                    \"type\": \"uint256\"\n                }\n            ],\n            \"payable\": false,\n            \"stateMutability\": \"view\",\n            \"type\": \"function\"\n        }\n    ];\n    let account = (0,_wagmi_core__WEBPACK_IMPORTED_MODULE_2__.getAccount)();\n    let address = account.address;\n    console.log(\"address\");\n    console.log(address);\n    // const provider = useProvider()\n    const { config: erc20ConfigApprove  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.usePrepareContractWrite)({\n        address: \"0x852a4599217e76aa725f0ada8bf832a1f57a8a91\",\n        abi: erc20Abi,\n        functionName: \"approve\",\n        args: [\n            \"0x515EBd37Cd83B31570345426B6309c40eeceA50e\",\n            600000\n        ]\n    });\n    const { data: erc20ApproveData , write: approve  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.useContractWrite)(erc20ConfigApprove);\n    const { config: erc20Config  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.usePrepareContractWrite)({\n        address: \"0x852a4599217e76aa725f0ada8bf832a1f57a8a91\",\n        abi: erc20Abi,\n        functionName: \"allowance\",\n        args: [\n            address,\n            \"0x515EBd37Cd83B31570345426B6309c40eeceA50e\"\n        ]\n    });\n    const { data: erc20Data , write: allow  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.useContractWrite)(erc20Config);\n    const { data: allowanceData , isError , isLoading: allowanceLoading  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.useContractRead)({\n        address: \"0x852a4599217e76aa725f0ada8bf832a1f57a8a91\",\n        abi: erc20Abi,\n        functionName: \"allowance\",\n        args: [\n            address,\n            \"0x515EBd37Cd83B31570345426B6309c40eeceA50e\"\n        ]\n    });\n    console.log(\"Allowed:\" + allowanceData);\n    console.log(allowanceData);\n    const { config  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.usePrepareContractWrite)({\n        address: \"0x515EBd37Cd83B31570345426B6309c40eeceA50e\",\n        abi: spcAbi,\n        functionName: \"transferFrom\",\n        args: [\n            \"0x852a4599217e76aa725f0ada8bf832a1f57a8a91\",\n            address,\n            \"0xA3B667ed1aff9243A14FA4c610B4f8e29D0C96e1\",\n            \"0xAf1DD0F5dBebEc8c9c1c2a48aa79fB1D8E2DdA32\",\n            200000,\n            100000\n        ]\n    });\n    const { data: misDatos , isLoading , isSuccess , write: pay  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.useContractWrite)(config);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const user = window.localStorage.getItem(\"uid\");\n    }, []);\n    //\n    // allowErc20Token = async () => {\n    //     // @ts-ignore\n    //     await allow({args: [address, \"0x515EBd37Cd83B31570345426B6309c40eeceA50e\"]})\n    // }\n    //\n    //\n    // const {config: erc20ConfigApprove} = usePrepareContractWrite({\n    //     address: '0x852a4599217e76aa725f0ada8bf832a1f57a8a91',\n    //     abi: erc20Abi,\n    //     functionName: 'approve',\n    //     args: [address, \"0x515EBd37Cd83B31570345426B6309c40eeceA50e\"],\n    // })\n    //\n    // const {data: erc20ApproveData, write: approve} = useContractWrite(erc20ConfigApprove)\n    //\n    // approveErc20Token = async () => {\n    //     // @ts-ignore\n    //     await approve({args: [\"0x515EBd37Cd83B31570345426B6309c40eeceA50e\", 1]})\n    // }\n    //\n    //\n    // const {config} = usePrepareContractWrite({\n    //     address: '0x515EBd37Cd83B31570345426B6309c40eeceA50e',\n    //     abi: spcAbi,\n    //     functionName: 'transferFrom',\n    //     args: ['0x852a4599217e76aa725f0ada8bf832a1f57a8a91', address, \"0xA3B667ed1aff9243A14FA4c610B4f8e29D0C96e1\", \"0xAf1DD0F5dBebEc8c9c1c2a48aa79fB1D8E2DdA32\", 2, 1],\n    // })\n    //\n    // const {data: misDatos, isLoading, isSuccess, write: pay} = useContractWrite(config)\n    //\n    // payTheBill = async () => {\n    //     // @ts-ignore\n    //     await pay({args: ['0x852a4599217e76aa725f0ada8bf832a1f57a8a91', address, \"0xA3B667ed1aff9243A14FA4c610B4f8e29D0C96e1\", \"0xAf1DD0F5dBebEc8c9c1c2a48aa79fB1D8E2DdA32\", 2, 1]})\n    // }\n    //\n    // console.log(misDatos);\n    // console.log(isLoading);\n    // console.log(isSuccess);\n    // console.log(pay);\n    //\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {\n            onClick: ()=>{\n                return pay === null || pay === void 0 ? void 0 : pay();\n            },\n            children: \" Pay\"\n        }, void 0, false, {\n            fileName: \"/Users/david.calap/dev/workspace/jsenent/wagmi-tests/create-wagmi/templates/next/rainbowkit/src/components/Pruebas.tsx\",\n            lineNumber: 197,\n            columnNumber: 13\n        }, this)\n    }, void 0, false);\n}\n_s(Pruebas, \"VDRKfU5uYRDw80ELcuXoqamPHH4=\", false, function() {\n    return [\n        wagmi__WEBPACK_IMPORTED_MODULE_3__.usePrepareContractWrite,\n        wagmi__WEBPACK_IMPORTED_MODULE_3__.useContractWrite,\n        wagmi__WEBPACK_IMPORTED_MODULE_3__.usePrepareContractWrite,\n        wagmi__WEBPACK_IMPORTED_MODULE_3__.useContractWrite,\n        wagmi__WEBPACK_IMPORTED_MODULE_3__.useContractRead,\n        wagmi__WEBPACK_IMPORTED_MODULE_3__.usePrepareContractWrite,\n        wagmi__WEBPACK_IMPORTED_MODULE_3__.useContractWrite\n    ];\n});\n_c = Pruebas;\nvar _c;\n$RefreshReg$(_c, \"Pruebas\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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IjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvUHJ1ZWJhcy50c3g/OTY0NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3VzZUNvbnRyYWN0UmVhZCwgdXNlQ29udHJhY3RXcml0ZSwgdXNlUHJlcGFyZUNvbnRyYWN0V3JpdGUsIHVzZVByb3ZpZGVyfSBmcm9tICd3YWdtaSdcbmltcG9ydCB7Z2V0QWNjb3VudCwgZ2V0Q29udHJhY3R9IGZyb20gXCJAd2FnbWkvY29yZVwiO1xuaW1wb3J0IHt1c2VFZmZlY3QsIHVzZVN0YXRlfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7QnV0dG9ufSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gUHJ1ZWJhcygpIHtcbiAgICAvLyBjb25zdCBbcGFyYW0sIHNldFBhcmFtXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gICAgLy8gY29uc3QgU1BSSU5UQ0hFQ0tPVVRfQ09OVFJBQ1RfQUREUkVTUyA9ICcweDUxNUVCZDM3Q2Q4M0IzMTU3MDM0NTQyNkI2MzA5YzQwZWVjZUE1MGUnO1xuXG4gICAgY29uc3Qgc3BjQWJpID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImludGVybmFsVHlwZVwiOiBcImFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic2VsZWN0ZWRUb2tlblwiLFxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhZGRyZXNzXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJpbnRlcm5hbFR5cGVcIjogXCJhZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImN1c3RvbWVyXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFkZHJlc3NcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImludGVybmFsVHlwZVwiOiBcImFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibWVyY2hhbnRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiaW50ZXJuYWxUeXBlXCI6IFwiYWRkcmVzc1wiLFxuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJzcHJpbnRjaGVja291dFwiLFxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhZGRyZXNzXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJpbnRlcm5hbFR5cGVcIjogXCJ1aW50MjU2XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImFtb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJpbnRlcm5hbFR5cGVcIjogXCJ1aW50MjU2XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInNwY0ZlZVwiLFxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJuYW1lXCI6IFwidHJhbnNmZXJGcm9tXCIsXG4gICAgICAgICAgICBcIm91dHB1dHNcIjogW10sXG4gICAgICAgICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcIm5vbnBheWFibGVcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICBjb25zdCBlcmMyMEFiaSA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJjb25zdGFudFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInNwZW5kZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInRva2Vuc1wiLFxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiYXBwcm92ZVwiLFxuICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYm9vbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwibm9ucGF5YWJsZVwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcImNvbnN0YW50XCI6IHRydWUsXG4gICAgICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJvd25lclwiLFxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhZGRyZXNzXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic3BlbmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhZGRyZXNzXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiYWxsb3dhbmNlXCIsXG4gICAgICAgICAgICBcIm91dHB1dHNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICAgICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInZpZXdcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICAgICAgbGV0IGFjY291bnQgPSBnZXRBY2NvdW50KCk7XG4gICAgICAgIGxldCBhZGRyZXNzID0gYWNjb3VudC5hZGRyZXNzO1xuICAgICAgICBjb25zb2xlLmxvZyhcImFkZHJlc3NcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGFkZHJlc3MpO1xuICAgIC8vIGNvbnN0IHByb3ZpZGVyID0gdXNlUHJvdmlkZXIoKVxuXG4gICAgY29uc3Qge2NvbmZpZzogZXJjMjBDb25maWdBcHByb3ZlfSA9IHVzZVByZXBhcmVDb250cmFjdFdyaXRlKHtcbiAgICAgICAgYWRkcmVzczogJzB4ODUyYTQ1OTkyMTdlNzZhYTcyNWYwYWRhOGJmODMyYTFmNTdhOGE5MScsXG4gICAgICAgIGFiaTogZXJjMjBBYmksXG4gICAgICAgIGZ1bmN0aW9uTmFtZTogJ2FwcHJvdmUnLFxuICAgICAgICBhcmdzOiBbXCIweDUxNUVCZDM3Q2Q4M0IzMTU3MDM0NTQyNkI2MzA5YzQwZWVjZUE1MGVcIiwgNjAwMDAwXSxcbiAgICB9KVxuXG4gICAgY29uc3Qge2RhdGE6IGVyYzIwQXBwcm92ZURhdGEsIHdyaXRlOiBhcHByb3ZlfSA9IHVzZUNvbnRyYWN0V3JpdGUoZXJjMjBDb25maWdBcHByb3ZlKVxuXG5cbiAgICBjb25zdCB7Y29uZmlnOiBlcmMyMENvbmZpZ30gPSB1c2VQcmVwYXJlQ29udHJhY3RXcml0ZSh7XG4gICAgICAgIGFkZHJlc3M6ICcweDg1MmE0NTk5MjE3ZTc2YWE3MjVmMGFkYThiZjgzMmExZjU3YThhOTEnLFxuICAgICAgICBhYmk6IGVyYzIwQWJpLFxuICAgICAgICBmdW5jdGlvbk5hbWU6ICdhbGxvd2FuY2UnLFxuICAgICAgICBhcmdzOiBbYWRkcmVzcywgXCIweDUxNUVCZDM3Q2Q4M0IzMTU3MDM0NTQyNkI2MzA5YzQwZWVjZUE1MGVcIl0sXG4gICAgfSlcblxuICAgIGNvbnN0IHtkYXRhOiBlcmMyMERhdGEsIHdyaXRlOiBhbGxvd30gPSB1c2VDb250cmFjdFdyaXRlKGVyYzIwQ29uZmlnKVxuXG4gICAgY29uc3QgeyBkYXRhOiBhbGxvd2FuY2VEYXRhLCBpc0Vycm9yLCBpc0xvYWRpbmc6IGFsbG93YW5jZUxvYWRpbmcgfSA9IHVzZUNvbnRyYWN0UmVhZCh7XG4gICAgICAgIGFkZHJlc3M6ICcweDg1MmE0NTk5MjE3ZTc2YWE3MjVmMGFkYThiZjgzMmExZjU3YThhOTEnLFxuICAgICAgICBhYmk6IGVyYzIwQWJpLFxuICAgICAgICBmdW5jdGlvbk5hbWU6ICdhbGxvd2FuY2UnLFxuICAgICAgICBhcmdzOiBbYWRkcmVzcywgXCIweDUxNUVCZDM3Q2Q4M0IzMTU3MDM0NTQyNkI2MzA5YzQwZWVjZUE1MGVcIl0sXG4gICAgfSlcblxuICAgIGNvbnNvbGUubG9nKFwiQWxsb3dlZDpcIiArIGFsbG93YW5jZURhdGEpO1xuICAgIGNvbnNvbGUubG9nKGFsbG93YW5jZURhdGEpO1xuXG4gICAgY29uc3Qge2NvbmZpZ30gPSB1c2VQcmVwYXJlQ29udHJhY3RXcml0ZSh7XG4gICAgICAgIGFkZHJlc3M6ICcweDUxNUVCZDM3Q2Q4M0IzMTU3MDM0NTQyNkI2MzA5YzQwZWVjZUE1MGUnLFxuICAgICAgICBhYmk6IHNwY0FiaSxcbiAgICAgICAgZnVuY3Rpb25OYW1lOiAndHJhbnNmZXJGcm9tJyxcbiAgICAgICAgYXJnczogWycweDg1MmE0NTk5MjE3ZTc2YWE3MjVmMGFkYThiZjgzMmExZjU3YThhOTEnLCBhZGRyZXNzLCBcIjB4QTNCNjY3ZWQxYWZmOTI0M0ExNEZBNGM2MTBCNGY4ZTI5RDBDOTZlMVwiLCBcIjB4QWYxREQwRjVkQmViRWM4YzljMWMyYTQ4YWE3OWZCMUQ4RTJEZEEzMlwiLCAyMDAwMDAsIDEwMDAwMF0sXG4gICAgfSlcblxuICAgIGNvbnN0IHtkYXRhOiBtaXNEYXRvcywgaXNMb2FkaW5nLCBpc1N1Y2Nlc3MsIHdyaXRlOiBwYXl9ID0gdXNlQ29udHJhY3RXcml0ZShjb25maWcpXG5cblxuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgdXNlciA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndWlkJylcbiAgICB9LCBbXSk7XG5cblxuXG4gICAgLy9cbiAgICAvLyBhbGxvd0VyYzIwVG9rZW4gPSBhc3luYyAoKSA9PiB7XG4gICAgLy8gICAgIC8vIEB0cy1pZ25vcmVcbiAgICAvLyAgICAgYXdhaXQgYWxsb3coe2FyZ3M6IFthZGRyZXNzLCBcIjB4NTE1RUJkMzdDZDgzQjMxNTcwMzQ1NDI2QjYzMDljNDBlZWNlQTUwZVwiXX0pXG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBjb25zdCB7Y29uZmlnOiBlcmMyMENvbmZpZ0FwcHJvdmV9ID0gdXNlUHJlcGFyZUNvbnRyYWN0V3JpdGUoe1xuICAgIC8vICAgICBhZGRyZXNzOiAnMHg4NTJhNDU5OTIxN2U3NmFhNzI1ZjBhZGE4YmY4MzJhMWY1N2E4YTkxJyxcbiAgICAvLyAgICAgYWJpOiBlcmMyMEFiaSxcbiAgICAvLyAgICAgZnVuY3Rpb25OYW1lOiAnYXBwcm92ZScsXG4gICAgLy8gICAgIGFyZ3M6IFthZGRyZXNzLCBcIjB4NTE1RUJkMzdDZDgzQjMxNTcwMzQ1NDI2QjYzMDljNDBlZWNlQTUwZVwiXSxcbiAgICAvLyB9KVxuICAgIC8vXG4gICAgLy8gY29uc3Qge2RhdGE6IGVyYzIwQXBwcm92ZURhdGEsIHdyaXRlOiBhcHByb3ZlfSA9IHVzZUNvbnRyYWN0V3JpdGUoZXJjMjBDb25maWdBcHByb3ZlKVxuICAgIC8vXG4gICAgLy8gYXBwcm92ZUVyYzIwVG9rZW4gPSBhc3luYyAoKSA9PiB7XG4gICAgLy8gICAgIC8vIEB0cy1pZ25vcmVcbiAgICAvLyAgICAgYXdhaXQgYXBwcm92ZSh7YXJnczogW1wiMHg1MTVFQmQzN0NkODNCMzE1NzAzNDU0MjZCNjMwOWM0MGVlY2VBNTBlXCIsIDFdfSlcbiAgICAvLyB9XG4gICAgLy9cbiAgICAvL1xuICAgIC8vIGNvbnN0IHtjb25maWd9ID0gdXNlUHJlcGFyZUNvbnRyYWN0V3JpdGUoe1xuICAgIC8vICAgICBhZGRyZXNzOiAnMHg1MTVFQmQzN0NkODNCMzE1NzAzNDU0MjZCNjMwOWM0MGVlY2VBNTBlJyxcbiAgICAvLyAgICAgYWJpOiBzcGNBYmksXG4gICAgLy8gICAgIGZ1bmN0aW9uTmFtZTogJ3RyYW5zZmVyRnJvbScsXG4gICAgLy8gICAgIGFyZ3M6IFsnMHg4NTJhNDU5OTIxN2U3NmFhNzI1ZjBhZGE4YmY4MzJhMWY1N2E4YTkxJywgYWRkcmVzcywgXCIweEEzQjY2N2VkMWFmZjkyNDNBMTRGQTRjNjEwQjRmOGUyOUQwQzk2ZTFcIiwgXCIweEFmMUREMEY1ZEJlYkVjOGM5YzFjMmE0OGFhNzlmQjFEOEUyRGRBMzJcIiwgMiwgMV0sXG4gICAgLy8gfSlcbiAgICAvL1xuICAgIC8vIGNvbnN0IHtkYXRhOiBtaXNEYXRvcywgaXNMb2FkaW5nLCBpc1N1Y2Nlc3MsIHdyaXRlOiBwYXl9ID0gdXNlQ29udHJhY3RXcml0ZShjb25maWcpXG4gICAgLy9cbiAgICAvLyBwYXlUaGVCaWxsID0gYXN5bmMgKCkgPT4ge1xuICAgIC8vICAgICAvLyBAdHMtaWdub3JlXG4gICAgLy8gICAgIGF3YWl0IHBheSh7YXJnczogWycweDg1MmE0NTk5MjE3ZTc2YWE3MjVmMGFkYThiZjgzMmExZjU3YThhOTEnLCBhZGRyZXNzLCBcIjB4QTNCNjY3ZWQxYWZmOTI0M0ExNEZBNGM2MTBCNGY4ZTI5RDBDOTZlMVwiLCBcIjB4QWYxREQwRjVkQmViRWM4YzljMWMyYTQ4YWE3OWZCMUQ4RTJEZEEzMlwiLCAyLCAxXX0pXG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gY29uc29sZS5sb2cobWlzRGF0b3MpO1xuICAgIC8vIGNvbnNvbGUubG9nKGlzTG9hZGluZyk7XG4gICAgLy8gY29uc29sZS5sb2coaXNTdWNjZXNzKTtcbiAgICAvLyBjb25zb2xlLmxvZyhwYXkpO1xuICAgIC8vXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHBheT8uKCl9XG4gICAgICAgICAgICA+IFBheVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvPlxuICAgIClcbn1cblxuIl0sIm5hbWVzIjpbInVzZUNvbnRyYWN0UmVhZCIsInVzZUNvbnRyYWN0V3JpdGUiLCJ1c2VQcmVwYXJlQ29udHJhY3RXcml0ZSIsImdldEFjY291bnQiLCJ1c2VFZmZlY3QiLCJCdXR0b24iLCJQcnVlYmFzIiwic3BjQWJpIiwiZXJjMjBBYmkiLCJhY2NvdW50IiwiYWRkcmVzcyIsImNvbnNvbGUiLCJsb2ciLCJjb25maWciLCJlcmMyMENvbmZpZ0FwcHJvdmUiLCJhYmkiLCJmdW5jdGlvbk5hbWUiLCJhcmdzIiwiZGF0YSIsImVyYzIwQXBwcm92ZURhdGEiLCJ3cml0ZSIsImFwcHJvdmUiLCJlcmMyMENvbmZpZyIsImVyYzIwRGF0YSIsImFsbG93IiwiYWxsb3dhbmNlRGF0YSIsImlzRXJyb3IiLCJpc0xvYWRpbmciLCJhbGxvd2FuY2VMb2FkaW5nIiwibWlzRGF0b3MiLCJpc1N1Y2Nlc3MiLCJwYXkiLCJ1c2VyIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/Pruebas.tsx\n"));

/***/ })

});