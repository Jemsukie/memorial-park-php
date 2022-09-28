<?php

namespace App\Controllers;

use App\Models\AnnouncementModel;
use App\Models\DeceasedModel;

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
        if($data['announcement_data']){
            shuffle($data['announcement_data']);
        }

        return view('extras/news', $data);
    }
    
    public function index(){
        return $this->home();
    }

    public function home(){
        $announcementModel = new AnnouncementModel();
        $announcement_info = $announcementModel->orderBy('createdAt', 'DESC')->first();

        function graveCoords(){
            $deceasedModel = new DeceasedModel();
            $deceased_array = $deceasedModel->findAll();
            
            $raws = [];

            if(count($deceased_array) > 0)
            {
                foreach($deceased_array as $row){
                    $lat = 157 - ($row['latitude'] - 157);
                    $lon = $row['longitude'];
                    $format = 'M' . $lon . ',' . $lat . 'L' . ($lon + 1) . ',' . $lat . ',' . ($lon + 1) . ',' . ($lat + 2) . ',' . $lon . ',' . ($lat + 2) . ',' . $lon . ',' . $lat;
    
                    array_push($raws, $format);
                }
            }
            
            return implode('', $raws);
        }
        // echo session()->get('read') === true ? 'hi' : 'hello';
        // echo session()->get('read');
        // session()->remove('read');
        // $announcement_info['message']
        $data = [
            'title' => 'Home',
            'links' => $this->links(),
            'news' => $this->news(),
            'graves' => graveCoords(),
            'announcement_info' => session()->get('read') === false ? view('homepage/newsModal', ['announcement_info' => $announcement_info['message']]) : ''
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('homepage/index', $data),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];
        session()->set(['read' => true]);

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
