const axios = require("axios");

async function forwardGeocode(place) {
  const API_KEY = 'BFsJsZBxjQ5lnpgU4o4o'; // or hardcode for testing
  const res = await axios.get(`https://api.maptiler.com/geocoding/${encodeURIComponent(place)}.json`, {
    params: {
      key: API_KEY,
      limit: 1
    }
  });

  return res.data.features[0].geometry; // [lon, lat]
}

module.exports = forwardGeocode; // ✅ export for use in other files
// (async () => {
//   const a = await forwardGeocode("Mumbai");
//   console.log(a); // ✅ [72.8759103, 19.0759899]
// })();