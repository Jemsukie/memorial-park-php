<?php

namespace App\Controllers;



class Home extends BaseController
{

    protected $sheer = 'hello';

    public function __construct(){
        helper(['url', 'form']);
    }

    public function links (){
        return [
            [
                'name' => 'Home',
                'link' => 'Home/'
            ],
            [
                'name' => 'About',
                'link' => 'Home/about'
            ],
            [
                'name' => 'Contact Us',
                'link' => 'Home/contact'
            ],
            [
                'name' => 'Login',
                'link' => 'Home/login'
            ]
        ];
    }
    
    public function index(){
        
        $data['title'] = 'HomePage';
        $data['links'] = $this->links();

        return view('extras/imports', $data)
        . view('extras/navigation', $data)
        . view('homepage/index')
        . view('highcharts/map')
        . view('extras/footer');
    }

    public function about(){

        $data['title'] = 'About';
        $data['links'] = $this->links();

        return view('extras/imports', $data)
        . view('extras/navigation', $data)
        . view('homepage/about')
        . view('extras/footer');
    }

    public function contact(){

        $data['title'] = 'Contact Us';
        $data['links'] = $this->links();

        return view('extras/imports', $data)
        . view('extras/navigation', $data)
        . view('homepage/contact')
        . view('extras/footer');
    }

    public function login(){

        $data['title'] = 'Login';
        $data['links'] = $this->links();

        return view('extras/imports', $data)
        . view('extras/navigation', $data)
        . view('homepage/login')
        . view('extras/footer');
    }

    public function signup(){

        $data['title'] = 'Login';
        $data['links'] = $this->links();

        return view('extras/imports', $data)
        . view('extras/navigation', $data)
        . view('homepage/signup')
        . view('extras/footer');
    }
}

?>
