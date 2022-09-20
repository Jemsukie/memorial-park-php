<?php

namespace App\Models;

use CodeIgniter\Model;

class DeceasedModel extends Model
{
    protected $table = 'deceased';
    protected $primaryKey = 'id';
    protected $allowedFields = ['firstName', 'lastName', 'dateBorn', 'dateDied', 'latitude', 'longitude', 'createdAt', 'adminId'];
}