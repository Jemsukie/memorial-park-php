<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\DeceasedModel;
use App\Models\AppointmentModel;

class User extends BaseController
{
    public function __construct(){
        helper(['url', 'form', 'array']);
        if (session()->get('roles') !== "user") {
            echo $this->accessDeny(session()->get('roles'));
            exit;
        }
    }

    private function accessDeny($roles){
        $data = [
            'title' => '403 Access Denied',
            'links' => base_url('/' . ucfirst($roles)),
        ];
        $html = [
            'body' => view('errors/html/error_403', $data),
            'head' => view('extras/head', $data)
        ];

        return view('extras/body', $html);
    }

    private function links (){
        return [
            [
                'name' => 'Deceaseds Information',
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
            'middleName' => $this->request->getVar('middleName'),
            'lastName' => $this->request->getVar('lastName'),
            'dateBorn' => $this->request->getVar('dateBorn'),
            'dateDied' => $this->request->getVar('dateDied'),
        ];
        $setFilter = 'firstName like "%'. $filter['firstName'] 
        . '%" AND middleName like "%'. $filter['middleName']
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
            . view('user/deceaseds/list', $data),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function viewDeceased($id){
        $deceasedModel = new DeceasedModel();

        $deceased_data = $deceasedModel->find($id);

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

        function gravePoint($data){

            $lat = 157 - ($data['latitude'] - 157);
            $lon = $data['longitude'];
            $path = 'M' . ($lon - 1) . ',' . ($lat + 1) . 'C' . ($lon - 1) . ',' . ($lat + 1) . ',' . ($lon - 1) . ',' . ($lat + 3) . ',' . ($lon + 1) . ',' . ($lat + 3) . ',' . ($lon + 2) . ',' . ($lat + 3) . ',' . ($lon + 2) . ',' . ($lat + 1) . ',' . ($lon + 2) . ',' . ($lat + 1) . ',' . ($lon + 2) . ',' . ($lat + 1) . ',' . ($lon + 2) . ',' . ($lat) . ',' . ($lon + 1) . ',' . ($lat) . ',' . ($lon - 1) . ',' . ($lat) . ',' . ($lon - 1) . ',' . ($lat + 1) . ',' . ($lon - 1) . ',' . ($lat + 1) . 'z';

            $gravePoint = [
                'name' => $data['firstName'] . ' ' . $data['lastName'],
                'type' => 'map',
                'joinBy' => 'id',
                'mapData' => [
                    [
                        'id' => 'id4',
                        'path' => $path,
                    ],
                ],
                'data' => [
                    [
                        'id' => 'id4',
                        'y' => 3,
                    ],
                ],
                'shadow' => true,
                'color' => '#23e9e79a',
                'cursor' => 'pointer',
                'tooltip' => [
                    'pointFormat' => 'You might be looking for ' . $data['firstName'] . ' ' . mb_substr($data['middleName'], 0, 1) . '. ' . $data['lastName'],
                ],
                'mapNavigation' => [
                    'enabled' => true,
                    'buttonOptions' => [
                        'verticalAlign' => 'bottom',
                    ],
                ]
            ];

            return $gravePoint;
        }

        if($deceased_data){
            $mapData = [
                'graves' => graveCoords(),
                'point' => gravePoint($deceased_data)
            ];
            $data = [
                'title' => 'Deceaseds Information',
                'links' => $this->links(),
                'deceased_data' => $deceased_data,
                'map' => view('highcharts/map', $mapData)
            ];
            $html = [
                'body' => view('extras/navigation', $data)
                . view('user/deceaseds/viewDeceased', $data),
                'head' => view('extras/head', $data),
                'sidebar' => view('extras/sidebar', $data)
            ];

            return view('extras/body', $html);
        } else{
            return redirect()->to(base_url('/Auth/login'))->with('fail', 'No Record Found!');
        }
        
    }

    public function appointments($status = 'request'){

        $appointmentModel = new AppointmentModel();

        $setFilter = 'status = "' . $status . '" AND userId = ' . session()->get('id');

        $data = [
            'title' => 'Appointments',
            'links' => $this->links(),
            'createModalForm' => view('user/appointments/createModalForm'),
            'cards' => [
                [
                    'number' => $appointmentModel->where('status = "request"')->countAllResults(),
                    'title' => 'Request',
                    'icon' => 'calendar',
                    'link' => base_url('User/appointments/request')
                ],
                [
                    'number' => $appointmentModel->where('status = "approved"')->countAllResults(),
                    'title' => 'Approved',
                    'icon' => 'calendar',
                    'link' => base_url('User/appointments/approved')
                ]
            ],
            'status' => $status,
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

    public function viewAppointment($id){
        $appointmentModel = new AppointmentModel();

        $appointment_data = $appointmentModel->find($id);

        if($appointment_data){
            $data = [
                'title' => 'Deceaseds Information',
                'links' => $this->links(),
                'appointment_data' => $appointment_data
            ];
            $html = [
                'body' => view('extras/navigation', $data)
                . view('user/appointments/viewAppointment', $data),
                'head' => view('extras/head', $data),
                'sidebar' => view('extras/sidebar', $data)
            ];

            return view('extras/body', $html);
        } else{
            return redirect()->to(base_url('/Auth/login'))->with('fail', 'No Record Found!');
        }
    }

    public function createAppointment(){
        $appointmentModel = new AppointmentModel();

        $values = [
            'schedule' => $this->request->getPost('schedule'),
            'status' => 'request',
            'createdAt' => date("Y-m-d h:i:s"),
            'userId' => session()->get('id')
        ];

        $appointmentModel->insert($values);
        return redirect()->to(base_url('/User/appointments'))->with('success', 'Added Record Successfully!');
    }

    public function updateAppointment(){
        $appointmentModel = new AppointmentModel();
        
        $input = [
            'schedule' => $this->request->getVar('schedule'),
        ];

        $appointmentModel->update($this->request->getVar('id'), $input);
        
        return redirect()->to(base_url('/User/appointments'))->with('success', 'Schedule Updated!');
    }

    public function cancelAppointment($id){
        $appointmentModel = new AppointmentModel();

        $appointment_data = $appointmentModel->find($id);

        if($appointment_data){
            $appointmentModel->where('id', $id)->delete($id);
            
            return redirect()->to(base_url('/User/appointments'))->with('success', 'Schedule Successfully Cancelled!');
        } else{
            return redirect()->to(base_url('/Auth/login'))->with('fail', 'No Record Found!');
        }
    }

    public function settings($formValidation = []){

        $userModel = new UserModel();

        $data = [
            'title' => 'Settings',
            'links' => $this->links(),
            'scope' => 'User',
            'validation' => $formValidation,
            'user_data' => $userModel->find(session()->get('id'))
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
            return $this->settings([
                $this->validator->showError('email'),
                $this->validator->showError('firstName'),
                $this->validator->showError('lastName')
            ]);
        }else{

            $input = [
                'email' => $this->request->getVar('email'),
                'firstName' => $this->request->getVar('firstName'),
                'lastName' => $this->request->getVar('lastName'),
            ];
            session()->set([
                'id' => session()->get('id'),
                'email' => $this->request->getVar('email'),
                'name' => $this->request->getVar('firstName') . ' ' . $this->request->getVar('lastName'),
                'roles' => session()->get('roles'),
                'isLoggedIn' => true,
            ]);

            $userModel->update(session()->get('id'), $input);
            
            return redirect()->to(base_url('/User/settings'))->with('success', 'Account Updated!');
        }
    }

    public function updatePassword(){
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
                    'required' => 'Confirm password is required!',
                    'min_length' => 'Password must have atleast 5 characters in length.',
                    'max_length' => 'Password must not have more than 25 characters in length!',
                    'matches' => 'Password do not match!'
                ]
            ]//Confirm password required, must have minimum length of 5 and must match with password
        ]);

        if(!$validation){
            //If the validation is wrong, then this will flash errors on settings.php
            return $this->settings([
                $this->validator->showError('oldPassword'),
                $this->validator->showError('password'),
                $this->validator->showError('confirmPassword')
            ]);
        }else{

            $oldPasswordInput = $this->request->getVar('oldPassword');
            $getAccount = $userModel->find(session()->get('id'));

            if($getAccount['password'] === $oldPasswordInput){

                $input = [
                    'password' => $this->request->getVar('password')
                ];
                $userModel->update(session()->get('id'), $input);
                
                return redirect()->to(base_url('/User/settings'))->with('success', 'Password Updated!');
            } else{
                return redirect()->to(base_url('/User/settings'))->with('fail', 'Wrong Password!');
            }
        }
    }
}

?>
