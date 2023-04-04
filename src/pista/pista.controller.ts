import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { Pista } from './pista';
import { PistaService } from './pista.service';



@Controller('pista')
export class PistaController {
    constructor(private pistaService: PistaService) { }

    // @Get()
    // public getPistas(): Pista[] {
    // return this.pistaService.getPistas();
    // }
    @Get()
    public getLista(): Pista[] {
        return this.pistaService.getLista();
    }
    @Post()
    create(@Body() pista: any): string {
        return this.pistaService.addPista(pista);
    }

    @Get('id')
    public getPista(@Param('id') id): Pista {
        return this.pistaService.getPista(parseInt(id));
    }


    @Delete(':id')
    public deletePista(@Param('id') id: number): string {
        return this.pistaService.deletePista(id)
    }

    @Put(':id')
    public update(@Body() pista: any, @Param('id') id: number): string {
        return this.pistaService.updatePista(id, pista)

    }
}
