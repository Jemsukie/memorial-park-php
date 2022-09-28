<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\AnnouncementModel;

class Auth extends BaseController{

    public function __construct(){
        helper(['url', 'form', 'array']);
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

    public function login($formValidation = []){
        $data = [
            'title' => 'Login',
            'links' => $this->links(),
            'validation' => $formValidation,
            'news' => $this->news()
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('Auth/login'),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function signup($formValidation = []){

        $data = [
            'title' => 'Sign Up',
            'links' => $this->links(),
            'validation' => $formValidation,
            'news' => $this->news()
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('Auth/signup'),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function saveCheck(){

        //This is used to validate the inputs of the users.
        $validation = $this->validate([
            'email' => [
                'rules' => 'required|valid_email|is_unique[user.email]',
                'errors' => [
                    'required' => 'Your email is required!',
                    'valid_email' => 'Invalid email!',
                    'is_unique' => 'Your email is already taken!'
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
            //If the validation is wrong, then this will flash errors on signup.php
            return $this->signup([
                $this->validator->showError('email'),
                $this->validator->showError('firstName'),
                $this->validator->showError('lastName'),
                $this->validator->showError('password'),
                $this->validator->showError('confirmPassword')
            ]);
        }
        else{
            //If all the requirements are met, then you will be able to insert the information to the database
            $userModel = new UserModel();

            $values = [
                'email' => $this->request->getPost('email'),
                'firstName' => $this->request->getPost('firstName'),
                'lastName' => $this->request->getPost('lastName'),
                'password' => $this->request->getPost('password'),
                'roles' => 'user',
                'createdAt' => date("Y-m-d h:i:s"),
            ];

            $query = $userModel->insert($values);
            if(!$query){
                return redirect()->to(base_url('/Auth/signup'))->with('fail', 'Sorry, something went wrong...');
            }
            else{
                return redirect()->to(base_url('/Auth/login'))->with('success', 'You are now registered!');
            }
        }
    }

    public function authCheck(){
        $validation = $this->validate([
            'email' => [
                'rules' => 'required|is_not_unique[user.email]',
                'errors' => [
                    'required' => 'Your email is required!',
                    'is_not_unique' => 'Your email is not yet registered to our system! Please create an account first.'
                ]
            ],//This error messages back if the id is required or id already taken.
            'password' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Your password is required!'
                ]
            ],//Password required
        ]);

        if(!$validation){
            //If the validation is wrong, then this will flash errors on login.php
            return $this->login([
                $this->validator->showError('email'),
                $this->validator->showError('password')
            ]);
        } else{
            $userModel = new UserModel();

            $email = $this->request->getPost('email');
            $password = $this->request->getPost('password');
                    
            $user_info = $userModel->where('email', $email)->first();

            $check_password = strcmp($password, $user_info['password']);

            if($check_password !== 0){
                return redirect()->to(base_url('/Auth/login'))->with('fail', 'Incorrect password!')->withInput();
            } else{
                session()->set([
                    'id' => $user_info['id'],
                    'email' => $user_info['email'],
                    'name' => $user_info['firstName'] . ' ' . $user_info['lastName'],
                    'roles' => $user_info['roles'],
                    'isLoggedIn' => true,
                ]);
                return redirect()->to(base_url(ucfirst($user_info['roles'])))->with('success', 'Successfully Logged In!')->withInput();
                
            }
        }
    }

    public function logout(){
        if(session()->get('isLoggedIn')){
            session()->set(['read' => false]);
            session()->remove(['id', 'email', 'name', 'roles', 'isLoggedIn']);
            return redirect()->to(base_url('/Auth/login?access=out'))->with('fail', 'You are logged out!');
        } else{
            return redirect()->to(base_url('/'));
        }
    }
}

?>

