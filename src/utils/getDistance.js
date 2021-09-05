const request = require("request");

const getDistance = (from, to, callback) => {
  const url = `http://www.mapquestapi.com/directions/v2/route?key=rPHxTnmKAcBAcZPx8h24FVrpG6Ndtoiv&from=${from}&to=${to}&unit=k`;
  request({ url, json: true }, (error, body) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else {
      callback(undefined, {
        body,
      });
    }
  });
};

module.exports = getDistance;
