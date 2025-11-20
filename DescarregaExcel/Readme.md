# Google Sheets → TXT Exporter (Google Apps Script)

Aquest script permet exportar un conjunt de columnes i files d'un document de Google Sheets a un fitxer **TXT** amb format tabulat (com un copy/paste normal).  
El fitxer generat es guarda automàticament a la **mateixa carpeta del Google Sheet** i es **sobreescriu** si ja existeix.

---

## ✨ Funcionalitats
- Exporta columnes i files concretes.
- Format TXT amb tabuladors (`\t`), apte per copiar i enganxar.
- Desa automàticament a la mateixa carpeta del document.
- Sobreescriu el fitxer si ja existeix.
- No mostra cap alerta: usa `Logger.log()` per informar.

---

## 🔧 Configuració

Edita les variables a l'inici de la funció:

```javascript
const spreadsheetId = "PUT_YOUR_SPREADSHEET_ID_HERE"; // ID del Google Sheet
const nomFulla = "PUT_YOUR_SHEET_NAME_HERE";          // Nom de la fulla
const columnes = [1, 2];                              // Columnes (1=A, 2=B...)
const filaInicial = 1;                                // Primera fila a copiar
const filaFinal = 10;                                 // Última fila a copiar
const nomFitxer = "Exportacio.txt";                   // Nom del TXT de sortida
