<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FloodReportController;
use App\Http\Controllers\Api\FloodAlertController;
use App\Http\Controllers\Api\AdminDashboardController;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

// Register
Route::post('/register', [AuthController::class, 'register']);

// Login
Route::post('/login', [AuthController::class, 'login']);


/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Flood alerts can be viewed without login
Route::get('/flood-alerts', [FloodAlertController::class, 'index']);


/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Authenticated User
    |--------------------------------------------------------------------------
    */

    Route::get('/user', [AuthController::class, 'user']);

    Route::post('/logout', [AuthController::class, 'logout']);


    /*
    |--------------------------------------------------------------------------
    | Flood Reports
    |--------------------------------------------------------------------------
    */

    // Create one flood report
    Route::post('/flood-reports', [FloodReportController::class, 'store']);

    // Get logged-in user's flood reports
    Route::get('/flood-reports', [FloodReportController::class, 'index']);

    // Get one flood report
    Route::get('/flood-reports/{floodReport}', [FloodReportController::class, 'show']);


    /*
    |--------------------------------------------------------------------------
    | Admin Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/dashboard',
        [AdminDashboardController::class, 'index']
    );

    Route::get(
        '/admin/reports',
        [AdminDashboardController::class, 'reports']
    );

    Route::get(
        '/admin/users',
        [AdminDashboardController::class, 'users']
    );

    // Admin delete flood report
    Route::delete(
        '/admin/flood-reports/{id}',
        [AdminDashboardController::class, 'destroyReport']
    );
    Route::get('/flood-risk', [FloodAlertController::class, 'currentRisk']);
});