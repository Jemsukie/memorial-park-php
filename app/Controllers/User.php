<?php

namespace App\Controllers;

class User extends BaseController
{
    public function __construct(){
        helper(['url', 'form']);
    }

    public function links (){
        return [
            [
                'name' => 'Deceaseds',
                'link' => 'User/'
            ],
            [
                'name' => 'Appointments',
                'link' => 'User/appointments'
            ],
            [
                'name' => 'Settings',
                'link' => 'User/settings'
            ],
            [
                'name' => 'Logout',
                'link' => 'User/logout'
            ]
        ];
    }
    
    public function index(){

        $data['title'] = 'Main';
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
