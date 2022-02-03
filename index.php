<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <title>Document</title>
</head>

<body>
    <div>
        <button id="settings_button" class="fas fa-cog action-btn"></button>
    </div>

    <div class="music-container" id="music-container">
        <div class="music-info">
            <h4 id="title">uekelele</h4>
            <div class="progress-container" id="progress-container">
                <div class="progress" id="progress"></div>
            </div>
        </div>

        <audio src="./music/ukulele.mp3" id="audio"></audio>
        <div class="img-container">
            <img src="images/ukulele.jpg" alt="music-cover" id="cover">
        </div>
        <div class="navigation">
            <button id="prev" class="action-btn">
                <i class="fas fa-backward"></i>
            </button>
            <button id="play" class="action-btn action-btn-big">
                <i class="fas fa-play"></i>
            </button>
            <button id="next" class="action-btn">
                <i class="fas fa-forward"></i>
            </button>
            <button id="shuffle" class="action-btn">
                <i class="fas fa-random"></i>
            </button>
            <button id="volume" class="action-btn" style="position: relative; right:0;">
                <i class="fas fa-volume-up"></i>
            </button>
            <div id="progress_volume_container">
                <div id="progress_volume">
                    <div class="progressed_volume">

                    </div>
                </div>
            </div>

        </div>


    </div>
    <div>
        <input type="text" id="song_search">
        <button>ALL</button>
    </div>
    <div id="lista"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js"></script>
    <script src="./js.js"></script>

</body>

</html>