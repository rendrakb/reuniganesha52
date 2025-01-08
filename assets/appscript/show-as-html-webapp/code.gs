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
  
  // calculate the total number of registrants (excluding header)
  var totalPendaftar = data.length - 1;
  
  // calculate the sum of values in column C (jumlah)
  var totalPenghadir = data.slice(1).reduce(function(sum, row) { // Skip the header row
    return sum + (parseInt(row[2], 10) || 0); // Parse values as integers and sum them up
  }, 0);
  
    // add another row at the end showing the total Penghadir
  var penghadirRow = ["Total Penghadir", "", totalPenghadir, ""];
  data.push(penghadirRow);

  // add a new row at the end showing the total number of registrants
  var totalRow = ["Total Pendaftar", "", totalPendaftar, ""];
  data.push(totalRow);
  
  // return the data
  return data;
}
