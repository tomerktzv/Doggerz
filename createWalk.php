<?php
    include('db.php');
    $Start = $_POST['Start'];
    $UserID = $_POST['UserID'];
    $Radius = $_POST['Radius'];
    $MaxDogs = $_POST['MaxDogs'];
    $SignedDogs = $_POST['SignedDogs'];
    $StartTime = $_POST['StartTime'];
    $length = $_POST['length'];
    $query = "INSERT INTO tbl_walk_218 VALUES ('$Start', '$UserID', '$Radius', '$MaxDogs', '$SignedDogs', '$StartTime', '$length')";
    if (mysqli_query($connection, $query)) {
        echo "New record created successfully";
    }
    else {
        echo "Error: " . $query . "<br>" . mysqli_error($connection);
    }
    mysqli_close($connection);
?>