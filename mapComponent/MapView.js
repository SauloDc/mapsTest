import React, { useEffect, useState } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import map from "./Map";
import { mapPinIcon } from "./mapPinIcon";

const code_to_function = {
  1: clickCallback,
  2: markerCallback,
  3: movementCallback,
};

function clickCallback(payload, props) {
  const cords = JSON.stringify(payload.content);
  props.clickListener(cords);
}

function markerCallback(payload, props) {
  const markerID = JSON.stringify(payload.content);
  props.markersListener(markerID);
}

function movementCallback(payload, props) {
  const movement = JSON.stringify(payload.content);
  props.movementListener(movement);
}

function parseInput(event, props) {
  const payload = JSON.parse(event);
  code_to_function[payload.code](payload, props);
}

async function insertMarker(mapRef, ID, cords, title, color) {
  mapRef.injectJavaScript(`
  var customIcon = L.divIcon({
    className: 'marker-class',
    html: \`<body style="background-color:#fff">${mapPinIcon(color)}</body>\`,
    iconAnchor: [10.5, 37.314],
    popupAnchor: [0, -37.314],
    iconSize: 30
  });

  // Check if there is no other marker with same ID already in map
  if (!(${ID} in markers)) {
    // Creates marker object
    markers[${ID}] = L.marker([${cords.lat}, ${
    cords.long
  }], {icon: customIcon, ID: ${ID}});

    // adicionando popup ao mapa
    markers[${ID}].bindPopup("<b>${title}</b>").openPopup();

    // Add marker to map and bind callback event to its function
    markers[${ID}].addTo(mymap).on('click', onPopupClick);
  }`);
}

function goToPosition(mapRef, lat, long, dist = "20") {
  mapRef.injectJavaScript(`mymap.setView([${lat}, ${long}], ${dist});`);
}

export default function MapView(props) {
  const [mapRef, setMapRef] = useState(null);
  const [finishedLoad, setFinishedLoad] = useState(false);

  props.animateToPosition != null &&
    goToPosition(mapRef, ...props.animateToPosition);

  const onLoad = () => {
    props.markersList != null &&
      props.markersList.length > 0 &&
      props.markersList.map(({ ID, cords, title, color }) =>
        insertMarker(mapRef, ID, cords, title, color)
      );
  };

  useEffect(() => {
    mapRef != null && onLoad();
  }, [finishedLoad]);

  return (
    <View style={{ marginTop: 45 }} flex={1}>
      <WebView
        ref={(webViewRef) => {
          setMapRef(webViewRef);
        }}
        onMessage={(event) => {
          parseInput(event.nativeEvent.data, props);
        }}
        javaScriptEnabled={true}
        source={{ html: map }}
        onLoad={() => {
          setFinishedLoad(true);
        }}
      />
    </View>
  );
}
