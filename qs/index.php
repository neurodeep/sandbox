<?php include_once 'locale/common.php' /*TODO lib/ */ ?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="author" content="Nikolay Morozov">

    <title><?php echo $lang['TITLE']?></title>

    <!-- Google Fonts -->
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400">
    
    <!-- Bootstrap -->
    <!-- <link href="css/bootstrap.min.css" rel="stylesheet"> -->

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">

    <!-- Custom styles -->
    <link href="css/non-responsive.css" rel="stylesheet">
    <link href="css/custom.css" rel="stylesheet">
    <link href="css/player.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>

  <div id="preload">
  <?php foreach (array_diff(scandir('img'), array('..', '.')) as $image) { ?>
    <img src="img/<?php echo $image?>"/>
  <?php } ?>
  </div>

  <div id="header">
    <div class="container">
      <ul class="nav nav-justified" role="tablist">
        <li class="active text-uppercase"><a href="#home" role="tab" data-toggle="tab"><span><?php echo $lang['NAV_HOME']?><span></a></li>
        <li class="text-uppercase"><a href="#requirements" role="tab" data-toggle="tab"><span><?php echo $lang['NAV_REQUIREMENTS']?><span></a></li>
        <li><span class="buffer"/></li>
        <li class="text-uppercase"><a href="#contact-us" role="tab" data-toggle="tab"><span><?php echo $lang['NAV_CONTACT_US']?><span></a></li>
        <li class="text-uppercase"><a href="#share" role="tab" data-toggle="tab"><span><?php echo $lang['NAV_SHARE']?><span></a></li>
      </ul>
    </div>
  </div> <!-- /header -->

  <!-- Tab panes -->
  <div class="container content tab-content">

    <div class="tab-pane fade in active" id="home">
      <p class="text-justify"><?php echo $lang['CONTENT_HOME'] ?></p>
      <div id="player">
        <div class="sc-player">
          <a href="https://soundcloud.com/qs-production/sets/mixing-and-mastering"></a>
          <a href="https://soundcloud.com/qs-production/sets/audio-content"></a>
        </div>
      </div>
    </div>

    <div class="tab-pane fade" id="requirements">
      <h1 class="text-center"><?php echo $lang['NAV_REQUIREMENTS']?></h1>
      <p class="text-justify"><?php echo $lang['CONTENT_REQUIREMENTS'] ?></p>
    </div>

    <div class="tab-pane fade" id="contact-us">
      <h1 class="text-center"><?php echo $lang['NAV_CONTACT_US']?></h1>
      <p class="text-justify"><?php echo $lang['CONTENT_CONTACT_US'] ?></p>
    </div>

    <div class="tab-pane fade" id="share">
      <h1 class="text-center"><?php echo $lang['NAV_SHARE']?></h1>
      <p class="text-justify"><?php echo $lang['CONTENT_SHARE'] ?></p>
    </div>

  </div> <!-- /tab-content -->
  
  <div id="footer">
    <div class="top"></div>
    <div class="container">
      <span id="footer-copyright"><a href="https://vk.com/roman.qspro"><?php echo $lang['FOOTER_COPY'] . ' &copy;' ?></a></span>
      <ul id="footer-social" class="list-inline pull-right" >
        <li><div class="language"><a href="http://95.85.30.106/qs/?lang=<?php echo $lang['SECONDARY'] ?>"><?php echo $lang['SECONDARY'] ?></a></div></li>
        <li><a href="https://vk.com/qsproduction"><img src="img/footer-vk.png"></a></li>
        <li><a href="#"><img src="img/footer-facebook.png"></a></li>
        <li><a href="https://www.youtube.com/channel/UCIpUVJqz7qRhbgYHnXU3B0w"><img src="img/footer-youtube.png"></a></li>
        <li><a href="https://soundcloud.com/qs-production"><img src="img/footer-soundcloud.png"></a></li>
        <li><a href="https://plus.google.com/100840494721578523381"><img src="img/footer-google.png"></a></li>
      </ul>
    </div>
  </div>

    <!-- jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    
    <!-- Local Bootstrap -->
    <!-- <script src="js/bootstrap.min.js"></script> -->

    <!-- Latest compiled and minified JavaScript -->
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

    <!-- Lang Vars -->
    <script type="text/javascript">
      var title_first  = <?php echo json_encode($lang['CONTENT_HOME_TITLE_FIRST']); ?>;
      var title_second = <?php echo json_encode($lang['CONTENT_HOME_TITLE_SECOND']); ?>;
    </script>

    <!-- Custom scripts-->
    <script type="text/javascript" src="js/soundcloud.player.api.js"></script>
    <script type="text/javascript" src="js/sc-player.js"></script>
    <script type="text/javascript" src="js/jquery.slimscroll.js"></script>
    <script type="text/javascript" src="js/custom.js"></script>

  </body>
</html>
