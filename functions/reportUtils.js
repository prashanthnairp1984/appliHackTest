
module.exports = async function (sComp1,sComp2) {
  console.log("Compare " + sComp1.toString() + " with " + sComp2.toString());
  expect(sComp1.toString().trim()).toEqual(sComp2.toString().trim())
}
