<?php

namespace App\Controllers;

class Admin extends BaseController
{
    public function __construct(){
        helper(['url', 'form']);
    }

    public function links (){
        return [
            [
                'name' => 'Accounts',
                'link' => 'Admin/'
            ],
            [
                'name' => 'Deceaseds',
                'link' => 'Admin/deceaseds'
            ],
            [
                'name' => 'Appointments',
                'link' => 'Admin/appointments'
            ],
            [
                'name' => 'Announcements',
                'link' => 'Admin/announcements'
            ],
            [
                'name' => 'Settings',
                'link' => 'Admin/settings'
            ],
            [
                'name' => 'Logout',
                'link' => 'Admin/logout'
            ]
        ];
    }
    
    public function index(){
        
        $data['title'] = 'Accounts';
        $data['links'] = $this->links();

        $html['body'] = view('extras/navigation', $data)
        . view('admin/accounts');
        $html['head'] = view('extras/head', $data);
        $html['sidebar'] = view('extras/sidebar', $data);

        return view('extras/body', $html);
    }

    public function deceaseds(){
        
        $data['title'] = 'Deceaseds';
        $data['links'] = $this->links();

        $html['body'] = view('extras/navigation', $data)
        . view('admin/accounts');
        $html['head'] = view('extras/head', $data);
        $html['sidebar'] = view('extras/sidebar', $data);

        return view('extras/body', $html);
    }

    public function announcements(){
        
        $data['title'] = 'Announcements';
        $data['links'] = $this->links();

        $html['body'] = view('extras/navigation', $data)
        . view('admin/accounts');
        $html['head'] = view('extras/head', $data);
        $html['sidebar'] = view('extras/sidebar', $data);

        return view('extras/body', $html);
    }

    public function appointments(){
        
        $data['title'] = 'Announcements';
        $data['links'] = $this->links();

        $html['body'] = view('extras/navigation', $data)
        . view('admin/accounts');
        $html['head'] = view('extras/head', $data);
        $html['sidebar'] = view('extras/sidebar', $data);

        return view('extras/body', $html);
    }

    public function settings(){
        
        $data['title'] = 'Settings';
        $data['links'] = $this->links();

        $html['body'] = view('extras/navigation', $data)
        . view('admin/accounts');
        $html['head'] = view('extras/head', $data);
        $html['sidebar'] = view('extras/sidebar', $data);

        return view('extras/body', $html);
    }

    public function logout(){
        
        $data['title'] = 'Logout';
        $data['links'] = $this->links();

        $html['body'] = view('extras/navigation', $data)
        . view('admin/accounts');
        $html['head'] = view('extras/head', $data);
        $html['sidebar'] = view('extras/sidebar', $data);

        return view('extras/body', $html);
    }

    
}

?>
