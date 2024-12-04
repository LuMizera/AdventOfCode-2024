const fs = require('fs/promises');
const path = require('path');

function isReportSafe(report) {
  const isIncreasing = report.every(
    (val, idx) => idx === 0 || (val - report[idx - 1] >= 1 && val - report[idx - 1] <= 3)
  );

  const isDecreasing = report.every(
    (val, idx) => idx === 0 || (report[idx - 1] - val >= 1 && report[idx - 1] - val <= 3)
  );

  return isIncreasing || isDecreasing;
}

function countSafeReports(reports, allowProblemDampener = false) {
  return reports.filter((report) => {
    if (isReportSafe(report)) return true;

    if (allowProblemDampener) {
      return report.some((_, removeIdx) => {
        const modifiedReport = report.filter((_, idx) => idx !== removeIdx);
        return isReportSafe(modifiedReport);
      });
    }

    return false;
  }).length;
}

fs.readFile(path.dirname(__filename) + '/input.txt', 'utf8').then((plainInputData) => {
  const numberArray = plainInputData.split('\n').map((line) => line.split(' ').map(Number));

  const result = countSafeReports(numberArray, true);
  console.log('🚀 ~ fs.readFile ~ result:', result);
});
