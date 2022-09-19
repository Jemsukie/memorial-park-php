<?php
namespace App\Validation;

class CustomRules{

  // Rule is to validate mobile number digits
  public function futureValidation(string $str, string $fields, array $data){
    
    if('2021-08-14' == $data['future'])
    {
        return $bool == 0 ? false : true; 
    }
    else{
      
        return false;
    }
  }
}