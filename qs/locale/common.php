<?php
$lang['CURRENT'] = '';

if (isset($_GET['lang'])) {
  $lang['CURRENT'] = $_GET['lang'];
  setcookie('qs_lang', $lang['CURRENT']);
} else if (isset($_COOKIE['qs_lang'])) {
  $lang['CURRENT'] = $_COOKIE['qs_lang'];
} else {
  $lang['CURRENT'] = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
}

switch ($lang['CURRENT']){
  case 'ru':
    $lang['SECONDARY'] = 'en';
    include('lang.ru.php');
    break;
  case 'en':
  default:
    $lang['SECONDARY'] = 'ru';
    include('lang.en.php');
    break;
}
