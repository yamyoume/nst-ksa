<?php 
$now = new DateTime();
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>New Style Technology</title>    
  
        <link href="css/style.css" rel="stylesheet">
        <link rel="shortcut icon" type="image/png" href="./images/favicon.png"/>
    </head>

    <body>

        <div id="preloader">
            <div id="preloader-inner"></div>
        </div><!--/preloader-->

        <!-- Site Overlay -->
        <div class="site-overlay"></div>

        <nav class="navbar navbar-expand-lg navbar-light bg-faded nav-sticky rtl">
            <div class="search-inline-rtl">
                <form>
                    <input type="text" class="form-control" placeholder="اكتب ثم اضغط Enter...">
                    <button type="submit"><i class="ti-search"></i></button>
                    <a href="javascript:void(0)" class="search-close"><i class="ti-close"></i></a>
                </form>
            </div><!--/search form-->
            <div class="container">

                <button class="navbar-toggler navbar-toggler-left" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="index.php">
                    <img class='logo logo-dark' src="images/logo.png" alt="" style="max-width: 175px;">
                    <!-- <img class='logo logo-light hidden-md-down' src="images/logo-light.png" alt=""> -->
                </a>
                <div  id="navbarNavDropdown" class="navbar-collapse collapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a href="index.php" class="nav-link">الصفحة الرئيسية</a>
                        </li>                        
                        <li class="nav-item">
                            <a href="index.php#about" class="nav-link" data-scroll>عن الشركة</a>
                        </li>
                        <li class="nav-item">
                            <a href="index.php#services" class="nav-link" data-scroll>الخدمات</a>
                        </li>
                        <li class="nav-item">
                            <a href="index.php#products" class="nav-link" data-scroll>المنتجات</a>
                        </li>
                        <li class="nav-item">
                            <a href="register.php" class="nav-link">تواصل معنا</a>
                        </li>
                        <li class="nav-item">
                            <a href="contact.php" class="nav-link">طلب دعم فني</a>
                        </li>
                    </ul>
                </div>
                <div class=" navbar-left-elements">
                    <ul class="list-inline">
                        <li class="list-inline-item"><a href="javascript:void(0)" class="search-open"><i class="ti-search"></i></a></li>
                    </ul>
                </div><!--right nav icons-->
            </div>
        </nav>

        