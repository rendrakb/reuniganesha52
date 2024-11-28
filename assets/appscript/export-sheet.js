function onFormSubmit(e) {
  var sheet = e.source.getSheetByName('Pendaftar'); // source sheet name
  var range = sheet.getRange('C:E');
  var data = range.getValues();

  // destination
  var destinationSheet = SpreadsheetApp.openById('1NLeHNSsQpGt9fspa0vypP1BuA2ew2OnBVGXgMAaF1tQ');
  var destSheetName = 'Pendaftar'; // destination sheet name
  var destSheet = destinationSheet.getSheetByName(destSheetName);

  // clear only specific columns
  destSheet.getRange('A:C').clear();
  destSheet.getRange(1, 1, data.length, data[0].length).setValues(data);
}

function simulateEdit() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pendaftar'); // source sheet name
  var range = sheet.getRange('C:E');
  var data = range.getValues();

  // destination
  var destinationSheet = SpreadsheetApp.openById('1NLeHNSsQpGt9fspa0vypP1BuA2ew2OnBVGXgMAaF1tQ');
  var destSheetName = 'Pendaftar'; // destination sheet name
  var destSheet = destinationSheet.getSheetByName(destSheetName);

  // clear only specific columns
  destSheet.getRange('A:C').clear();
  destSheet.getRange(1, 1, data.length, data[0].length).setValues(data);
}
