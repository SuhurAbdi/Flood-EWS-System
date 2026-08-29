<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FloodReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FloodReportController extends Controller
{
    /**
     * Get the logged-in user's flood reports.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated user.',
            ], 401);
        }

        $reports = FloodReport::where('user_id', $user->id)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $reports,
        ]);
    }


    /**
     * Create a new flood report.
     */
    public function store(Request $request)
    {
        // ============================================================
        // 1. CHECK AUTHENTICATION
        // ============================================================

        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated user.',
            ], 401);
        }


        // ============================================================
        // 2. VALIDATE FLOOD REPORT
        // ============================================================

        $validated = $request->validate([

            'location' => [
                'required',
                'string',
                'max:255',
            ],

            'severity' => [
                'required',
                'in:mild,moderate,severe',
            ],

            'flood_occurred' => [
                'required',
                'boolean',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'latitude' => [
                'required',
                'numeric',
                'between:-90,90',
            ],

            'longitude' => [
                'required',
                'numeric',
                'between:-180,180',
            ],

            'photo' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],
        ]);


        // ============================================================
        // 3. DETERMINE RISK LEVEL
        // ============================================================

        $riskLevel = match ($validated['severity']) {

            'mild' => 'Normal',

            'moderate' => 'Medium',

            'severe' => 'Very Risk',

            default => 'Normal',
        };


        // ============================================================
        // 4. UPLOAD FLOOD PHOTO
        // ============================================================

        $photoPath = null;

        if ($request->hasFile('photo')) {

            $photoPath = $request
                ->file('photo')
                ->store('flood-reports', 'public');
        }


        // ============================================================
        // 5. CREATE FLOOD REPORT
        // ============================================================

        $floodReport = FloodReport::create([

            'user_id' => $user->id,

            'location' => $validated['location'],

            'severity' => $validated['severity'],

            'flood_occurred' => $validated['flood_occurred'],

            'description' => $validated['description'] ?? null,

            'latitude' => $validated['latitude'],

            'longitude' => $validated['longitude'],

            'photo' => $photoPath,

            'status' => 'pending',

            'risk_level' => $riskLevel,
        ]);


        // ============================================================
        // 6. RETURN SAVED FLOOD REPORT
        // ============================================================

        return response()->json([

            'success' => true,

            'message' => 'Flood report created successfully.',

            'data' => $floodReport,

        ], 201);
    }


    /**
     * Show one flood report belonging to the logged-in user.
     */
    public function show(
        Request $request,
        FloodReport $floodReport
    ) {
        // Check ownership

        if (!$request->user() || $floodReport->user_id !== $request->user()->id) {

            return response()->json([

                'success' => false,

                'message' => 'Unauthorized.',

            ], 403);
        }


        return response()->json([

            'success' => true,

            'data' => $floodReport,

        ]);
    }


    /**
     * Delete a flood report.
     */
    public function destroyReport(
        Request $request,
        $id
    ) {
        // Find report

        $report = FloodReport::findOrFail($id);


        // Check ownership

        if (!$request->user() || $report->user_id !== $request->user()->id) {

            return response()->json([

                'success' => false,

                'message' => 'Unauthorized.',

            ], 403);
        }


        // Delete report

        $report->delete();


        return response()->json([

            'success' => true,

            'message' => 'Flood report deleted successfully.',

        ]);
    }
}

