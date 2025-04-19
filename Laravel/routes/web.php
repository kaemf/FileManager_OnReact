<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FileController;

Route::get('/', function () {
    return view('welcome');
});