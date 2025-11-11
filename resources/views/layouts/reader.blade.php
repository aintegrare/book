<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }} - Reader</title>

        <!-- Material Design CSS -->
        <link rel="stylesheet" href="{{ asset('css/material-base.css') }}">
        <link rel="stylesheet" href="{{ asset('css/material-typography.css') }}">
        <link rel="stylesheet" href="{{ asset('css/material-components.css') }}">

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])

        <style>
            /* Reading Font Override - Literata for better reading experience */
            .reading-content {
                font-family: 'Literata', 'Georgia', serif;
            }
        </style>
    </head>
    <body class="antialiased">
        {{ $slot }}
    </body>
</html>
