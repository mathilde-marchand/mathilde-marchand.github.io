(function ($) {
  const map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        // source: new ol.source.OSM(), // Fond de carte OpenStreetMap
        source: new ol.source.XYZ({
          url: "https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          attributions: "&copy; OpenStreetMap contributors, &copy; CARTO",
        }),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([2.3522, 46.8566]), // Coordonnées [Longitude, Latitude] (ex: Paris)
      zoom: 5, // Niveau de zoom
    }),
  });

  //  Config lieux
  const places = {
    sesan: {
      lat: 48.8325447,
      long: 2.2891525,
    },
    coexya: {
      lat: 48.8485323,
      long: 2.3683048,
    },
    brest: {
      lat: 48.3937323,
      long: -4.4835547,
    },
    lorient: {
      lat: 47.7482857,
      long: -3.3684105,
    },
    lyon: {
      lat: 45.7178423,
      long: 4.9195324,
    },
    "saint-etienne": {
      lat: 45.4261284,
      long: 4.3922034,
    },
    sorbonne: {
      lat: 48.9000401,
      long: 2.3451733,
    },
    krakow: {
      lat: 50.0260528,
      long: 19.9017223,
    },
  };

  function zoomToPlaces(places) {
    for (const [id, coords] of Object.entries(places)) {
      const element = document.getElementById(`${id}-map`);

      if (element) {
        element.addEventListener("click", () => {
          map.getView().animate({
            center: ol.proj.fromLonLat([coords.long, coords.lat]),
            zoom: 12,
            duration: 1000,
          });
        });
      }
    }
  }

  zoomToPlaces(places);

  function addMarkers(places) {
    // --- 1. CONFIGURATION DU MARQUEUR ---

    for (const [id, coords] of Object.entries(places)) {
      const markerCoords = ol.proj.fromLonLat([coords.long, coords.lat]);

      // Création de l'entité (Feature) du marqueur
      const markerFeature = new ol.Feature({
        geometry: new ol.geom.Point(markerCoords),
        name: "Sesan", // Nom qui apparaîtra dans le popup
        description: "Administration et développement...",
      });

      // Création du style : un point orange avec un contour bleu foncé
      const markerStyle = new ol.style.Style({
        image: new ol.style.Circle({
          radius: 6, // Taille du point
          fill: new ol.style.Fill({ color: "#f77f00" }), // Ton Orange !
        }),
      });

      markerFeature.setStyle(markerStyle);

      // --- 2. AJOUT DU MARQUEUR A LA CARTE ---
      const vectorSource = new ol.source.Vector({
        features: [markerFeature],
      });

      const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
      });

      map.addLayer(vectorLayer);
    }
  }

  addMarkers(places);
})(jQuery);
