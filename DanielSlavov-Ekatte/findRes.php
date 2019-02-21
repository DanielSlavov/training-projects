<?php
$conn = pg_connect("host=localhost port=5432 dbname=ekatte user=postgres password=pass");
$str=$_GET["str"];
$query = "SELECT id,type,name FROM places WHERE LOWER(name) LIKE $1 OR LOWER(name) LIKE $2";
if($str=="") die;
$escaped = str_replace('%','\%',$str);
$escaped = str_replace('_','\_',$escaped);

$result=pg_query_params($conn,$query,array($escaped."%","% ".$escaped."%"));
$arr=[];
while($row = pg_fetch_assoc($result))
{
        array_push($arr,$row["name"]);
}
echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?> 