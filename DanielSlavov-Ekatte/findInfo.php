<?php
// select P.type, P.name, M.name, A.name from places P 
// full outer join municipalities M on M.mun_code = P.mun_code
// full outer join areas A on A.area_code = M.area_code
// where P.id=68850;

$conn = pg_connect("host=localhost port=5432 dbname=ekatte user=postgres password=pass");
$name=$_GET["name"];
$query = "SELECT P.type, P.name, M.name as mun_name, A.name as area_name from places P 
full outer join municipalities M on M.mun_code = P.mun_code
full outer join areas A on A.area_code = M.area_code
WHERE LOWER(P.name) LIKE $1 OR LOWER(P.name)=$2";
$result=pg_query_params($conn,$query,array("%".$name." %",$name));
$arr=[];
while($row = pg_fetch_assoc($result))
{
        array_push($arr,$row);
}
echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?> 
