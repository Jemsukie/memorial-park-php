<?php

namespace App\Controllers;

class Home extends BaseController
{

    public function __construct(){
        helper(['url', 'form']);
    }
    
    public function index()
    {

        $data['title'] = 'HomePage';

        return view('extras/imports', $data)
        . view('extras/navigation')
        . view('homepage/index')
        . view('highcharts/map')
        . view('extras/footer');
    }
}

?>
