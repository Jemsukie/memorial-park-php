<?php

namespace App\Models;

use CodeIgniter\Model;

class AppointmentModel extends Model
{
    protected $table = 'appointment';
    protected $primaryKey = 'id';
    protected $allowedFields = ['schedule', 'status', 'type', 'createdAt', 'userId'];
}