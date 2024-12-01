document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/data/finansial.json")
    .then((response) => response.json())
    .then((data) => {
      const tables = [
        {
          id: "table50",
          pendapatan: data["Pendapatan 50"],
          pengeluaran: data["Pengeluaran 50"],
        },
        {
          id: "table100",
          pendapatan: data["Pendapatan 100"],
          pengeluaran: data["Pengeluaran 100"],
        },
        {
          id: "table150",
          pendapatan: data["Pendapatan 150"],
          pengeluaran: data["Pengeluaran 150"],
        },
        {
          id: "table200",
          pendapatan: data["Pendapatan 200"],
          pengeluaran: data["Pengeluaran 200"],
        },
        {
          id: "table250",
          pendapatan: data["Pendapatan 250"],
          pengeluaran: data["Pengeluaran 250"],
        },
        {
          id: "table300",
          pendapatan: data["Pendapatan 300"],
          pengeluaran: data["Pengeluaran 300"],
        },
      ];

      tables.forEach((table) => {
        const tableHTMLPendapatan = generateTableHTML(table.pendapatan);
        const tableHTMLPengeluaran = generateTableHTML(table.pengeluaran);
        document.getElementById(table.id).innerHTML =
          tableHTMLPendapatan + tableHTMLPengeluaran;
      });

      // calling slider from main.js
      if (typeof initializeSlider === "function") {
        initializeSlider();
      }
    });

  function generateTableHTML(data) {
    let table = "<table><tbody>";

    // generate headers
    table += "<tr>";
    Object.keys(data[0]).forEach((key) => {
      table += `<th style="font-weight: bold; text-align: center; padding-bottom: 10px;">${key}</th>`;
    });
    table += "</tr>";

    // generate rows
    data.forEach((item) => {
      table += "<tr>";
      Object.values(item).forEach((value) => {
        const formattedValue =
          value !== null ? value.toLocaleString("id-ID") : "";
        table += `<td style="text-align: ${
          typeof value === "number" ? "right" : "left"
        };">${formattedValue}</td>`;
      });
      table += "</tr>";
    });

    table += "</tbody></table>";
    return table;
  }
});
