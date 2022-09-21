<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\DeceasedModel;
use App\Models\AppointmentModel;
use App\Models\AnnouncementModel;

class Admin extends BaseController
{
    public function __construct(){
        helper(['url', 'form']);
    }

    private function links (){
        return [
            [
                'name' => 'Accounts',
                'link' => 'Admin/accounts'
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
                'link' => 'Auth/logout'
            ]
        ];
    }

    public function index(){
        return $this->accounts();
    }
    
    public function accounts($roles = 'admin'){

        $userModel = new UserModel();
        $data = [
            'title' => 'Accounts',
            'links' => $this->links(),
            'cards' => [
                [
                    'number' => $userModel->where('roles = "admin"')->countAllResults(),
                    'title' => 'Admins',
                    'icon' => 'user',
                    'link' => base_url('Admin/accounts/admin')
                ],
                [
                    'number' => $userModel->where('roles = "user"')->countAllResults(),
                    'title' => 'Users',
                    'icon' => 'user',
                    'link' => base_url('Admin/accounts/user')
                ]
            ],
            'roles' => $roles,
            'user_data' => $userModel->where('roles = ', $roles)->orderBy('id', 'DESC')->paginate(10),
            'pagination_link' => $userModel->pager
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('components/cards', $data)
            . view('admin/accounts/' . $roles, $data),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function makeAdmin($id){
        $session = \Config\Services::session();
        $userModel = new UserModel();

        $userModel->update($id, ['roles' => 'admin']);

        $session->setFlashdata('success', 'Admin User Created!');
		return $this->response->redirect(base_url('/Admin'));
    }

    public function deleteUser($id){
        $session = \Config\Services::session();
        $userModel = new UserModel();

        function deleteAppointments($userId){
            $appointmentModel = new AppointmentModel();
            $rows = $appointmentModel->where('userId = ' . $userId)->paginate();

            foreach($rows as $row){
                $appointmentModel->where('id', $row['id'])->delete($row['id']);
            }
            return true;
        }

        if(deleteAppointments($id)){
            $userModel->where('id', $id)->delete($id);
            $session->setFlashdata('success', 'Record Successfully Deleted!');
		    return $this->response->redirect(base_url('/Admin'));
        }
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
            'title' => 'Deceaseds',
            'links' => $this->links(),
            'cards' => [
                [
                    'number' => $deceasedModel->orderBy('id', 'DESC')->countAllResults(),
                    'title' => 'Deceased',
                    'icon' => 'user'
                ]
            ],
            'createModalForm' => view('admin/deceaseds/createModalForm'),
            'filter' => $filter,
            'deceased_data' => $deceasedModel->where($setFilter)->orderBy('id', 'DESC')->paginate(10),
            'pagination_link' => $deceasedModel->pager
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('components/cards', $data )
            . view('admin/deceaseds/list', $data),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function createDeceased(){
        $deceasedModel = new DeceasedModel();

            $values = [
                'firstName' => $this->request->getPost('firstName'),
                'lastName' => $this->request->getPost('lastName'),
                'dateBorn' => $this->request->getPost('dateBorn'),
                'dateDied' => $this->request->getPost('dateDied'),
                'latitude' => $this->request->getPost('latitude'),
                'longitude' => $this->request->getPost('longitude'),
                'createdAt' => date("Y-m-d h:i:s"),
                'adminId' => 1
            ];

            $deceasedModel->insert($values);
            return redirect()->to(base_url('/Admin/deceaseds'))->with('success', 'Added Record Successfully!');
    }

    public function viewDeceased($id){
        $deceasedModel = new DeceasedModel();

        $data = [
            'title' => 'Deceaseds',
            'links' => $this->links(),
            'deceased_data' => $deceasedModel->where('id', $id)->first(),
            'map' => view('highcharts/map')
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('admin/deceaseds/viewDeceased', $data),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function updateDeceased(){
        $session = \Config\Services::session();
        $deceasedModel = new DeceasedModel();

        $input = [
            'firstName' => $this->request->getPost('firstName'),
            'lastName' => $this->request->getPost('lastName'),
            'dateBorn' => $this->request->getPost('dateBorn'),
            'dateDied' => $this->request->getPost('dateDied'),
            'latitude' => $this->request->getPost('latitude'),
            'longitude' => $this->request->getPost('longitude')
        ];

        $deceasedModel->update($this->request->getPost('id'), $input);

        $session->setFlashdata('success', 'Record Updated!');
		return $this->response->redirect(base_url('/Admin/deceaseds'));
    }

    public function deleteDeceased($id){
        $session = \Config\Services::session();
        $deceasedModel = new DeceasedModel();

        $deceasedModel->where('id', $id)->delete($id);
        $session->setFlashdata('success', 'Record Successfully Deleted!');
		return $this->response->redirect(base_url('/Admin/deceaseds'));
    }

    public function announcements(){

        $announcementModel = new AnnouncementModel();

        $data = [
            'title' => 'Announcements',
            'links' => $this->links(),
            'cards' => [
                [
                    'number' => 0,
                    'title' => 'Deceased',
                    'icon' => 'user'
                ]
            ],
            'announcement_data' => $announcementModel->orderBy('id', 'DESC')->paginate(10),
            'pagination_link' => $announcementModel->pager
        ];

        $html = [
            'body' => view('extras/navigation', $data)
            . view('admin/announcements', $data),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function appointments($status = 'request'){

        $appointmentModel = new AppointmentModel();

        function getName($rows){
            $userModel = new UserModel();
            $raws = [];
            
            foreach($rows as $row){
                $userInfo = $userModel->where('id = 2')->first();
                array_push($raws, $row + [
                    'user' => $userInfo['firstName'] . ' ' . $userInfo['lastName'],
                ]);
            }
            return $raws;
        }

        $data = [
            'title' => 'Appointments',
            'links' => $this->links(),
            'cards' => [
                [
                    'number' => $appointmentModel->where('status = "request"')->countAllResults(),
                    'title' => 'Requests',
                    'icon' => 'calendar',
                    'link' => base_url('Admin/appointments/request')
                ],
                [
                    'number' => $appointmentModel->where('status = "approved"')->countAllResults(),
                    'title' => 'Approved',
                    'icon' => 'calendar',
                    'link' => base_url('Admin/appointments/approved')
                ]
            ],
            'status' => $status,
            'appointment_data' => getName($appointmentModel->where('status = ', $status)->orderBy('id', 'DESC')->paginate(10)),
            'pagination_link' => $appointmentModel->pager
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('components/cards', $data )
            . view('admin/appointments/' . $status, $data),
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
            'cards' => [
                [
                    'number' => 0,
                    'title' => 'Deceased',
                    'icon' => 'user'
                ]
            ],
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
        
        $data['title'] = 'Logout';
        $data['links'] = $this->links();

        $html['body'] = view('extras/navigation', $data)
        . view('admin/logout');
        $html['head'] = view('extras/head', $data);
        $html['sidebar'] = view('extras/sidebar', $data);

        return view('extras/body', $html);
    }

    
}

?>
