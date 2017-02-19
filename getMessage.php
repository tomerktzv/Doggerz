<?php
    include('db.php');
    $toID = $_POST['toID'];
    $query = "SELECT m. * , u.Name FROM tbl_messages_218 AS m INNER JOIN tbl_users_218 AS u ON m.fromID = u.ID AND m.fromID = 321";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die("DB query failed.");
    }
    while ($rate = mysqli_fetch_assoc($result)) {
        echo $rate['fromID'] . ',';
        echo $rate['toID'] . ',';
        echo $rate['message'] . ',';
        echo $rate['date'] . ',';
        echo $rate['time'] . ',';
        echo $rate['rate'] . ',';
        echo $rate['Name'];
    }
    mysqli_close($connection);
?>