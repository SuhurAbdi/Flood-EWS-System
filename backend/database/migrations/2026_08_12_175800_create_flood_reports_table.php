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

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flood_reports');
    }
};