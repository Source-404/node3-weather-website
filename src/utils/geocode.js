const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic291cmNlLTQwNCIsImEiOiJja244YWJwdTgwMjIxMnhtdTY3Y2YxaXBuIn0.R5bolpVVSPQC1gQb-_8aQQ&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("low level error", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find anything");
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
