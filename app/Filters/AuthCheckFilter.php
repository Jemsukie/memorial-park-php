<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class AuthCheckFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Do something here
        if (!session()->get('isLoggedIn')) {
            return redirect()->to(base_url('/Auth/login'))->with('fail', 'You must log in first!');
        } 
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do something here
    }
}

?>