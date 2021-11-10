import React, { useEffect, useState, useRef } from "react";
import Nav from './Nav'
import "./Topo.css";
import mapboxgl from "!mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZGNoaWNjaG9uIiwiYSI6ImNrdnNxd3Y4MTJrc2MydnVwdWp5aTN3NGoifQ.dN5x__Dpb7bqNisu6n-FFA";

export const Topo = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [landColor, setLandColor] = useState('hsl(185, 0%, 18%)')
  const [lineColor, setLineColor] = useState('#85ceff')
  const [lineWidth, setLineWidth] = useState(1)
  const [contours, setContours] = useState(true)
  const [places, setPlaces] = useState(true)

  // initial setup of map
  useEffect(() => {
    let lng = -70.9
    let lat = 42.35
    let zoom = 9;
    let longitude = window.localStorage.getItem('lng')
    let latitude = window.localStorage.getItem('lat')
    let zoomStore = window.localStorage.getItem('zoom')
    // let storedLineColor = window.localStorage.getItem('line-color')
    // let storedLandColor = window.localStorage.getItem('land-color')
    if (parseFloat(longitude) && parseFloat(latitude) && parseFloat(zoomStore)) {
      lng = longitude;
      lat = latitude;
      zoom = zoomStore
    }
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/dchicchon/ckvb5lorxb4ep14p13vc4exqp",
      center: [lng, lat],
      zoom: zoom,
      preserveDrawingBuffer: true
    });
    newMap.on('load', () => {

      newMap.addSource('places', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-streets-v8'
      });

      newMap.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'places',
        'source-layer': 'place_label',
        layout: {
          "text-field": ["get", "name"],
          "text-size": 12,
          "text-offset": [0, -1.5],
        },
        paint: {
          "text-color": "#fff",
          "text-halo-color": "#333333",
          "text-halo-width": 1,
        },

      })

      newMap.addLayer({
        id: 'POI',
        type: 'symbol',
        source: 'places',
        'source-layer': 'poi_label',
        layout: {
          "text-field": ["get", "name"],
          "text-size": 12,
          "text-offset": [0, -1.5],
        },
        paint: {
          "text-color": "#fff",
          "text-halo-color": "#333333",
          "text-halo-width": 1,
        },
      })

      newMap.addSource('terrain', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2'
      });

      newMap.addLayer({
        'id': 'contours',
        'type': 'line',
        'source': 'terrain',
        'source-layer': 'contour',
        'layout': {
          // Make the layer visible by default.
          'visibility': 'visible',
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': lineColor,
          'line-width': lineWidth
        }
      });

    })
    newMap.on('move', () => {
      window.localStorage.setItem('lng', newMap.getCenter().lng.toFixed(4))
      window.localStorage.setItem('lat', newMap.getCenter().lat.toFixed(4))
      window.localStorage.setItem('zoom', newMap.getZoom().toFixed(2))
    })
    setMap(newMap)
  }, []);

  useEffect(() => {
    if (!map) return;
    map.setPaintProperty('land', 'background-color', landColor)
    map.setPaintProperty('water-shadow', 'fill-color', landColor)
    map.setPaintProperty('waterway-shadow', 'line-color', landColor)
    map.setPaintProperty('waterway', 'line-color', landColor)
  }, [landColor])

  useEffect(() => {
    if (!map) return
    map.setPaintProperty('contours', 'line-color', lineColor)
  }, [lineColor])

  useEffect(() => {
    if (!map) return;
    map.setPaintProperty('contours', 'line-width', lineWidth)
  }, [lineWidth])

  // Toggle Contours
  useEffect(() => {
    if (!map) return;
    console.log("Toggle Contours")
    const newVisibleProperty = contours ? 'visible' : 'none'
    map.setLayoutProperty('contours', 'visibility', newVisibleProperty)
  }, [contours])

  useEffect(() => {
    if (!map) return;
    const newVisibleProperty = places ? 'visible' : 'none'
    map.setLayoutProperty('places', 'visibility', newVisibleProperty)
    map.setLayoutProperty('POI', 'visibility', newVisibleProperty)

  }, [places])

  return (
    <div id='main'>
      <Nav
        map={map}
        landColor={landColor}
        setLandColor={setLandColor}
        lineColor={lineColor}
        setLineColor={setLineColor}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        setPlaces={setPlaces}
        setContours={setContours}
      />
      <div ref={mapContainer} className="map-container"></div>
    </div>
  );
};

