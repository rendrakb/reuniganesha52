document.addEventListener("DOMContentLoaded", function () {
  const tables = [
    { id: "table50", file: "assets/data/50.csv" },
    { id: "table100", file: "assets/data/100.csv" },
    { id: "table150", file: "assets/data/150.csv" },
    { id: "table200", file: "assets/data/200.csv" },
    { id: "table250", file: "assets/data/250.csv" },
    { id: "table300", file: "assets/data/300.csv" },
  ];

  tables.forEach((table) => {
    fetch(table.file)
      .then((response) => response.text())
      .then((text) => {
        const rows = text.trim().split("\n");
        let tableHTML = "";
        let currentTable = [];
        let tableCount = 0;
        let displayTable = false;

        rows.forEach((row) => {
          if (row.trim() === ",,,,") {
            tableCount++;
            displayTable = tableCount === 1 || tableCount === 2;
            if (displayTable && currentTable.length > 0) {
              tableHTML += generateTableHTML(currentTable);
            }
            tableHTML += '<tr><td colspan="5" style="height: 5px; border: none;"></td></tr>';

            //add spacing between tables
            currentTable = [];
          } else {
            currentTable.push(row.split(","));
          }
        });

        //check last table, in case it doesn't end with ",,,,"
        if (currentTable.length > 0) {
          tableCount++;
          if (tableCount === 1 || tableCount === 3) {
            tableHTML += generateTableHTML(currentTable);
          }
        }

        document.getElementById(table.id).innerHTML = tableHTML;
      })
      .then(() => {

        //call the slider initialization function from main.js
        if (typeof initializeSlider === "function") {
          initializeSlider();
        }
      });
  });

  function generateTableHTML(data) {
    let table = "<table><tbody>";
    data.forEach((cells, rowIndex) => {
      table += "<tr>";
      cells.forEach((cell, cellIndex) => {
        
        //apply thousand separator to harga and jumlah columns and align to the right
        const formattedCell =
          (cellIndex === 1 || cellIndex === 2 || cellIndex === 4) &&
          !isNaN(cell)
            ? `<td style="text-align: right;">${Number(cell).toLocaleString(
                "id-ID"
              )}</td>`
            : `<td>${cell.trim()}</td>`;
        if (rowIndex === 0) {
          table += `<th style="font-weight: bold; text-align: center; padding-bottom: 10px;">${cell.trim()}</th>`;
        } else {
          table += formattedCell;
        }
      });
      table += "</tr>";
    });
    table += "</tbody></table>";
    return table;
  }
});
