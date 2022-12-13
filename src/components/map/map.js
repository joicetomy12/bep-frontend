import 'mapbox-gl/dist/mapbox-gl.css';

import React, { useEffect, useRef } from 'react';

import mapboxgl from '!mapbox-gl';

import { Config } from '../../config/config';
import { Constants } from '../../config/constants';
import { useGlobal } from '../../providers/globalProvider';
// import { getcustomFieldsIdandValue } from '../../config/utils';
import { useMap } from '../../providers/mapProvider';
import styles from '../../styles/map/map.module.css';
import MapZoomButton from './mapZoomButton';

mapboxgl.accessToken = Config.mapboxToken;

const Map = ({ singleEventRoute }) => {
  const { isMobile } = useGlobal();
  const mapContainerReference = useRef(null);
  const map = useRef(null);
  const currentMarkersInner = [];
  // const [commoncustomCategoryValue, setCommoncustomCategoryValue] =
  //   useState('');

  const {
    currentMapData,
    setMap,
    setSingleEventFocus,
    currentMarkers,
    setCurrentMarkers,
    currentActivePanel,
    eventRouteActive,
    renderPathTraceIndex,
    setDrawnRouteIndexes,
    drawnRouteIndexes
  } = useMap();
  useEffect(() => {
    if (!currentMapData) return;
    if (!map.current) {
      map.current = createMap();
      setMap(map);
    } else {
      updateMap();
    }

    removeMarkers();
    map.current.resize();

    if (currentActivePanel !== Constants.mapRenderEventActive.ROUTE) {
      if (currentMapData.events && currentMapData.events.length > 0) {
        addEventMarker();
      }
    } else if (
      eventRouteActive &&
      eventRouteActive.longitude &&
      eventRouteActive.latitude &&
      eventRouteActive.wayPoints
    ) {
      const drawPrimaryRoute = [];
      eventRouteActive.route.map(c => drawPrimaryRoute.push([c[0], c[1]]));
      setTimeout(() => {
        addRoute(drawPrimaryRoute, '#000', 2, 'primaryRoute');
        addWaypointMarker(eventRouteActive);
      }, 200);
    }

    // if (
    //   currentMapData.events.customFields &&
    //   currentMapData.events.customFields.length > 0
    // ) {
    //   const customFieldValueandID = getcustomFieldsIdandValue(
    //     currentMapData.events.customFields,
    //     'Event Category'
    //   );
    //   setCommoncustomCategoryValue(customFieldValueandID.value);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMapData]);
  const removeMarkers = () => {
    if (currentMarkers && currentMarkers.length > 0) {
      for (let index = currentMarkers.length - 1; index >= 0; index--) {
        currentMarkers[parseInt(index)].remove();
      }
    }
  };
  let customizeZoom = 0;
  if (singleEventRoute) {
    customizeZoom = 10;
  } else {
    customizeZoom = 1;
  }
  const createMap = () => {
    return new mapboxgl.Map({
      container: mapContainerReference.current,
      style: Config.mapboxDefaultStyle,
      center: currentMapData.center,
      zoom: customizeZoom,
      pitch: currentMapData.pitch || 0,
      bearing: currentMapData.bearing || 0
    });
  };

  const updateMap = () => {
    if (singleEventRoute || currentActivePanel === 'route') {
      map.current.setMaxZoom(15);
      map.current.setMinZoom(0);
    } else {
      map.current.setMaxZoom(22);
      map.current.setMinZoom(-2);
    }
    map.current.setCenter(currentMapData.center);
    map.current.setZoom(customizeZoom);
    map.current.setPitch(currentMapData.pitch);
    map.current.setBearing(currentMapData.bearing);
    map.current.setStyle(Config.mapboxDefaultStyle);
    map.current.easeTo({
      center: currentMapData.center,
      zoom: isMobile ? 0 : customizeZoom
    });
  };
  const addRoute = (coords, color, lineWidth, name) => {
    if (map.current.getSource('route' + name)) {
      map.current.removeLayer('route' + name);
      map.current.removeSource('route' + name);
    } else {
      map.current.addLayer({
        id: 'route' + name,
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': color,
          'line-width': lineWidth,
          'line-opacity': 0.8
        }
      });
    }
  };

  const addEventMarker = () => {
    const boundPoints = [];
    for (const event of currentMapData.events) {
      const marker = {
        type: 'Feature',
        properties: {
          event: event,
          iconSize: [80, 80]
        },
        geometry: {
          type: 'Point',
          coordinates: [event.longitude, event.latitude]
        }
      };
      boundPoints.push([event.longitude, event.latitude]);
      if (event.eventType == 'BrandStore') {
        event.eventType = 'brandStoreEvent';
      } else if (event.eventType == 'Campfire') {
        event.eventType = 'campfireEvent';
      } else if (event.eventType == 'Classic') {
        event.eventType = 'classicEvent';
      } else if (event.eventType == 'Polar') {
        event.eventType = 'polarEvent';
      } else if (event.eventType == 'Store') {
        event.eventType = 'store';
      }
      const eventTypeImageChange = event.eventType;
      const element = document.createElement('div');
      element.className = 'in-map-marker';
      element.style.backgroundImage =
        'url(/assets/images/' + eventTypeImageChange + '.svg)';
      element.style.width = marker.properties.iconSize[0] + 'px';
      element.style.height = marker.properties.iconSize[1] + 'px';
      element.style.backgroundSize = 'cover';
      element.style.backgroundRepeat = 'no-repeat';
      element.style.backgroundPosition = 'center';
      element.style.cursor = 'pointer';

      element.addEventListener('click', () => {
        setSingleEventFocus(marker.properties.event);
      });

      const oneMarker = new mapboxgl.Marker(element)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map.current);
      currentMarkersInner.push(oneMarker);
    }

    setCurrentMarkers(currentMarkersInner);
    if (!currentMapData.focusEvent) {
      setMapBounds(boundPoints);
    }
  };

  const addWaypointMarker = wayPoints => {
    const locationValue = [wayPoints.longitude, wayPoints.latitude];
    if (singleEventRoute) {
      wayPoints = [locationValue];
    } else {
      wayPoints = [locationValue];
    }
    for (const wayPoint of wayPoints) {
      const wayPointMarker = {
        type: 'Feature',
        properties: {
          event: eventRouteActive,
          iconSize: [22, 32]
        },
        geometry: {
          type: 'Point',
          coordinates: wayPoint
        }
      };

      const element = document.createElement('div');
      element.className = 'in-map-way-point-marker';
      element.style.backgroundImage = 'url(/assets/images/waypoint.svg)';
      element.style.width = wayPointMarker.properties.iconSize[0] + 'px';
      element.style.height = wayPointMarker.properties.iconSize[1] + 'px';
      element.style.backgroundSize = 'cover';
      element.style.backgroundRepeat = 'no-repeat';
      element.style.backgroundPosition = 'center';
      element.style.transition = 'transform .2s';
      element.style.cursor = 'pointer';

      element.addEventListener('mouseenter', e => {
        e.target.style.width =
          wayPointMarker.properties.iconSize[0] + 10 + 'px';
        e.target.style.height =
          wayPointMarker.properties.iconSize[1] + 10 + 'px';
      });

      element.addEventListener('mouseleave', e => {
        e.target.style.width = wayPointMarker.properties.iconSize[0] + 'px';
        e.target.style.height = wayPointMarker.properties.iconSize[1] + 'px';
      });

      const oneWayPointMarker = new mapboxgl.Marker(element)
        .setLngLat(wayPointMarker.geometry.coordinates)
        .addTo(map.current);
      currentMarkersInner.push(oneWayPointMarker);
    }

    const bounds = new mapboxgl.LngLatBounds(wayPoints[0], wayPoints[0]);
    for (const coord of wayPoints) {
      bounds.extend(coord);
    }
    map.current.fitBounds(bounds, {
      padding: 100
    });

    setCurrentMarkers(currentMarkersInner);
  };

  const renderPathTrace = (index, coordinates) => {
    if (!map.current) return;

    map.current.jumpTo({
      center: coordinates[0],
      zoom: 12,
      pitch: 50
    });

    let data = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: coordinates
          }
        }
      ]
    };

    data.features[0].geometry.coordinates = [coordinates[0]];

    map.current.addSource('trace' + index, { type: 'geojson', data: data });
    map.current.addLayer({
      id: 'trace' + index,
      type: 'line',
      source: 'trace' + index,
      paint: {
        'line-color': '#B93228',
        'line-opacity': 1,
        'line-width': 4
      }
    });

    let index_ = 0;
    let timer = window.setInterval(() => {
      if (index_ < coordinates.length) {
        data.features[0].geometry.coordinates.push(
          coordinates[parseInt(index_)]
        );
        if (map.current.getSource('trace' + index)) {
          map.current.getSource('trace' + index).setData(data);
        }
        map.current.panTo(coordinates[parseInt(index_)]);
        index_++;
      } else {
        window.clearInterval(timer);
      }
    }, 20);
  };

  const removeSourceLayer = index => {
    if (map.current.getLayer('trace' + index)) {
      map.current.removeLayer('trace' + index);
    }
    if (map.current.getSource('trace' + index)) {
      map.current.removeSource('trace' + index);
    }
    if (map.current.getLayer('route' + index)) {
      map.current.removeLayer('route' + index);
    }
    if (map.current.getSource('route' + index)) {
      map.current.removeSource('route' + index);
    }
  };

  const renderPathTraceStart = () => {
    let index = renderPathTraceIndex;
    let cloneDrawnLine = [...drawnRouteIndexes];
    let localDrawnLine = [...drawnRouteIndexes];
    let anythingGreater = cloneDrawnLine.some(element => element > index - 1);
    if (anythingGreater) {
      for (let item of cloneDrawnLine) {
        if (item && item > index - 1) {
          removeSourceLayer(item);
          const removeIndex = localDrawnLine.indexOf(item);
          if (removeIndex > -1) {
            localDrawnLine.splice(removeIndex, 1);
          }
        }
      }
    }

    if (localDrawnLine.includes(index)) return;

    if (index >= 2) {
      let dLine = 0;
      while (dLine < index - 1) {
        let previousCoordinate = eventRouteActive.routeSplit[parseInt(dLine)];
        if (
          previousCoordinate &&
          previousCoordinate.length > 0 &&
          !localDrawnLine.includes(dLine + 1)
        ) {
          addRoute(previousCoordinate, '#B93228', 4, dLine + 1);
          localDrawnLine.push(dLine + 1);
        }
        dLine++;
      }
    }
    let coordinates = eventRouteActive.routeSplit[index - 1];
    if (coordinates && coordinates.length > 0) {
      localDrawnLine.push(index);

      // const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);
      // for (const coord of coordinates) {
      //   bounds.extend(coord);
      // }
      // map.current.fitBounds(bounds, {
      //   padding: 100
      // });

      renderPathTrace(index, coordinates);
    }

    setDrawnRouteIndexes(localDrawnLine);
  };

  const setMapBounds = points => {
    if (points.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      for (const coord of points) {
        bounds.extend(coord);
      }
      map.current.fitBounds(bounds, {
        padding: 200
      });
    }
  };

  const zoomIn = () => {
    if (map.current) {
      map.current.setZoom(map.current.getZoom() - 1);
    }
  };

  const zoomOut = () => {
    if (map.current) {
      map.current.setZoom(map.current.getZoom() + 1);
    }
  };

  useEffect(() => {
    if (renderPathTraceIndex !== undefined && renderPathTraceIndex > 0) {
      renderPathTraceStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderPathTraceIndex]);

  return (
    <>
      <div className={styles.mapContainer} ref={mapContainerReference} />
      <div className={styles.zoomButtons}>
        <MapZoomButton label={''} onClick={zoomIn} />
        <MapZoomButton label={''} onClick={zoomOut} />
      </div>
    </>
  );
};

export default Map;
