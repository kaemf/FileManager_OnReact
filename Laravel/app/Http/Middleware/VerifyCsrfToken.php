<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Все URI исключены из проверки CSRF.
     *
     * @var array<int, string>
     */
    protected $except = [
        '*' // Отключаем CSRF для всех запросов
    ];
}