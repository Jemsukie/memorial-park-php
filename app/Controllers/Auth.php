<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\DeceasedModel;
use App\Models\AppointmentModel;
use App\Models\AnnouncementModel;

class Auth extends BaseController{

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
                'link' => 'Auth/logout'
            ]
        ];
    }

    public function login(){
        $data = [
            'title' => 'Login',
            'links' => $this->links(),
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('auth/login'),
            'head' => view('extras/head', $data),
            'sidebar' => view('extras/sidebar', $data)
        ];

        return view('extras/body', $html);
    }

    public function signup($validation = []){

        $data = [
            'title' => 'Sign Up',
            'links' => $this->links(),
        ];
        $html = [
            'body' => view('extras/navigation', $data)
            . view('auth/signup', $validation),
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
            // return view('Auth/signup', ['validation' => $this->validator]);
            // return view('extras/body', $html)
            return $this->signup(['validation' => $this->validator]);
            // return redirect()->to(base_url('/Auth/signup'))->with('fail', json_encode(['validation' => $this->validator]));
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
                echo 'failed';
                return redirect()->to(base_url('/Auth/signup'))->with('fail', 'Sorry, something went wrong...');
            }
            else{
                echo 'success';
                return redirect()->to(base_url('/Auth/login'))->with('success', 'You are now registration request was successful!');
            }
        }
    }

    public function logout(){
        if(session()->has('loggedUser')){
            session()->remove('loggedUser');
            session()->remove('loggedMember');
            return redirect()->to(base_url('/Auth/login?access=out'))->with('fail', 'You are logged out!');
        }
    }
}

?>

