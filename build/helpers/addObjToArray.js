"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addObjToArray;

function addObjToArray(arr, obj) {
  var resultArr = arr.filter(arrObj => {
    var _arrObj$_id;

    return ((_arrObj$_id = arrObj._id) === null || _arrObj$_id === void 0 ? void 0 : _arrObj$_id.toString()) !== obj;
  });
  if (resultArr.length === arr.length) resultArr.push(obj);
  return resultArr;
}
//# sourceMappingURL=addObjToArray.js.map