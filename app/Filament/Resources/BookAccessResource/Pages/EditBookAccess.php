<?php

namespace App\Filament\Resources\BookAccessResource\Pages;

use App\Filament\Resources\BookAccessResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditBookAccess extends EditRecord
{
    protected static string $resource = BookAccessResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
