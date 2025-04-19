<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FileUploadRequest;
use App\Http\Requests\FileRenameRequest;
use App\Http\Requests\FileBulkActionRequest;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class FileController extends Controller
{
    public function index(Request $request)
    {
        $query = File::query();

        if ($request->filled('sortBy') && $request->filled('order')) {
            $query->orderBy($request->input('sortBy'), $request->input('order'));
        }

        $files = $query->offset($request->input('offset', 0))
                    ->limit($request->input('limit', 10))
                    ->get();

        return response()->json($files);
    }

    public function count(Request $request)
    {
        $query = File::query();
        $total = $query->count();

        return response()->json([
            'total' => $total,
        ]);
    }

    public function store(FileUploadRequest $request)
    {
        try {
            if (!$request->hasFile('file') || !$request->file('file')->isValid()) {
                return response()->json(['error' => 'Invalid file'], 400);
            }
            $path = $request->file('file')->store('uploads');
    
            $file = File::create([
                'name' => $request->input('name'),
                'path' => $path,
                'uploaded_at' => now(),
            ]);
    
            return response()->json([
                'message' => 'File uploaded successfully',
                'file' => $file
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error uploading file'], 500);
        }
    }

    public function show($name)
    {
        $file = File::where('name', $name)->firstOrFail();

        return Storage::download($file->path, $file->name);
    }

    public function update(FileRenameRequest $request, $name)
    {
        $file = File::where('name', $name)->firstOrFail();
        $file->update(['name' => $request->name]);
        return response()->json(['message' => 'File renamed']);
    }

    public function destroy($name)
    {
        $file = File::where('name', $name)->firstOrFail();
        Storage::delete($file->path);
        $file->delete();

        return response()->json(['message' => 'File deleted']);
    }

    public function bulkRename(FileBulkActionRequest $request)
    {
        $query = File::query();

        if ($request->filled('sortBy') && $request->filled('order')) {
            $query->orderBy($request->input('sortBy'), $request->input('order'));
        }

        $files = $query->offset($request->input('offset', 0))
                    ->limit($request->input('limit', 10))
                    ->get();

        foreach ($files as $index => $file) {
            $file->update(['name' => $request->prefix . '_' . ($request->offset + $index)]);
        }

        return response()->json(['message' => 'Files renamed']);
    }

    public function bulkDelete(FileBulkActionRequest $request)
    {
        $query = File::query();

        if ($request->filled('sortBy') && $request->filled('order')) {
            $query->orderBy($request->input('sortBy'), $request->input('order'));
        }

        $files = $query->offset($request->input('offset', 0))
                    ->limit($request->input('limit', 10))
                    ->get();

        foreach ($files as $file) {
            Storage::delete($file->path);
            $file->delete();
        }

        return response()->json(['message' => 'Files deleted']);
    }

    public function bulkDownload(Request $request)
    {
        $files = File::offset($request->offset)->limit($request->limit)->get();

        if ($files->isEmpty()) {
            return response()->json(['error' => 'No files found'], 404);
        }

        $zipFileName = 'files_' . now()->timestamp . '.zip';
        $zipPath = storage_path('app/' . $zipFileName);
        $zip = new ZipArchive;

        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== TRUE) {
            return response()->json(['error' => 'Failed to create ZIP file'], 500);
        }

        foreach ($files as $file) {
            $fullPath = Storage::path($file->path);

            if (file_exists($fullPath)) {
                $zip->addFile($fullPath, $file->name);
            } else {
                return response()->json(['error' => 'File not found: ' . $file->name], 404);
            }
        }

        $zip->close();

        return response()->download($zipPath)->deleteFileAfterSend(true);
    }
}
