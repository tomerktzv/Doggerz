<?php
    include('db.php');
    $userName = $_POST['ID'];
    $query = "SELECT r . * , u.Name FROM tbl_rating_218 AS r INNER JOIN tbl_users_218 AS u ON r.id = u.ID";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die("DB query failed.");
    }
    while ($rate = mysqli_fetch_assoc($result)) {
        echo $rate['id'] . ',';
        echo $rate['total'] . ',';
        echo $rate['responsible'] . ',';
        echo $rate['good_with_dogs'] . ',';
        echo $rate['trust_worthy'] . ',';
        echo $rate['Name'];
    }
    mysqli_close($connection);
?>