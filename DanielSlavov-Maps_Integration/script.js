
console.log("script loaded")
// AIzaSyBJZOSZD24MoGPxeR3ZJtOhd_4yWWmS-MM 

var map;
var markers=[];
var rectangle=false;
var byCountry=false;
var byCity=false;

function initMap() {
console.log("initMap called")
  var NY = {lat: 40.741895, lng: -73.989308};
    map = new google.maps.Map(
      document.getElementById('map'), {zoom: 3,center: {lat: 12, lng: 12},});

 
}
function removeMarkers(){
  for(var i=0;i<markers.length;i++)
  {
    markers[i].setMap(null);
  }
}
function filterByCountry()
{
  if(rectangle)
  {
    rectangle.setMap(null);
  }
  rectangle=false;
  byCountry=document.getElementById("byCountry").value;
  loadMarkers();
}
function applyFilters()
{
  byCountry=document.getElementById("byCountry").value;
  byCity = document.getElementById("byCity").value;
  if(rectangle){
    rectangle.setMap(null)
    rectangle = false;
  }

  var west=document.getElementById("west").value;
  var north=document.getElementById("north").value;
  var east=document.getElementById("east").value;
  var south=document.getElementById("south").value;
  
    
  if(west&&north&&east&&south)
  {
    console.log(west&&north&&east&&south)
    var bounds = {
        north: Number(north),//52.599,
        south: Number(south),//40.490,
        east: Number(east),//-74.443,
        west: Number(west),//-85.649
      };
      rectangle = new google.maps.Rectangle({
        bounds: bounds,
        editable: false,
        draggable:false
      });
      
      rectangle.setMap(map);
      google.maps.event.addListener(rectangle, 'dragend', function(evt){
        loadMarkers();
    });
  }
    
      loadMarkers();

}
function loadMarker(marker)
{
  var contentString="<b>"+marker["title"]+"</b></br>"+marker["country"]+"<br>"+marker["position"].lat()+"<br>"+marker["position"].lng();

    var infowindow = new google.maps.InfoWindow({
        content:contentString
      });
    marker.setMap(map);
    marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
}


function loadMarkers()
{
  var maxCount=markers.length;
  var count=0;
  removeMarkers();
  

      for(var i=0;i<maxCount;i++)
      {
        //var condition=true;
        if(rectangle)
        {
          if(!(markers[i]["position"].lat()>=rectangle["bounds"]["ma"]["j"] && 
          markers[i]["position"].lat()<=rectangle["bounds"]["ma"]["l"] &&
          markers[i]["position"].lng()>=rectangle["bounds"]["ga"]["j"] &&
          markers[i]["position"].lng()<=rectangle["bounds"]["ga"]["l"]))
          {
            continue;
          }
        }
        if(byCountry)
        {
          if(markers[i]["country"]!=byCountry){
            continue;
          }
        }
        if(byCity)
        {
          if(markers[i]["title"]!=byCity)
          continue;
        }
        count++;
        loadMarker(markers[i]);
      
    
  }
  document.getElementById("numberOfPoints").innerText="Showing "+count+" points";

   
}
var oReq = new XMLHttpRequest();

oReq.onload = function() {
    var markersData = JSON.parse(this.responseText.slice(0,-2)+"]")
    var count=markersData.length
    for(var i =0 ;i < count;i++)
    {
        markersData[i]["lat"]=Number( markersData[i]["lat"]);
        markersData[i]["lng"]=Number( markersData[i]["lng"]);
        markers.push(new google.maps.Marker({position:markersData[i],country:markersData[i]["country"],title:markersData[i]["name"]}))
        //loadMarker(markers[i]);
    } 
    //markers.splice(0,11000)
    let countries=Array.from(new Set(markers.map(a=>a.country)));
    console.log($("byCountry"))
    $("#byCountry").autocomplete({
      source:countries,
      minLength: 0,
      select: function(event, ui) {
          event.preventDefault();
          $("#byCountry").val(ui.item.label);
      }
    });
    $("#byCountry").keyup(function()
    {
      let country=$("#byCountry").val();
      console.log(country)
      let cities=Array.from(new Set(markers.filter((a)=>{
        if(a.country==country)
          return a;
    }).map(a=>a.title)));
      console.log(cities);
      $("#byCity").autocomplete({
        source:cities,
        minLength: 0,
        select: function(event, ui) {
            event.preventDefault();
            $("#byCity").val(ui.item.label);
        }
      });
    })
    //loadMarkers();
};

oReq.open("get", "../../get_markers.php", true);
oReq.send();
