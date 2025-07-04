    maptilersdk.config.apiKey = maptoken;
    const map = new maptilersdk.Map({
      container: 'map', // container's id or the HTML element in which the SDK will render the map
      style: maptilersdk.MapStyle.STREETS,
      center:coordinates, // starting position [lng, lat]
      zoom: 14 // starting zoom
    });
      //console.log(coordinates);
   var popup = new maptilersdk.Popup({ offset: 25 }).setHTML(
      ` <p> Exact Location provided After booking</p>`
    );

  const marker = new maptilersdk.Marker()
    .setLngLat(coordinates)
     .setPopup(popup)
    .addTo(map);