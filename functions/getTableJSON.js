let beforeSort=[];
let afterSort=[];
let sortedBefore=[]
module.exports = async function (sParentPath,sChildTag, sSortID) {
  await getJSON(sParentPath,sChildTag,'beforeSort');
  element(by.id(sSortID)).click();
  await getJSON(sParentPath,sChildTag, 'afterSort');
  sortedBefore = beforeSort.sort(function(a,b){
    let aTempVal = a.amount.replace(" USD","").replace(/(^\$|,)/g,"").replace(" ","")
    let bTempVal = b.amount.replace(" USD","").replace(/(^\$|,)/g,"").replace(" ","")
    return aTempVal - bTempVal
  })
  if (afterSort.toString() === sortedBefore.toString()){
    console.log("************************SUCCESS**********************");
    return true
  } else {
    console.log("************************FAIL**********************");
    return false
  }

}
function getJSON(sParentPath,sChildTag, sortVariable){
  let sortVar=[]
  return element.all(by.xpath(sParentPath)).each(function(elem, index) {
    let sCellTextValue = {}
    return elem.all(by.css(sChildTag)).each( function(elemCell, indexCell) {
      return elemCell.getText().then( function(text) {
        switch (indexCell) {
          case 0:
              sCellTextValue["status"] = text.toString();
            break;
          case 1:
              sCellTextValue["date"] = text.toString();
            break;
          case 2:
              sCellTextValue["description"] = text.toString();
            break;
          case 3:
              sCellTextValue["category"] = text.toString();
            break;
          case 4:
              sCellTextValue["amount"] = text.toString();
            break;
        }
      });
    }).then(() => {
      sortVar.push(sCellTextValue)
    })
  }).then(() => {
    if (sortVariable === 'beforeSort'){
      beforeSort = sortVar
    } else {
      afterSort = sortVar
    }
    return true
  })
}