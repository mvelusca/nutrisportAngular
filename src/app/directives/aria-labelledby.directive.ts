// aria-labelledby.directive.ts

import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[aria-labelledby]'
})
export class AriaLabelledbyDirective {
  @Input('aria-labelledby') labelledById!: string;

  @HostBinding('attr.aria-labelledby') get labelledByAttr(): string {
    return this.labelledById;
  }
}