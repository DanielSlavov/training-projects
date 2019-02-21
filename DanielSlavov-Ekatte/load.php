<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 'On');


require 'vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\Spreadsheet;

$conn = pg_connect("host=localhost port=5432 dbname=ekatte user=postgres password=pass");

function insertRow_Places($conn,$row)
{   
    if(!$conn){return;}
    $query="INSERT INTO places (id,type,name,mun_code) VALUES (" . $row[0].",'".$row[1]."','".$row[2]."','".$row[4]."')";
    pg_query($conn,$query);
}

function insertRow_Areas($conn,$row)
{
    if(!$conn){return;}
    $query="INSERT INTO areas (area_code,name) VALUES ('" . $row[0] . "','" .$row[2]. "')";
    pg_query($conn,$query);
}

function insertRow_Mun($conn,$row)
{
    if(!$conn){return;}
    $area_code=mb_substr($row[0],0,3);
    $query="INSERT INTO municipalities (mun_code,name,area_code) VALUES ('" . $row[0] . "','".$row[2]."','".$area_code."')";
    pg_query($conn,$query);
}

function readRows($conn,$filePath,$function)
{
    $sheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($filePath);
    $worksheet = $sheet->getActiveSheet();
    if(!$worksheet) return;

    $isFirst=true;
    foreach ($worksheet->getRowIterator() as $row) {
        if($isFirst){
            $isFirst=false;
            continue;
        }
        $cellIterator = $row->getCellIterator();
        $cellIterator->setIterateOnlyExistingCells(FALSE);
        $rowAsArray=[];
        foreach ($cellIterator as $cell) {
            array_push($rowAsArray, $cell->getValue());
        }
        $function($conn,$rowAsArray);
     }
}

function rowsToArray($conn,$table)
{
    if(!$conn || !$table){return;}
    $query="SELECT * FROM ".$table;
    $result=pg_query($conn,$query);
    $arr=[];
    $i=0;
    while($row = pg_fetch_assoc($result))
    {
        array_push($arr,$row);
    }
    return $arr;
}

function countRows($conn,$table)
{
   // if(!$conn || !$table){return;}

    $query="SELECT count(*) FROM " .$table;
    $result=pg_query($conn,$query);
    return pg_fetch_assoc($result)["count"];
}

readRows($conn,"./xls/Ek_atte.xls","insertRow_Places");
//readRows($conn,"./xls/Ek_obst.xls","insertRow_Mun");
//readRows($conn,"./xls/Ek_obl.xls","insertRow_Areas");

$obj;
$obj->{"places_count"}=countRows($conn,"places");
$obj->{"mun_count"}=countRows($conn,"municipalities");
$obj->{"areas_count"}=countRows($conn,"areas");
echo json_encode($obj,JSON_UNESCAPED_UNICODE);

?>