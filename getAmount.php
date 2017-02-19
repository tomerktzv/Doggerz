<?php
    include('db.php');
    $userName = $_POST['ID'];
    $query = "SELECT count(*) as Count FROM tbl_users_218 where ID !=" . $userName;
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die("DB query failed.");
    }
    $count = mysqli_fetch_assoc($result);
    echo $count['Count'];
    mysqli_close($connection);
?>