<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FileBulkActionRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'offset' => 'required|integer|min:0',
            'limit' => 'required|integer|min:1',
            'prefix' => 'sometimes|string|max:255',
        ];
    }
}