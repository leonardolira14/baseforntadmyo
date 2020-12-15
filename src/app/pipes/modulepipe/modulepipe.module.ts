import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatStatusPipe } from '../formatstatus.pipe';
import { FormatLinksPipe } from '../formatdate.pipe';
import { FormatImageUrlPipe } from '../ImageLink.pipe';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormatLinksPipe,
    FormatImageUrlPipe,
    FormatStatusPipe
  ],
  exports: [
    FormatLinksPipe,
    FormatImageUrlPipe,
    FormatStatusPipe
  ]
})
export class ModulepipeModule { }
