<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$input = json_decode(file_get_contents('php://input'), true);
$email = strtolower(trim($input['email'] ?? ''));
$nom = trim($input['nom'] ?? '');
$motdepasse = $input['motdepasse'] ?? '';

if (!$email || !$nom || !$motdepasse) {
  echo json_encode(['success' => false, 'message' => 'Champs requis manquants']);
  exit;
}

$usersPath = __DIR__ . '/users.json';
if (!file_exists($usersPath)) { file_put_contents($usersPath, json_encode([])); }
$users = json_decode(file_get_contents($usersPath), true) ?: [];

foreach ($users as $user) {
  if (strtolower($user['email'] ?? '') === $email) {
    echo json_encode(['success' => false, 'message' => 'Email déjà utilisé']);
    exit;
  }
}

$record = [
  'email' => $email,
  'nom' => $nom,
  'motdepasse' => $motdepasse,
  'date_de_naissance' => $input['date_de_naissance'] ?? '',
  'genre' => $input['genre'] ?? 'Autre',
  'telephone' => $input['telephone'] ?? ''
];
$users[] = $record;
file_put_contents($usersPath, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true]);