<?php
$server = 'localhost';
$username = $_ENV['username'];
$password = $_ENV['password'];
$db = 'movies';

$conn = mysqli_connect($server, $username, $password, $db);

if (!$conn) {
    die('Connection not found.');
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * from movies";
    
    $result = mysqli_query($conn, $sql);
    if (!$result) {
        die('Error reading from sql.');
    }

    $response = [];
    while ($row = $result->fetch_assoc()) {
        array_push($response, [
            'id' => $row['id'],
            'name' => $row['name'],
            'summary' => $row['summary'],
            'genre' => $row['genre'],
            'director' => $row['director'],
            'release_date' => $row['release_date']
        ]);
    }

    echo json_encode($response);
} else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'] ?? '';
    $summary = $_POST['summary'] ?? '';
    $genre = $_POST['genre'] ?? '';
    $director = $_POST['director'] ?? '';
    $release_date = $_POST['release_date'] ?? '';

    $sql = "INSERT INTO movies(name, summary, genre, director, release_date) 
        VALUES('{$name}', '{$summary}', '{$genre}', '{$director}', '{$release_date}')";

    if (!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
    }

    echo 'Inserted successfully.';
} else if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {
    parse_str(file_get_contents('php://input'), $_PATCH);

    $id = $_PATCH['id'] ?? '';
    $name = $_PATCH['name'] ?? '';
    $summary = $_PATCH['summary'] ?? '';
    $genre = $_PATCH['genre'] ?? '';
    $director = $_PATCH['director'] ?? '';
    $release_date = $_PATCH['release_date'] ?? '';

    $sql = "UPDATE movies SET name='{$name}', summary='{$summary}', genre='{$genre}', 
        director='{$director}', release_date='{$release_date}' WHERE id='{$id}'";

    if (!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
    }

    echo 'Updated successfully.';
} else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents('php://input'), $_DELETE);

    $id = $_DELETE['id'] ?? '';

    $sql = "DELETE FROM movies WHERE id='{$id}'";

    if (!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
    }

    echo 'Deleted successfully.';
}

mysqli_close($conn);
?>