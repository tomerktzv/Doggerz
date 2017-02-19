<?php
    include('db.php');
    $userName = $_POST['ID'];
    $query = "SELECT Age, Address, Job from tbl_users_218 where name like '%yos%'";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die("DB query failed.");
    }
    while ($yossi = mysqli_fetch_assoc($result)) {
        echo $yossi['Age'] . ',';
        echo $yossi['Address'] . ',';
        echo $yossi['Job'];
    }
    mysqli_close($connection);
?>