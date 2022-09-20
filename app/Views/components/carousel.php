<div class="banner-container">
    <style>
    .banner-container {
        width: 100vw;
        height: fit-content;
        overflow: hidden;
    }

    .banner {
        width: calc(100vw*4);
        height: 100%;
        display: flex;
        animation: animation1 10s infinite;
        /*기본 전환 animation을 위한 설정*/
        -webkit-transition: all 0.5s cubic-bezier(1, .01, .32, 1);
        -moz-transition: all 0.5s cubic-bezier(1, .01, .32, 1);
        -o-transition: all 0.5s cubic-bezier(1, .01, .32, 1);
        -ms-transition: all 0.5s cubic-bezier(1, .01, .32, 1);
        transition: all 0.5s cubic-bezier(1, .01, .32, 1);
    }

    .banner>div {
        width: 100vw;
        height: 100%;
    }

    .banner>div:nth-child(1) {
        background-color: transparent;
    }

    .banner>div:nth-child(2) {
        background-color: transparent;
    }

    .banner>div:nth-child(3) {
        background-color: transparent;
    }

    .banner>div:nth-child(4) {
        background-color: transparent;
    }

    .list-button {
        width: 100%;
        height: 10px;
        display: flex;
        justify-content: center;
        margin-top: -30px;
        position: absolute;
        z-index: 2;
    }

    .list-button-item {
        width: 10px;
        height: 10px;
        border-radius: 5rem;
        background-color: black;
        cursor: pointer;
        display: inline-block;
        margin: 6px;
    }

    .list-button-item.active {
        background-color: white;
    }

    @keyframes animation1 {
        0% {
            margin-left: 0
        }

        20% {
            margin-left: 0
        }

        25% {
            margin-left: -100%
        }

        45% {
            margin-left: -100%
        }

        50% {
            margin-left: -200%
        }

        70% {
            margin-left: -200%
        }

        75% {
            margin-left: -300%
        }

        95% {
            margin-left: -300%
        }

        100% {
            margin-left: 0
        }
    }

    @keyframes animation2 {
        0% {
            margin-left: -100%
        }

        20% {
            margin-left: -100%
        }

        25% {
            margin-left: -200%
        }

        45% {
            margin-left: -200%
        }

        50% {
            margin-left: -300%
        }

        70% {
            margin-left: -300%
        }

        75% {
            margin-left: 0
        }

        95% {
            margin-left: 0
        }

        100% {
            margin-left: -100%
        }
    }

    @keyframes animation3 {
        0% {
            margin-left: -200%
        }

        20% {
            margin-left: -200%
        }

        25% {
            margin-left: -300%
        }

        45% {
            margin-left: -300%
        }

        50% {
            margin-left: 0
        }

        70% {
            margin-left: 0
        }

        75% {
            margin-left: -100%
        }

        95% {
            margin-left: -100%
        }

        100% {
            margin-left: -200%
        }
    }

    @keyframes animation4 {
        0% {
            margin-left: -300%
        }

        20% {
            margin-left: -300%
        }

        25% {
            margin-left: 0
        }

        45% {
            margin-left: 0
        }

        50% {
            margin-left: -100%
        }

        70% {
            margin-left: -100%
        }

        75% {
            margin-left: -200%
        }

        95% {
            margin-left: -200%
        }

        100% {
            margin-left: -300%
        }
    }
    </style>
    <div class="banner">
        <div data-index=1 class="text-white">Hello</div>
        <div data-index=2 class="text-white">There</div>
        <div data-index=3 class="text-white">Friends</div>
        <div data-index=4 class="text-white">Wazzup</div>
    </div>
</div>
<div class="list-button">
    <span class="list-button-item active"></span>
    <span class="list-button-item"></span>
    <span class="list-button-item"></span>
    <span class="list-button-item"></span>
    <script>
    let interval;
    let activeIndex = 1;

    $(document).ready(function() {
        interval = setInterval(changeActiveIndex, 2500);
        $('.list-button-item').on('click', function() {
            // list button의 색상 변경
            const index = $(this).index();
            activeIndex = index;
            changeActiveIndex();
            clearInterval(interval);
            // animation 재설정을 위해 animation을 잠시 제거한다.
            $('.banner').css('animation', 'none');
            // animation 재설정
            $('.banner').animate({
                marginLeft: `${-100*index}%`
            }, 1, function() {
                //1초의 시간 여유(해당 이미지로 이동하는 animation을 위한 시간)를 두고 다시 animation을 설정한다.
                setTimeout(function() {
                    $('.banner').css('animation', `animation${index+1} 10s infinite`)

                    interval = setInterval(changeActiveIndex, 2500);
                }, 1000)
            })
        })
    })

    function changeActiveIndex() {
        if (activeIndex > 3) {
            activeIndex %= 4;
        }
        changeActiveBtn();
        activeIndex += 1;
    }

    function changeActiveBtn() {
        $('.list-button-item').removeClass('active');
        $(`.list-button span:eq(${activeIndex})`).addClass('active');
    }
    </script>
</div>