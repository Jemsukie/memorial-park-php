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
            'deceased_data' => $deceasedModel->where($setFilter)->orderBy('createdAt', 'DESC')->paginate(10),
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
            'createModalForm' => view('admin/announcements/createModalForm'),
            'announcement_data' => $announcementModel->orderBy('id', 'ASC')->paginate(10),
            'pagination_link' => $announcementModel->pager
        ];

        $html = [
            'body' => view('extras/navigation', $data)
            . view('admin/announcements/list', $data),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function createAnnouncements(){
        $announcementModel = new AnnouncementModel();

            $values = [
                'message' => $this->request->getPost('message'),
                'createdAt' => date("Y-m-d h:i:s"),
                'adminId' => 1
            ];

            $announcementModel->insert($values);
            return redirect()->to(base_url('/Admin/announcements'))->with('success', 'Added Record Successfully!');
    }

    public function viewAnnouncements($id){
        $announcementModel = new AnnouncementModel();

        $data = [
            'title' => 'Announcements',
            'links' => $this->links(),
            'announcement_data' => $announcementModel->where('id', $id)->first()
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('admin/announcements/viewMessage', $data),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function updateAnnouncements(){
        $session = \Config\Services::session();
        $announcementModel = new AnnouncementModel();

        $input = ['message' => $this->request->getPost('message')];

        $announcementModel->update($this->request->getPost('id'), $input);

        $session->setFlashdata('success', 'Record Updated!');
		return $this->response->redirect(base_url('/Admin/announcements'));
    }

    public function deleteAnnouncements($id){
        $session = \Config\Services::session();
        $announcementModel = new AnnouncementModel();

        $announcementModel->where('id', $id)->delete($id);
        $session->setFlashdata('success', 'Record Successfully Deleted!');
		return $this->response->redirect(base_url('/Admin/announcements'));
    }

    public function appointments($status = 'request'){

        $appointmentModel = new AppointmentModel();

        function getName($rows){
            $userModel = new UserModel();
            $raws = [];
            
            foreach($rows as $row){
                $userInfo = $userModel->where('id = ', $row['userId'])->first();
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
            'appointment_data' => getName($appointmentModel->where('status = ', $status)->orderBy('createdAt', 'DESC')->paginate(10)),
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

    public function approveAppointment($id){
        $session = \Config\Services::session();
        $appointmentModel = new AppointmentModel();

        $appointmentModel->update($id, ['status' => 'approved']);

        $session->setFlashdata('success', 'Appointment Schedule Approved!');
		return $this->response->redirect(base_url('/Admin/appointments'));
    }

    public function cancelAppointment($id){
        $session = \Config\Services::session();
        $appointmentModel = new AppointmentModel();

        $appointmentModel->where('id', $id)->delete($id);

        $session->setFlashdata('success', 'Appointment Cancelled!');
		return $this->response->redirect(base_url('/Admin/appointments'));
    }

    public function settings($formValidation = []){

        $userModel = new UserModel();

        $data = [
            'title' => 'Settings',
            'links' => $this->links(),
            'scope' => 'Admin',
            'validation' => $formValidation,
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

    public function updateInfo(){
        $session = \Config\Services::session();
        $userModel = new UserModel();

        $validation = $this->validate([
            'email' => [
                'rules' => 'required|valid_email',
                'errors' => [
                    'required' => 'Your email is required!',
                    'valid_email' => 'Invalid email!'
                ]
            ],//This error messages back if the id is required or id already taken.
            'firstName' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Your first name is required!',
                ]
            ],//Name required
            'lastName' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Your last name is required!',
                ]
            ],//Name required
        ]);

        if(!$validation){
            //If the validation is wrong, then this will flash errors on settings.php
            return $this->settings($this->validator);
        }else{

            $input = [
                'email' => $this->request->getVar('email'),
                'firstName' => $this->request->getVar('firstName'),
                'lastName' => $this->request->getVar('lastName'),
            ];

            $userModel->update($this->request->getVar('id'), $input);

            $session->setFlashdata('success', 'Account Updated!');
            return $this->response->redirect(base_url('/Admin/settings'));
        }
    }

    public function updatePassword(){
        $session = \Config\Services::session();
        $userModel = new UserModel();

        $validation = $this->validate([
            'oldPassword' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Your password is required!'
                ]
            ],
            'password' => [
                'rules' => 'required|min_length[5]|max_length[25]',
                'errors' => [
                    'required' => 'Your password is required!',
                    'min_length' => 'Password must have atleast 5 characters in length!',
                    'max_length' => 'Password must not have more than 25 characters in length!'
                ]
            ],//Password required, must have minimum length of 5
            'confirmPassword' => [
                'rules' => 'required|min_length[5]|max_length[25]|matches[password]',
                'errors' => [
                    'required' => 'Confirm password is required.',
                    'min_length' => 'Password must have atleast 5 characters in length.',
                    'max_length' => 'Password must not have more than 25 characters in length!',
                    'matches' => 'Password do not match!'
                ]
            ]//Confirm password required, must have minimum length of 5 and must match with password
        ]);

        if(!$validation){
            //If the validation is wrong, then this will flash errors on settings.php
            return $this->settings($this->validator);
        }else{

            $oldPasswordInput = $this->request->getVar('oldPassword');
            $id = $this->request->getVar('id');
            $getAccount = $userModel->where('id', $id)->first();

            if($getAccount['password'] === $oldPasswordInput){

                $input = [
                    'password' => $this->request->getVar('password')
                ];
                $userModel->update($this->request->getVar('id'), $input);

                $session->setFlashdata('success', 'Password Updated!');
                return $this->response->redirect(base_url('/Admin/settings'));
            } else{
                $session->setFlashdata('failed', 'Wrong Password!');
                return $this->response->redirect(base_url('/Admin/settings'));
            }
        }
        
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
