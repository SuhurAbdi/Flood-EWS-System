<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FloodReport;
use Illuminate\Http\Request;

class FloodReportController extends Controller
{
    /**
     * Get the logged-in user's flood reports.
     */
    public function index(Request $request)
{
    $reports = FloodReport::where(
        'user_id',
        $request->user()->id
    )
    ->latest()
    ->get();

    return response()->json([
        'success' => true,
        'data' => $reports
    ]);
}

    /**
     * Create a new flood report.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'location' => 'required|string|max:255',

            'severity' => [
                'required',
                'in:mild,moderate,severe'
            ],

            'flood_occurred' => 'required|boolean',

            'description' => 'nullable|string',

            'photo' => 'nullable|string|max:255',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Automatically get the authenticated user
        |--------------------------------------------------------------------------
        */

        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Create flood report
        |--------------------------------------------------------------------------
        */

        if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Unauthenticated user.'
        ], 401);
    }

    $validated['user_id'] = $user->id;

    $floodReport = FloodReport::create($validated);

    return response()->json([
        'success' => true,
        'message' => 'Flood report created successfully.',
        'data' => $floodReport,
    ], 201);
}

    /**
     * Show one flood report belonging to the logged-in user.
     */
    public function show(Request $request, FloodReport $floodReport)
    {
        if ($floodReport->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $floodReport
        ]);
    }
}