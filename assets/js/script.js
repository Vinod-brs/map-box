mapboxgl.accessToken = 'pk.eyJ1IjoicGFyaXNyaSIsImEiOiJja2ppNXpmaHUxNmIwMnpsbzd5YzczM2Q1In0.8VJaqwqZ_zh8qyeAuqWQgw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/' + (localStorage.getItem('layer') || 'streets-v11'),
    center: [80.18536880746353, 16.501575031841256],
    zoom: 13
}
);

    document.getElementById('L' + (localStorage.getItem('layer') || 'streets-v11')).style.backgroundColor='#4a970a';
    document.getElementById('L' + (localStorage.getItem('layer') || 'streets-v11')).style.color="white";
    document.getElementById(localStorage.getItem('layer') || 'streets-v11').checked=true;

    document.getElementById("info").innerHTML = "<h6>Geographical information</h6>{lng:80.18536880746353,lat:16.501575031841256}";

// Add the control to the map.
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Search any place on the planet'

});
// Add the control to the map.
var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});

// Add the control to the map.
map.addControl(geolocate);
map.on("load", function() {
    geolocate.trigger();
});
map.on("mousemove", function(e) {
    document.getElementById("info").innerHTML =
        //Capturing Mouse move to find latitude & Logitude
        "<h6>Geographical information</h6>" +
        
        JSON.stringify(e.lngLat.wrap());
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
// eslint-disable-next-line no-undef
map.addControl(new mapboxgl.FullscreenControl());

// Initialize the geolocate control.
var marker = new mapboxgl.Marker({
        draggable: true
    })
    .setLngLat([0, 0])
    .addTo(map);
function onDragEnd() {
    var lngLat = marker.getLngLat();
    coordinates.style.display = "block";
    coordinates.innerHTML =
        "Longitude: " + lngLat.lng + "<br />Latitude: " + lngLat.lat;
}
marker.on("dragend", onDragEnd);
var layerList = document.getElementById("menu");
var inputs = layerList.getElementsByTagName("input");

function switchLayer(layer) {
    console.log('L'+layer.target.id)
    var layerId = layer.target.id;

    document.getElementById('Lstreets-v11').style.backgroundColor="#055ba600";
    document.getElementById('Llight-v10').style.backgroundColor="#055ba600";
    document.getElementById('Ldark-v10').style.backgroundColor="#055ba600";
    document.getElementById('Loutdoors-v11').style.backgroundColor="#055ba600";
    document.getElementById('Lsatellite-v9').style.backgroundColor="#055ba600";

    document.getElementById('Lstreets-v11').style.color="black";
    document.getElementById('Llight-v10').style.color="black";
    document.getElementById('Ldark-v10').style.color="black";
    document.getElementById('Loutdoors-v11').style.color="black";
    document.getElementById('Lsatellite-v9').style.color="black";
    
    document.getElementById('L'+layerId).style.backgroundColor='#4a970a';
    document.getElementById('L'+layerId).style.color="white";
    localStorage.setItem('layer', layerId);
    map.setStyle("mapbox://styles/mapbox/" + layerId);
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}


document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

function setTheme(theme) {
    document.documentElement.style.setProperty('--primary-color', theme);
    localStorage.setItem('cc-theme', theme);
}

setTheme(localStorage.getItem('cc-theme') || '#1A4B84');