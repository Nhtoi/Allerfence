let map = document.getElementById("map")

map.innerHTML =  '<script async defer src="https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&callback=initMap"> </script>'

function initMap(){
    var location = {lat: 36.066960, lng: -79.818660};
    var map = new google.maps.Map(document.getElementById("map"), { 
        zoom: 10,
        center: location
    });
    //where the red marker will display, we can make this like a random location for our "company"
    var marker = new google.maps.Marker({
        position: location,
        map: map
    })
}

/* 
NAVBAR FEATURES
Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }