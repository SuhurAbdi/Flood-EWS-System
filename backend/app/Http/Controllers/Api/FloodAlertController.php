<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FloodReport;

class FloodAlertController extends Controller
{
    public function index()
    {
        $alerts = FloodReport::whereIn(
                'severity',
                ['moderate', 'severe']
            )
            ->where('status', 'verified')
            ->latest()
            ->get()
            ->map(function ($report) {

                return [
                    'id' => $report->id,

                    'title' =>
                        $report->severity === 'severe'
                            ? 'Severe Flood Alert'
                            : 'Moderate Flood Alert',

                    'location' =>
                        $report->location,

                    'severity' =>
                        $report->severity,

                    'description' =>
                        $report->description,

                    'latitude' =>
                        $report->latitude,

                    'longitude' =>
                        $report->longitude,

                    'created_at' =>
                        $report->created_at,
                ];
            });

        return response()->json([
            'alerts' => $alerts,
        ]);
    }
}