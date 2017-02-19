<?php
    include('db.php');
    $fromID = $_POST['fromID'];
    $toID = $_POST['toID'];
    $message = $_POST['message'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $rate = $_POST['rate'];
    $query = "INSERT INTO tbl_messages_218 VALUES ('$fromID', '$toID', '$message', '$date', '$time', '$rate')";
    if (mysqli_query($connection, $query)) {
        echo "New record created successfully";
    }
    else {
        echo "Error: " . $query . "<br>" . mysqli_error($connection);
    }
    mysqli_close($connection);
?>