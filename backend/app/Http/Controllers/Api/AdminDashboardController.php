<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FloodReport;
use App\Models\User;

class AdminDashboardController extends Controller
{
    /**
     * Admin Dashboard
     */
    public function index()
    {
        $reports = FloodReport::latest()
            ->take(10)
            ->get();

        return response()->json([
            'total_users' => User::count(),

            'total_reports' => FloodReport::count(),

            'pending_reports' => FloodReport::where(
                'status',
                'pending'
            )->count(),

            'verified_reports' => FloodReport::where(
                'status',
                'verified'
            )->count(),

            'rejected_reports' => FloodReport::where(
                'status',
                'rejected'
            )->count(),

            'reports' => $reports,
        ]);
    }

    /**
     * All Flood Reports
     */
    public function reports()
    {
        $reports = FloodReport::latest()->get();

        return response()->json([
            'reports' => $reports,
        ]);
    }

    /**
     * All Users
     */
    public function users()
    {
        $users = User::latest()->get();

        return response()->json([
            'users' => $users,
        ]);
    }

    /**
     * Flood Map
     */
    public function floodMap()
    {
        $reports = FloodReport::whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->latest()
            ->get([
                'id',
                'location',
                'latitude',
                'longitude',
                'status',
                'description',
                'photo',
                'created_at',
            ]);

        return response()->json([
            'reports' => $reports,
        ]);
    }
}