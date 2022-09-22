<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\DeceasedModel;
use App\Models\AppointmentModel;
use App\Models\AnnouncementModel;

class User extends BaseController
{
    public function __construct(){
        helper(['url', 'form']);
    }

    private function links (){
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
                'link' => 'Auth/logout'
            ]
        ];
    }

    public function index(){
        return $this->deceaseds();
    }
    
    public function deceaseds(){
        $filter = [
            'firstName' => $this->request->getVar('firstName'),
            'lastName' => $this->request->getVar('lastName'),
            'dateBorn' => $this->request->getVar('dateBorn'),
            'dateDied' => $this->request->getVar('dateDied'),
        ];
        $setFilter = 'firstName like "%'. $filter['firstName'] 
        . '%" AND lastName like "%'. $filter['lastName']
        . '%" AND dateBorn like "%'. $filter['dateBorn']
        . '%" AND dateDied like "%'. $filter['dateDied'] . '%"';

        $deceasedModel = new DeceasedModel();

        $data = [
            'title' => 'Main',
            'links' => $this->links(),
            'filter' => $filter,
            'deceased_data' => $deceasedModel->where($setFilter)->orderBy('createdAt', 'DESC')->paginate(10),
            'pagination_link' => $deceasedModel->pager
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('user/deceaseds', $data),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function appointments($status = 'request'){

        $appointmentModel = new AppointmentModel();

        $setFilter = 'status = "' . $status . '" AND userId = 2';

        $data = [
            'title' => 'Appointments',
            'links' => $this->links(),
            'cards' => [
                [
                    'number' => $appointmentModel->where('status = "request"')->countAllResults(),
                    'title' => 'Admins',
                    'icon' => 'calendar',
                    'link' => base_url('User/appointments/request')
                ],
                [
                    'number' => $appointmentModel->where('status = "approved"')->countAllResults(),
                    'title' => 'Users',
                    'icon' => 'calendar',
                    'link' => base_url('User/appointments/approved')
                ]
            ],
            'appointment_data' => $appointmentModel->where($setFilter)->orderBy('createdAt', 'DESC')->paginate(10),
            'pagination_link' => $appointmentModel->pager
        ];

        $html = [
            'body' => view('extras/navigation', $data)
            . view('components/cards', $data)
            . view('user/appointments/'. $status, $data),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function settings(){

        $userModel = new UserModel();

        $data = [
            'title' => 'Settings',
            'links' => $this->links(),
            'scope' => 'User',
            'user_data' => $userModel->where('id = 1')->orderBy('id', 'DESC')->first()
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('components/settings', $data),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function logout(){

        $data = [
            'title' => 'Logout',
            'links' => $this->links()
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('user/logout'),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    
}

?>
