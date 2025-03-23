import React, { useLayoutEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const MapTSP = ({ directions, orderedDirections }) => {
  const mapDiv = useRef(null);
  const [map, setMap] = useState(null);
  const markersRef = useRef([]);

  useLayoutEffect(() => {
    const initializeMap = new mapboxgl.Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-100, 40],
      zoom: 3
    });
    setMap(initializeMap);
    return () => initializeMap.remove();
  }, []);

  useLayoutEffect(() => {
    if (map && directions) {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      directions.forEach(({ latitude, longitude }) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
          `Lat: ${latitude}, Lng: ${longitude}`
        );
        const marker = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(map);
        markersRef.current.push(marker);
      });
    }
  }, [map, directions]);

  useLayoutEffect(() => {
    if (map && orderedDirections.length > 1) {
      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
      }

      const geojson = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: []
        }
      };

      map.addSource('route', {
        type: 'geojson',
        data: geojson
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#FF0000',
          'line-width': 6
        }
      });

      let index = 0;
      const interval = setInterval(() => {
        if (index < orderedDirections.length) {
          const newPoints = orderedDirections.slice(0, index + 1).map(({ longitude, latitude }) => [longitude, latitude]);
          map.getSource('route').setData({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: newPoints
            }
          });
          index++;
        } else {
          clearInterval(interval);
        }
      }, 500);
    }
  }, [map, orderedDirections]);

  return (
    <div ref={mapDiv} style={{ height: '500px', width: '100%' }}>
    </div>
  );
};

export default MapTSP;
