<?php

use App\Http\Controllers\CodeOtp\ValidateOtpCodeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/sendOtp', [ValidateOtpCodeController::class, 'sendOtpCode']);
Route::get('/validateOtp/{reference_id}/{verify_code}', [ValidateOtpCodeController::class, 'validateOtpCode']);