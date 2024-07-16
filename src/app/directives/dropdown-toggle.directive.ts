// dropdown-toggle.directive.ts

import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[data-dropdown-toggle]'
})
export class DropdownToggleDirective {
  @Input('data-dropdown-toggle') toggleId!: string;

  @HostBinding('attr.data-dropdown-toggle') get dropdownToggleAttr(): string {
    return this.toggleId;
  }
}