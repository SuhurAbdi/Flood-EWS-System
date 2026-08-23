<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FloodReportController;
use App\Http\Controllers\Api\AuthController;

use App\Http\Controllers\Api\AdminDashboardController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get(
    '/flood-reports',
    [FloodReportController::class, 'index']
);


Route::post(
    '/flood-reports',
    [FloodReportController::class, 'store']
);


Route::get(
    '/flood-reports/{floodReport}',
    [FloodReportController::class, 'show']
);

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

Route::post(
    '/register',
    [AuthController::class, 'register']
);

Route::post(
    '/login',
    [AuthController::class, 'login']
);


/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get(
        '/user',
        [AuthController::class, 'user']
    );

    Route::post(
        '/logout',
        [AuthController::class, 'logout']
    );

    Route::get('/flood-reports', [FloodReportController::class, 'index']);

    Route::post('/flood-reports', [FloodReportController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| Creating Dashboard Routes
|--------------------------------------------------------------------------
*/


Route::middleware('auth:sanctum')->get(
    '/admin/dashboard',
    [AdminDashboardController::class, 'index']
);
Route::middleware('auth:sanctum')->get(
    '/admin/dashboard',
    [AdminDashboardController::class, 'index']
);

Route::middleware('auth:sanctum')->get(
    '/admin/reports',
    [AdminDashboardController::class, 'reports']
);