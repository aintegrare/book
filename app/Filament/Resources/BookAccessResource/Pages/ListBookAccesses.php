<?php

namespace App\Filament\Resources\BookAccessResource\Pages;

use App\Filament\Resources\BookAccessResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListBookAccesses extends ListRecords
{
    protected static string $resource = BookAccessResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
