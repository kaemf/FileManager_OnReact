<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FileController;

// Группа маршрутов для файлов
Route::prefix('files')->group(function () {
    Route::get('/', [FileController::class, 'index']);
    Route::get('/count', [FileController::class, 'count']);
    Route::post('/', [FileController::class, 'store']);
    Route::get('download/{name}', [FileController::class, 'show']);
    Route::put('update/{name}', [FileController::class, 'update']);
    Route::delete('delete/{name}', [FileController::class, 'destroy']);
    Route::put('bulk/rename', [FileController::class, 'bulkRename']);
    Route::delete('bulk/delete', [FileController::class, 'bulkDelete']);
    Route::get('bulk/download', [FileController::class, 'bulkDownload']);
});

// Проверка CORS
Route::get('/test-cors', function () {
    return response()->json(['message' => 'CORS works!']);
});

// Ручка для корня API (если она все же нужна, переместите вне группы API)
Route::get('/', function (Request $request) {
    return response()->json(['message' => 'API Root']);
});