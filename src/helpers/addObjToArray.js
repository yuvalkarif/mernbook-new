export default function addObjToArray(arr, obj) {
  const resultArr = arr.filter((arrObj) => arrObj._id?.toString() !== obj);
  if (resultArr.length === arr.length) resultArr.push(obj);
  return resultArr;
}
