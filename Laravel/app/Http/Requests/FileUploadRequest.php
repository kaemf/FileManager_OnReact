<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FileUploadRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'file' => 'required|file|max:102400000',
            'name' => 'required|string|max:255',
        ];
    }
}