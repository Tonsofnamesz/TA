
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Api\SiteController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\DeviceTypeController;
use App\Http\Controllers\Api\AssetController;
use App\Http\Controllers\Api\AssetAssignmentController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\UserController;

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user()->load('roles');
    });

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    // Admin-only management endpoints
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('assets', AssetController::class);
        Route::apiResource('sites', SiteController::class);
        Route::apiResource('departments', DepartmentController::class);
        Route::apiResource('suppliers', SupplierController::class);
        Route::apiResource('device-types', DeviceTypeController::class);
        Route::apiResource('asset-assignments', AssetAssignmentController::class);
        Route::apiResource('users', UserController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::post(
            '/asset-assignments/{assetAssignment}/return',
            [AssetAssignmentController::class, 'returnAsset']
        );
    });

    // Dashboard and reports: Admin and Viewer
    Route::middleware('role:admin|viewer')->group(function () {
        Route::get('/dashboard/summary', [DashboardController::class, 'summary']);
        Route::get('/dashboard/warranty', [DashboardController::class, 'warranty']);
        Route::get('/dashboard/device-types', [DashboardController::class, 'deviceTypes']);
        Route::get('/dashboard/sites', [DashboardController::class, 'sites']);
        Route::get('/dashboard/expiring-assets', [DashboardController::class, 'expiringAssets']);
        Route::get('/dashboard/departments', [DashboardController::class, 'departments']);

        Route::get('/reports/warranty', [ReportController::class, 'warrantyReport']);
        Route::get('/reports/assets', [ReportController::class, 'assetReport']);
    });
});
