<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FloodReport;
use App\Models\User;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalReports = FloodReport::count();

        $totalUsers = User::count();

        $recentReports = FloodReport::latest()
            ->take(10)
            ->get();

        return response()->json([
            'total_users' => User::count(),
            'total_reports' => FloodReport::count(),
            'pending_reports' => FloodReport::where('status', 'pending')->count(),
            'verified_reports' => FloodReport::where('status', 'verified')->count(),
            'rejected_reports' => FloodReport::where('status', 'rejected')->count(),
        ]);
        return response()->json([
            'message' => 'Admin Dashboard API is working!'
        ]);
    }
    public function reports()
{
    $reports = FloodReport::latest()->get();

    return response()->json([
        'reports' => $reports
    ]);
}
}