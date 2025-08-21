<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$input = json_decode(file_get_contents('php://input'), true);
$email = strtolower(trim($input['email'] ?? ''));
$motdepasse = $input['motdepasse'] ?? '';

if (!$email || !$motdepasse) {
  echo json_encode(['success' => false, 'message' => 'Email et mot de passe requis']);
  exit;
}

$usersPath = __DIR__ . '/users.json';
if (!file_exists($usersPath)) { file_put_contents($usersPath, json_encode([])); }
$users = json_decode(file_get_contents($usersPath), true) ?: [];

foreach ($users as $user) {
  if (strtolower($user['email'] ?? '') === $email) {
    if (($user['motdepasse'] ?? '') === $motdepasse) {
      $responseUser = $user;
      unset($responseUser['motdepasse']);
      echo json_encode(['success' => true, 'utilisateur' => $responseUser]);
      exit;
    } else {
      echo json_encode(['success' => false, 'message' => 'Mot de passe invalide']);
      exit;
    }
  }
}

echo json_encode(['success' => false, 'message' => 'Utilisateur introuvable']);