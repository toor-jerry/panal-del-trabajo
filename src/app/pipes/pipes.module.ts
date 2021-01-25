import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { CapitalizadoPipe } from './capitalizado.pipe';
import { DomseguroPipe } from './domseguro.pipe';
import { SizePipe } from './size.pipe';


@NgModule({
  declarations: [
    ImagePipe,
    CapitalizadoPipe,
    DomseguroPipe,
    ImagePipe,
    SizePipe
  ],
  imports: [],
  exports: [
    ImagePipe,
    CapitalizadoPipe,
    DomseguroPipe,
    ImagePipe,
    SizePipe
  ]
})
export class PipesModule { }
