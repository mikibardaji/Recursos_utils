/**
 * Exporta un rang de columnes i files d'un Google Sheet a un fitxer TXT.
 * El TXT es guarda a la mateixa carpeta del document i es sobreescriu si ja existeix.
 *
 * CONFIGURACIÓ:
 *  - spreadsheetId  → ID del document Google Sheet
 *  - nomFulla       → Nom de la fulla dins del document
 *  - columnes       → Columnes a exportar (1=A, 2=B, etc.)
 *  - filaInicial    → Primera fila a copiar
 *  - filaFinal      → Última fila a copiar
 *  - nomFitxer      → Nom del fitxer TXT generat
 */

function exportarTXTAlDriveMateixaCarpetaSobreescrivint() {
  // 🔹 CONFIGURACIÓ (ho ha d'editar l'usuari)
  const spreadsheetId = "PUT_YOUR_SPREADSHEET_ID_HERE";
  const nomFulla = "PUT_YOUR_SHEET_NAME_HERE";
  const columnes = [1, 2]; // Exemple: columnes A i B
  const filaInicial = 1;
  const filaFinal = 10;
  const nomFitxer = "Exportacio.txt";

  // 1️⃣ Obrir document i fulla
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheet = ss.getSheetByName(nomFulla);

  if (!sheet) {
    Logger.log("ERROR: La fulla '" + nomFulla + "' no existeix al document.");
    return;
  }

  // 2️⃣ Crear contingut TXT
  let contingutTXT = "";
  for (let fila = filaInicial; fila <= filaFinal; fila++) {
    let valorsFila = [];
    for (let i = 0; i < columnes.length; i++) {
      valorsFila.push(sheet.getRange(fila, columnes[i]).getValue());
    }
    contingutTXT += valorsFila.join("\t") + "\n";
  }

  // 3️⃣ Crear Blob
  const blob = Utilities.newBlob(contingutTXT, "text/plain", nomFitxer);

  // 4️⃣ Obtenir la carpeta del document
  const fitxerSheet = DriveApp.getFileById(spreadsheetId);
  const carpetes = fitxerSheet.getParents();
  let carpeta;

  if (carpetes.hasNext()) {
    carpeta = carpetes.next();
  } else {
    carpeta = DriveApp.getRootFolder();
  }

  // 5️⃣ Eliminar fitxer existent
  const filesExistents = carpeta.getFilesByName(nomFitxer);
  while (filesExistents.hasNext()) {
    filesExistents.next().setTrashed(true);
  }

  // 6️⃣ Crear el fitxer nou
  carpeta.createFile(blob);

  Logger.log("Fitxer '" + nomFitxer + "' creat correctament a la mateixa carpeta del Google Sheet.");
}
