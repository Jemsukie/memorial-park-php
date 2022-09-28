<div class='container'>
    <div id='map-container'></div>
    <p id='position-handler'></p>


    <script src='https://memorial-park.000webhostapp.com/create-memorial-map.js'></script>
    <script>
        const mapContainer = document.querySelector('#map-container')
        const positionHandler = document.querySelector('#position-handler')

        mapContainer.addEventListener('mousemove', e => {
            // console.log(e)
            if (!chart.lbl) {
                chart.lbl = chart.renderer.text('', 0, 0)
                    .attr({
                        zIndex: 5
                    })
                    .css({
                        color: 'black'
                    })
                    .add();
            }

            e = chart.pointer.normalize(e);

            const newY = parseInt(e.lat) - 23
            const newX = parseInt(e.lon)

            positionHandler.innerHTML = `Latitude: ${newX}<br>Longitude: ${newY}`
            chart.lbl.attr({
                x: e.chartX + 15,
                y: e.chartY + 25,
                text: ' Lat: ' + (newY) + '<br>Lon: ' + newX
            });
        });

        const chart = Highcharts.mapChart('map-container', {
            /* paste your content here */

            plotOptions: {
                series: {
                    states: {
                        hover: {
                            enabled: false,
                            halo: {
                                size: 0
                            },

                        }
                    },
                    zoomBySingleTouch: true
                },
            },
            tooptip: {
                enabled: false
            },

            xAxis: {
                crosshair: {
                    zIndex: 5,
                    dashStyle: 'dot',
                    snap: false,
                    color: 'gray'
                }
            },

            yAxis: {
                crosshair: {
                    zIndex: 5,
                    dashStyle: 'dot',
                    snap: false,
                    color: 'gray'
                }
            },
            series: [{
                    name: 'Cemetery',
                    type: 'map',
                    joinBy: 'id',
                    mapData: [{
                        id: 'id0',
                        'path': 'M42,107C42,107,40,134,28,137,17,135,12,135,11,134,10,132,8,161,19,176,20,178,39,205,65,213,76,214,147,222,150,228,153,228,170,229,178,230,180,230,191,232,193,202,196,176,198,127,198,127L115,115z'
                    }, ],
                    data: [{
                        id: 'id0',
                        y: 0,
                    }, ],
                    // shadow: true,
                    color: '#2d4928ff',
                },
                {
                    name: 'Entrances',
                    type: 'map',
                    joinBy: 'id',
                    mapData: [{
                        id: 'id1',
                        'path': 'M34,106,28,137C28,137,37,140,43,107,34,107,34,106,34,106zM103,115,103,116C103,116,105,119,105,124,106,124,110,124,110,124L110,120C110,120,113,124,115,116,115,115,115,115,110,115,114,115,104,114,103,114z'
                    }, ],
                    data: [{
                        id: 'id1',
                        y: 1,
                    }, ],
                    // shadow: true,
                    color: '#8aa0a7ff',
                },
                {
                    name: 'Grave Yard',
                    type: 'map',
                    joinBy: 'id',
                    mapData: [{
                        id: 'id2',
                        'path': 'M105,124C105,124,97,164,37,139,27,186,39,173,39,173,39,173,54,184,72,172C81,158,96,169,96,169C96,169,104,173,112,168,119,161,113,160,123,167,134,174,132,175,142,190,163,188,193,189,192,181,191,173,194,158,194,158,194,158,189,144,182,161,164,160,137,153,120,144,114,132,110,124,110,124z'
                    }, ],
                    data: [{
                        id: 'id2',
                        y: 1,
                    }, ],
                    shadow: true,
                    color: '#80bb80ff',
                },
                {
                    name: 'Graves',
                    type: 'map',
                    joinBy: 'id',
                    mapData: [{
                        id: 'id3',
                        'path': '<?= isset($graves) ? $graves : '' ?>'
                    }, ],
                    data: [{
                        id: 'id3',
                        y: 2,
                    }, ],
                    borderColor: 'transparent',
                    color: '#caca00ff',
                },
                <?= isset($point) ? json_encode($point) : '' ?>
            ],
        });
    </script>
</div>