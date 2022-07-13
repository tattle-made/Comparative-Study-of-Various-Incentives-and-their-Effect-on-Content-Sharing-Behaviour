/**
 * This module contains functions that map data from the sql row
 * to a plain csv
 */

function postNumberInSheet(postNumber, postInfoType) {
  let postNumberSheet;

  postTypeIndex = {
    PLAUSIBLE: 0,
    IMPLAUSIBLE: 1,
    TRUE: 2,
    FALSE: 3,
    WHOLESOME: 4,
  };

  postNumberSheet = 50 * postTypeIndex[postInfoType] + postNumber;
  return postNumberSheet;
}

module.exports = {
  postNumberInSheet,
};
