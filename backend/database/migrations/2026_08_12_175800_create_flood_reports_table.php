<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('flood_reports', function (Blueprint $table) {

            $table->id();

            $table->foreignId('user_id')
                  ->nullable()
                  ->constrained()
                  ->nullOnDelete();

            $table->string('location');

            $table->enum('severity', [
                'mild',
                'moderate',
                'severe'
            ]);

            $table->boolean('flood_occurred')
                  ->default(true);

            $table->text('description')
                  ->nullable();

            $table->string('photo')
                  ->nullable();

            $table->string('status')
                  ->default('pending');

            // XGBoost predicted flood risk
            $table->string('risk_level')
                  ->nullable();

            // GPS coordinates
            $table->decimal('latitude', 10, 7)
                  ->nullable();

            $table->decimal('longitude', 10, 7)
                  ->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flood_reports');
    }
};