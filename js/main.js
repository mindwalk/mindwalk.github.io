$(function(){

  var x=document.getElementById("map");
  function getLocation(callBack){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(callBack);
    } else {
      x.innerHTML="Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    "\nLongitude: " + position.coords.longitude); 
    console.log(position);
    window.karte = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(window.karte);

    // add a marker in the given location, attach some popup content to it and open the popup
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(window.karte)
    .bindPopup('You are here ;)')
    .openPopup();
  } 

  function addCurrentPosition(position) {
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(window.karte)
    .bindPopup('Now we\'re here!')
    .openPopup();
  }

  $("#addPosition").click(function() {
    getLocation(addCurrentPosition);
  });

  getLocation(showPosition);
});
