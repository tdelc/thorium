import {partsList, randomFromList} from "./damageReports/constants";
import {System} from ".";

export default function processReport(report: string, system: System) {
  if (system) system.damage.neededReactivationCode = null;
  if (!report) return;
  let returnReport = report;
  // #PART
  if (system) system.damage.exocompParts = [];
  const partMatches = report.match(/#PART/gi) || [];
  partMatches.forEach(m => {
    const index = returnReport.indexOf(m);
    returnReport = returnReport.replace(m, "");
    const part = randomFromList(partsList);
    if (system) system.damage.exocompParts.push(part);
    returnReport = splice(returnReport, index, 0, part);
  });

  // #COLOR
  const colorMatches = report.match(/#COLOR/gi) || [];
  colorMatches.forEach(m => {
    const index = returnReport.indexOf(m);
    returnReport = returnReport.replace(m, "");
    returnReport = splice(
      returnReport,
      index,
      0,
      randomFromList(["red", "blue", "green", "yellow"]),
    );
  });

  // #[1 - 2]
  const matches = returnReport.match(/#\[ ?([0-9]+) ?- ?([0-9]+) ?\]/gi) || [];
  matches.forEach(m => {
    const index = returnReport.indexOf(m);
    returnReport = returnReport.replace(m, "");
    const numbers = m.replace(/[ [\]#]/gi, "").split("-");
    const num = Math.round(
      Math.random() * (parseInt(numbers[1], 10) - parseInt(numbers[0], 10)) +
        parseInt(numbers[0], 10),
    );
    returnReport = splice(returnReport, index, 0, num);
  });

  // #["String1", "String2", "String3", etc.]
  const stringMatches = returnReport.match(/#\[ ?("|')[^\]]*("|') ?]/gi) || [];
  stringMatches.forEach(m => {
    const index = returnReport.indexOf(m);
    returnReport = returnReport.replace(m, "");
    const strings = m.match(/"(.*?)"/gi);
    returnReport = splice(
      returnReport,
      index,
      0,
      randomFromList(strings).replace(/"/gi, ""),
    );
  });

  // #NUMBER
  const numberMatches = returnReport.match(/#NUMBER/gi) || [];
  const num = Math.round(Math.random() * 12 + 1);
  numberMatches.forEach(m => {
    const index = returnReport.indexOf(m);
    returnReport = returnReport.replace(m, "");
    returnReport = splice(returnReport, index, 0, num);
  });

  // #DECK
  const deckMatches = returnReport.match(/#DECK/gi) || [];
  const deck = Math.round(Math.random() * 14 + 1);
  deckMatches.forEach(m => {
    const index = returnReport.indexOf(m);
    returnReport = returnReport.replace(m, "");
    returnReport = splice(returnReport, index, 0, deck);
  });

  // #REACTIVATIONCODE
  if (report.indexOf("#REACTIVATIONCODE") > -1) {
    const reactivationCode = Array(8)
      .fill("")
      .map(() => randomFromList(["¥", "Ω", "∏", "-", "§", "∆", "£", "∑", "∂"]))
      .join("");
    if (system) system.damage.neededReactivationCode = reactivationCode;
    returnReport = returnReport.replace(
      /#REACTIVATIONCODE/gi,
      reactivationCode,
    );
  }

  // #SYSTEMNAME
  if (system && report.indexOf("#SYSTEMNAME")) {
    returnReport = returnReport.replace(
      /#SYSTEMNAME/gi,
      system.displayName || system.name || "system",
    );
  }

  return returnReport;
}

function splice(
  str: string,
  start: number,
  delCount: number,
  newSubStr: string | number,
) {
  return (
    str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount))
  );
}
