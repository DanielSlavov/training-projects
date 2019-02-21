<?php
ini_set("serialize_precision", -1);
ini_set('precision',17);


$conn = new mysqli("localhost", "wpuser", "pass","wordpress");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


function fetch($conn,$count=0){
    $json = file_get_contents('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_admin_1_label_points.geojson');
    $pointArray=json_decode($json)->{'features'};
    
    //$conn->query("DELETE FROM map_markers");

    $insertExample="INSERT IGNORE INTO map_markers(id,name,country,lat,lng) VALUES(";
    
    foreach($pointArray as $current)
    {
        //$current=$pointArray[$i];
        $query = $insertExample.$current->{"properties"}->{"OBJECTID_1"}.",\"".$current->{"properties"}->{"name"}.
        "\",\"".$current->{"properties"}->{"admin"}."\",".$current->{"geometry"}->{"coordinates"}[0].",".$current->{"geometry"}->{"coordinates"}[1].")";
        $conn->query($query);
    }
}


fetch($conn);

$sql = "SELECT * FROM map_markers";
echo "[";

$result = mysqli_query($conn,$sql);
while($row=$result->fetch_assoc())
{
    echo json_encode($row);
    echo ",";
}
echo "]";
?>