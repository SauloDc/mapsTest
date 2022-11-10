import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "./mapComponent/MapView";
import MapPin from "./mapComponent/mapPin";

export default function App() {
  const [position, setPosition] = useState(null);
  const [clickListener, setClickListener] = useState("");
  const [markersListener, setMarkersListener] = useState("");
  const [movementListener, setMovementListener] = useState("");

  const markers = [
    {
      ID: "1",
      title: "1 - Sugestão - Casa da Lívia",
      color: "#368c07",
      cords: {
        lat: -3.68782,
        long: -40.36626,
      },
    },

    {
      ID: "2",
      title: "2 - Reclamação - Prefeitura de Sobral",
      color: "#db2121",
      cords: {
        lat: -3.683866,
        long: -40.35617,
      },
    },
  ];

  const handleClick = (coordenadas) => {
    let coords = JSON.parse(coordenadas);
    setPosition([coords.latitude, coords.longitude, coords.zoom]);
  };

  return (
    <View style={styles.container}>
      <MapView
        animateToPosition={position}
        clickListener={(coords) => {
          setClickListener(coords);
          handleClick(coords);
        }}
        movementListener={(posAndZoom) => {
          setMovementListener(posAndZoom);
          setPosition(posAndZoom);
          console.log(posAndZoom);
          console.log(position);
        }}
        markersListener={setMarkersListener}
        markersList={markers}
      />
      <View
        style={{
          width: 10,
          height: 10,
          backgroundColor: "blue",
          position: "absolute",
          top: "50%",
          left: "50%",
          marginLeft: -5,
          marginTop: -5,
        }}
      ></View>
      {/* <MapPin /> */}
      <View>
        <Text style={styles.txt}>{position}</Text>
        <Text style={[styles.txt, { marginTop: 20 }]}>
          Marker ID triggered by onPopupClick: {markersListener}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  txt: {
    color: "black",
  },
});
