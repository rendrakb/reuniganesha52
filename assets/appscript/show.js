function doGet() {
  var output = HtmlService.createTemplateFromFile('index').evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return output;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getData() {
  var sheet = SpreadsheetApp.openById('1NLeHNSsQpGt9fspa0vypP1BuA2ew2OnBVGXgMAaF1tQ').getSheetByName('Pendaftar'); // destination
  var data = sheet.getRange('A1:D' + sheet.getLastRow()).getValues();
  
  // extract the header row
  var header = data.shift(); // remove the first row and store it
  
  // sort the remaining data by the values in column B (index 1)
  data.sort(function(a, b) {
    return a[1] > b[1] ? 1 : -1;
  });
  
  // re-insert the header row at the beginning
  data.unshift(header);
  
  return data;
}
