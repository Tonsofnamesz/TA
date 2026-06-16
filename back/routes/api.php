<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Api\SiteController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\DeviceTypeController;
use App\Http\Controllers\Api\AssetController;
use App\Http\Controllers\Api\AssetAssignmentController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ReportController;

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::apiResource('assets', AssetController::class);
    Route::apiResource('sites', SiteController::class);
    Route::apiResource('departments', DepartmentController::class);
    Route::apiResource('suppliers', SupplierController::class);
    Route::apiResource('device-types', DeviceTypeController::class);
    Route::apiResource('asset-assignments', AssetAssignmentController::class);
    Route::post(
        '/asset-assignments/{assetAssignment}/return',
        [AssetAssignmentController::class, 'returnAsset']
    );
});

Route::middleware('auth:sanctum')->group(function () {

    Route::get(
        '/dashboard/summary',
        [DashboardController::class, 'summary']
    );

    Route::get(
        '/dashboard/warranty',
        [DashboardController::class, 'warranty']
    );

    Route::get(
        '/dashboard/device-types',
        [DashboardController::class, 'deviceTypes']
    );

    Route::get(
        '/dashboard/sites',
        [DashboardController::class, 'sites']
    );

    Route::get(
        '/dashboard/expiring-assets',
        [DashboardController::class, 'expiringAssets']
    );

    Route::get(
        '/dashboard/departments',
        [DashboardController::class, 'departments']
    );
    Route::get(
        '/reports/warranty',
        [ReportController::class, 'warrantyReport']
    );

    Route::get(
        '/reports/assets',
        [ReportController::class, 'assetReport']
    );
});
