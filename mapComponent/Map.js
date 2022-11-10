import leafletJs from "./leafletJs";
import leafletCss from "./leafletCss";
export default map = String.raw`
<!DOCTYPE html>
<html>
<head>
	<title>Mobile tutorial - Leaflet</title>

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />

    <style> ${leafletCss} </style>	
	<script> ${leafletJs} </script>

	<style>
		html, body {
			height: 100%;
			margin: 0;
		}
		#map {
			width: 600px;
			height: 400px;
		}
	</style>

	<style>body { padding: 0; margin: 0; } #map { height: 100%; width: 100vw; }</style>
</head>
<body>

<div id='map'></div>

<script>
	var mymap = L.map('map').setView([-3.683866, -40.356170], 15);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2FicmllbC10cmV0dGVsIiwiYSI6ImNrb2RjNWIzYjAwczIyd25yNnUweDNveTkifQ.xRASmGTYm0ieS-FjVrXSjA', {
	//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 21,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);

    var markers = {};

	var popup = L.popup();

	function onMapClick(e) {
		var payload = {
			code: 1,
			content: {
				latitude: e.latlng.lat.toString().slice(0,8),
				longitude: e.latlng.lng.toString().slice(0,8),
				zoom: mymap.getZoom(),
			}
		}
		window.ReactNativeWebView.postMessage(JSON.stringify(payload));
	}

	function onPopupClick(e) {
		var payload = {
			code: 2,
			content: this.options.ID,
		};
		window.ReactNativeWebView.postMessage(JSON.stringify(payload));
	}

	function onMapMove(e) {
		var payload = {
			code: 3,
			content: {
				latitude: mymap.getCenter().lat.toString().slice(0,8),
				longitude: mymap.getCenter().lng.toString().slice(0,8),
				zoom: mymap.getZoom(),
			}
		};
		window.ReactNativeWebView.postMessage(JSON.stringify(payload));
	}

	mymap.on("popupopen", onPopupClick);
	mymap.on('click', onMapClick);
	mymap.on('moveend', onMapMove);
</script>
</body>
</html>
`;
