<?php

namespace App\Controllers;

use App\Models\AnnouncementModel;

class Home extends BaseController
{
    public function __construct(){
        helper(['url', 'form']);
    }

    private function links (){
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
                'link' => 'Auth/login'
            ]
        ];
    }

    private function news(){
        $announcementModel = new AnnouncementModel();

        $data['announcement_data'] = $announcementModel->findColumn('message');
        shuffle($data['announcement_data']);

        return view('extras/news', $data);
    }
    
    public function index(){
        return $this->home();
    }

    public function home(){
        $data = [
            'title' => 'Home',
            'links' => $this->links(),
            'news' => $this->news()
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('homepage/index', $data)
            . view('highcharts/map'),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function about(){
        $data = [
            'title' => 'About',
            'links' => $this->links(),
            'news' => $this->news()
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('homepage/about'),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function contact(){
        $data = [
            'title' => 'Contact Us',
            'links' => $this->links(),
            'news' => $this->news()
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('homepage/contact'),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

}

?>
