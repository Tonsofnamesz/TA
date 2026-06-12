<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id();

            $table->string('serial_number')->unique();

            $table->foreignId('device_type_id')
                ->constrained()
                ->cascadeOnUpdate();

            $table->foreignId('supplier_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('manufacturer')->nullable();

            $table->string('model')->nullable();

            $table->string('version')->nullable();

            $table->decimal('ram_gb', 8, 2)->nullable();

            $table->integer('storage_gb')->nullable();

            $table->string('invoice_number')->nullable();

            $table->decimal('purchase_price', 15, 2)->nullable();

            $table->string('capex_number')->nullable();

            $table->date('ship_date')->nullable();

            $table->date('warranty_start')->nullable();

            $table->date('warranty_end')->nullable();

            $table->string('country')->nullable();

            $table->enum('status', [
                'available',
                'assigned',
                'broken',
                'lost',
                'disposed'
            ])->default('available');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
