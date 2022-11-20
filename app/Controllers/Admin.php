<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\DeceasedModel;
use App\Models\AppointmentModel;
use App\Models\AnnouncementModel;

class Admin extends BaseController
{
    public function __construct()
    {
        helper(['url', 'form', 'array']);
        if (session()->get('roles') !== "admin") {
            echo $this->accessDeny(session()->get('roles'));
            exit;
        }
    }

    private function accessDeny($roles)
    {
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

    private function links()
    {
        return [
            [
                'name' => 'Accounts',
                'link' => 'Admin/accounts'
            ],
            [
                'name' => 'Deceaseds Information',
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

    private function graveCoords()
    {
        $deceasedModel = new DeceasedModel();
        $deceased_array = $deceasedModel->findAll();
        $raws = [];

        if (count($deceased_array) > 0) {
            foreach ($deceased_array as $row) {
                $lat = 157 - ($row['latitude'] - 157);
                $lon = $row['longitude'];
                $format = 'M' . $lon . ',' . $lat . 'L' . ($lon + 1) . ',' . $lat . ',' . ($lon + 1) . ',' . ($lat + 2) . ',' . $lon . ',' . ($lat + 2) . ',' . $lon . ',' . $lat;

                array_push($raws, $format);
            }
        }

        return implode('', $raws);
    }

    public function index()
    {
        return $this->accounts();
    }

    public function accounts($roles = 'admin')
    {
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
                . view('admin/accounts/' . $roles, $data)
                .view('extras/footer'),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function makeAdmin($id)
    {
        $userModel = new UserModel();

        $userModel->update($id, ['roles' => 'admin']);

        return redirect()->to(base_url('/Admin'))->with('success', 'Admin User Created!');
    }

    public function deleteUser($id)
    {
        $userModel = new UserModel();

        function deleteAppointments($userId)
        {
            $appointmentModel = new AppointmentModel();
            $rows = $appointmentModel->where('userId = ' . $userId)->findAll();

            foreach ($rows as $row) {
                $appointmentModel->where('id', $row['id'])->delete($row['id']);
            }
            return true;
        }

        if (deleteAppointments($id)) {
            $userModel->where('id', $id)->delete($id);
            return redirect()->to(base_url('/Admin'))->with('success', 'Record Successfully Deleted!');
        }
    }

    public function deceaseds($formValidation = [])
    {
        $filter = [
            'firstName' => $this->request->getVar('firstName') ? $this->request->getVar('firstName') : '',
            'middleName' => $this->request->getVar('middleName') ? $this->request->getVar('middleName') : '',
            'lastName' => $this->request->getVar('lastName') ? $this->request->getVar('lastName') : '',
            'dateBorn' => $this->request->getVar('dateBorn') ? $this->request->getVar('dateBorn') : '',
            'dateDied' => $this->request->getVar('dateDied') ? $this->request->getVar('dateDied') : '',
            'sortBy' => $this->request->getVar('sortBy') ? $this->request->getVar('sortBy') : 'DESC'
        ];
        $setFilter = 'firstName like "%' . $filter['firstName']
            . '%" AND middleName like "%' . $filter['middleName']
            . '%" AND lastName like "%' . $filter['lastName']
            . '%" AND dateBorn like "%' . $filter['dateBorn']
            . '%" AND dateDied like "%' . $filter['dateDied'] . '%"';

        $deceasedModel = new DeceasedModel();
        $data = [
            'title' => 'Deceaseds Information',
            'links' => $this->links(),
            'cards' => [
                [
                    'number' => $deceasedModel->orderBy('id', 'DESC')->countAllResults(),
                    'title' => 'Deceased',
                    'icon' => 'user'
                ]
            ],
            'validation' => $formValidation,
            'createModalForm' => view('admin/deceaseds/createModalForm'),
            'filter' => $filter,
            'filterSelect' => view('components/filter', [
                'addr' => 'Admin/deceaseds',
                'filter' => $filter,
            ]),
            'graves' => $this->graveCoords(),
            'deceased_data' => $deceasedModel->where($setFilter)->orderBy('createdAt', $filter['sortBy'])->paginate(10),
            'pagination_link' => $deceasedModel->pager
        ];
        $html = [
            'body' => view('extras/navigation', $data)
                . view('highcharts/map', $data)
                . view('admin/deceaseds/list', $data)
                .view('extras/footer'),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function createDeceased()
    {
        $deceasedModel = new DeceasedModel();

        $validation = $this->validate([
            'firstName' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The first name is required!',
                ]
            ],
            'middleName' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The middle name is required!',
                ]
            ],
            'lastName' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The last name is required!',
                ]
            ],
            'dateBorn' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The date of birth is required!',
                ]
            ],
            'dateDied' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The date of death is required!',
                ]
            ],
            'latitude' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The latitude is required!',
                ]
            ],
            'longitude' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The longitude is required!',
                ]
            ],
            'imageFile' => [
                'rules' => 'is_image[imageFile]|max_size[imageFile,4096]',
                'errors' => [
                    'is_image[imageFile]' => 'The file you uploaded is not an image!',
                    'max_size[imageFile,4096]' => 'The file you uploaded exceeds the maximum size!',
                ]
            ],
        ]);

        if (!$validation) {
            return $this->deceaseds([
                $this->validator->showError('firstName'),
                $this->validator->showError('middleName'),
                $this->validator->showError('lastName'),
                $this->validator->showError('dateBorn'),
                $this->validator->showError('dateDied'),
                $this->validator->showError('latitude'),
                $this->validator->showError('longitude'),
                $this->validator->showError('imageFile'),
            ]);
        } else {
            $imageFile = $this->request->getFile('imageFile');
            $firstName = $this->request->getVar('firstName');
            $middleName = $this->request->getVar('middleName');
            $lastName = $this->request->getVar('lastName');
            $newFileName = '[]';

            if ($imageFile->isValid() && !$imageFile->hasMoved()) {
                $newFileName = strtolower($firstName) . '_' . strtolower($lastName) . '_' . time() . '.' . $imageFile->getExtension();
                $imageFile->move('./assets/uploads', $newFileName);
            }

            $values = [
                'firstName' => $firstName,
                'middleName' => $middleName,
                'lastName' => $lastName,
                'dateBorn' => $this->request->getVar('dateBorn'),
                'dateDied' => $this->request->getVar('dateDied'),
                'latitude' => $this->request->getVar('latitude'),
                'longitude' => $this->request->getVar('longitude'),
                'imageFile' => '["' . $newFileName . '"]',
                'createdAt' => date("Y-m-d h:i:s"),
                'adminId' => session()->get('id')
            ];

            $deceasedModel->insert($values);
            return redirect()->to(base_url('/Admin/deceaseds'))->with('success', 'Added Record Successfully!');
        }
    }

    public function viewDeceased($id)
    {
        $deceasedModel = new DeceasedModel();

        $deceased_data = $deceasedModel->find($id);

        function gravePoint($data)
        {

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

        if ($deceased_data) {
            $mapData = [
                'graves' => $this->graveCoords(),
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
                    . view('admin/deceaseds/viewDeceased', $data)
                    .view('extras/footer'),
                'head' => view('extras/head', $data),
                'sidebar' => view('extras/sidebar', $data)
            ];

            return view('extras/body', $html);
        } else {
            return redirect()->to(base_url('/Auth/login'))->with('fail', 'No Record Found!');
        }
    }

    public function updateDeceased()
    {
        $deceasedModel = new DeceasedModel();

        $validation = $this->validate([
            'firstName' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The first name is required!',
                ]
            ],
            'middleName' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The middle name is required!',
                ]
            ],
            'lastName' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The last name is required!',
                ]
            ],
            'dateBorn' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The date of birth is required!',
                ]
            ],
            'dateDied' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The date of death is required!',
                ]
            ],
            'latitude' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The latitude is required!',
                ]
            ],
            'longitude' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'The longitude is required!',
                ]
            ],
            'imageFile' => [
                'rules' => 'is_image[imageFile]|max_size[imageFile,4096]',
                'errors' => [
                    'is_image[imageFile]' => 'The file you uploaded is not an image!',
                    'max_size[imageFile,4096]' => 'The file you uploaded exceeds the maximum size!',
                ]
            ],
        ]);
        if (!$validation) {
            return $this->deceaseds([
                $this->validator->showError('firstName'),
                $this->validator->showError('middleName'),
                $this->validator->showError('lastName'),
                $this->validator->showError('dateBorn'),
                $this->validator->showError('dateDied'),
                $this->validator->showError('latitude'),
                $this->validator->showError('longitude'),
                $this->validator->showError('imageFile'),
            ]);
        } else {

            $id = $this->request->getPost('id');
            $getImageFromDB = $deceasedModel->find($id);
            $imgArray = json_decode($getImageFromDB['imageFile']);

            $imageFile = $this->request->getFile('imageFile');
            $firstName = $this->request->getVar('firstName');
            $middleName = $this->request->getVar('middleName');
            $lastName = $this->request->getVar('lastName');
            $newFileName = '';

            if ($imageFile->isValid() && !$imageFile->hasMoved()) {
                $newFileName = strtolower($firstName) . '_' . strtolower($lastName) . '_' . time() . '.' . $imageFile->getExtension();
                $imageFile->move('./assets/uploads', $newFileName);
                array_push($imgArray, $newFileName);
            }

            $input = [
                'firstName' => $firstName,
                'middleName' => $middleName,
                'lastName' => $lastName,
                'dateBorn' => $this->request->getPost('dateBorn'),
                'dateDied' => $this->request->getPost('dateDied'),
                'latitude' => $this->request->getPost('latitude'),
                'longitude' => $this->request->getPost('longitude'),
                'imageFile' => json_encode($imgArray),
            ];

            $deceasedModel->update($id, $input);

            return redirect()->to(base_url('/Admin/deceaseds'))->with('success', 'Record Updated!');
        }
    }

    public function deleteImage($id, $key)
    {
        $deceasedModel = new DeceasedModel();
        $getImageFromDB = $deceasedModel->find($id);
        $imgArray = json_decode($getImageFromDB['imageFile']);

        array_splice($imgArray, $key, $key + 1);

        $input = [
            'imageFile' => json_encode($imgArray),
        ];

        $deceasedModel->update($id, $input);
        return redirect()->to(base_url('/Admin/viewDeceased/' . $id))->with('success', 'Image Deleted!');
    }

    public function deleteDeceased($id)
    {
        $deceasedModel = new DeceasedModel();

        $deceased_info = $deceasedModel->find($id);

        if ($deceased_info) {
            $deceasedModel->where('id', $id)->delete($id);

            return redirect()->to(base_url('/Admin/deceaseds'))->with('success', 'Record Successfully Deleted!');
        } else {
            return redirect()->to(base_url('/Auth/login'))->with('fail', 'No Record Found!');
        }
    }

    public function announcements()
    {

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
                . view('admin/announcements/list', $data)
                .view('extras/footer'),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function createAnnouncements()
    {
        $announcementModel = new AnnouncementModel();

        $values = [
            'message' => $this->request->getPost('message'),
            'createdAt' => date("Y-m-d h:i:s"),
            'adminId' => session()->get('id')
        ];

        $announcementModel->insert($values);
        return redirect()->to(base_url('/Admin/announcements'))->with('success', 'Added Record Successfully!');
    }

    public function viewAnnouncements($id)
    {
        $announcementModel = new AnnouncementModel();

        $announcement_info = $announcementModel->find($id);

        if ($announcement_info) {
            $data = [
                'title' => 'Announcements',
                'links' => $this->links(),
                'announcement_data' => $announcementModel->find($id)
            ];
            $html = [
                'body' => view('extras/navigation', $data)
                    . view('admin/announcements/viewMessage', $data)
                    .view('extras/footer'),
                'head' => view('extras/head', $data),
                'sidebar' => view('extras/sidebar', $data)
            ];

            return view('extras/body', $html);
        } else {
            return redirect()->to(base_url('/Auth/login'))->with('fail', 'No Record Found!');
        }
    }

    public function updateAnnouncements()
    {
        $announcementModel = new AnnouncementModel();

        $input = ['message' => $this->request->getPost('message')];

        $announcementModel->update($this->request->getPost('id'), $input);

        return redirect()->to(base_url('/Admin/announcements'))->with('success', 'Record Updated!');
    }

    public function deleteAnnouncements($id)
    {
        $announcementModel = new AnnouncementModel();

        $announcement_info = $announcementModel->find($id);

        if ($announcement_info) {
            $announcementModel->where('id', $id)->delete($id);

            return redirect()->to(base_url('/Admin/announcements'))->with('success', 'Record Successfully Deleted!');
        } else {
            return redirect()->to(base_url('/Auth/login'))->with('fail', 'No Record Found!');
        }
    }

    public function appointments($status = 'request')
    {

        $appointmentModel = new AppointmentModel();

        function getName($rows)
        {
            $userModel = new UserModel();
            $raws = [];

            foreach ($rows as $row) {
                $userInfo = $userModel->find($row['userId']);
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
                . view('components/cards', $data)
                . view('admin/appointments/' . $status, $data)
                .view('extras/footer'),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function approveAppointment($id)
    {
        $appointmentModel = new AppointmentModel();

        $appointment_info = $appointmentModel->find($id);

        if ($appointment_info) {
            $appointmentModel->update($id, ['status' => 'approved']);

            return redirect()->to(base_url('/Admin/appointments'))->with('success', 'Appointment Schedule Approved!');
        } else {
            return redirect()->to(base_url('/Auth/login'))->with('fail', 'No Record Found!');
        }
    }

    public function cancelAppointment($id)
    {
        $appointmentModel = new AppointmentModel();

        $appointment_info = $appointmentModel->find($id);

        if ($appointment_info) {
            $appointmentModel->where('id', $id)->delete($id);

            return redirect()->to(base_url('/Admin/appointments'))->with('success', 'Appointment Cancelled!');
        } else {
            return redirect()->to(base_url('/Auth/login'))->with('fail', 'No Record Found!');
        }
    }

    public function settings($formValidation = [])
    {

        $userModel = new UserModel();

        $data = [
            'title' => 'Settings',
            'links' => $this->links(),
            'scope' => 'Admin',
            'validation' => $formValidation,
            'user_data' => $userModel->find(session()->get('id'))
        ];
        $html = [
            'body' => view('extras/navigation', $data)
                . view('components/settings', $data)
                .view('extras/footer'),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function updateInfo()
    {
        $userModel = new UserModel();

        $validation = $this->validate([
            'email' => [
                'rules' => 'required|valid_email',
                'errors' => [
                    'required' => 'Your email is required!',
                    'valid_email' => 'Invalid email!'
                ]
            ], //This error messages back if the id is required or id already taken.
            'firstName' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Your first name is required!',
                ]
            ], //Name required
            'lastName' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Your last name is required!',
                ]
            ], //Name required
        ]);

        if (!$validation) {
            //If the validation is wrong, then this will flash errors on settings.php
            return $this->settings([
                $this->validator->showError('email'),
                $this->validator->showError('firstName'),
                $this->validator->showError('lastName')
            ]);
        } else {

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

            return redirect()->to(base_url('/Admin/settings'))->with('success', 'Account Updated!');
        }
    }

    public function updatePassword()
    {
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
            ], //Password required, must have minimum length of 5
            'confirmPassword' => [
                'rules' => 'required|min_length[5]|max_length[25]|matches[password]',
                'errors' => [
                    'required' => 'Confirm password is required.',
                    'min_length' => 'Password must have atleast 5 characters in length.',
                    'max_length' => 'Password must not have more than 25 characters in length!',
                    'matches' => 'Password do not match!'
                ]
            ] //Confirm password required, must have minimum length of 5 and must match with password
        ]);

        if (!$validation) {
            //If the validation is wrong, then this will flash errors on settings.php
            return $this->settings([
                $this->validator->showError('oldPassword'),
                $this->validator->showError('password'),
                $this->validator->showError('confirmPassword')
            ]);
        } else {

            $oldPasswordInput = $this->request->getVar('oldPassword');
            $getAccount = $userModel->find(session()->get('id'));

            if ($getAccount['password'] === $oldPasswordInput) {

                $input = [
                    'password' => $this->request->getVar('password')
                ];
                $userModel->update(session()->get('id'), $input);

                return redirect()->to(base_url('/Admin/settings'))->with('success', 'Password Updated!');
            } else {
                return redirect()->to(base_url('/Admin/settings'))->with('fail', 'Wrong Password!');
            }
        }
    }
}
