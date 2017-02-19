<?php
    include('db.php');
    $userName = $_POST['ID'];
    $query = "SELECT Name, Breed, Age from tbl_dogs_218 where name like '%lou%'";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die("DB query failed.");
    }
    while ($param = mysqli_fetch_assoc($result)) {
        echo $param['Name'] . ',';
        echo $param['Breed'] . ',';
        echo $param['Age'];
    }
    mysqli_close($connection);
?>