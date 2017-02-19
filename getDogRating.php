<?php
    include('db.php');
    $userName = $_POST['ID'];
    $query = "SELECT r . * , d.Name FROM tbl_dogs_rating_218 AS r INNER JOIN tbl_dogs_218 AS d ON r.dogID = d.DogID";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die("DB query failed.");
    }
    while ($rate = mysqli_fetch_assoc($result)) {
        echo $rate['dogID'] . ',';
        echo $rate['total'] . ',';
        echo $rate['trained'] . ',';
        echo $rate['behaviour'] . ',';
        echo $rate['friendly'] . ',';
        echo $rate['Name'];
    }
    mysqli_close($connection);
?>