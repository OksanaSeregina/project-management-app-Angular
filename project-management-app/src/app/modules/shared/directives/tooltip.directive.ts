import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  constructor(private elementRef: ElementRef) {}

  @Input() public appTooltip: string;

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    const element = this.elementRef.nativeElement;
    if (element.textContent.trim().endsWith('...')) {
      element.setAttribute('data-tooltip', this.appTooltip);
    } else if (element.title) element.removeAttribute('data-tooltip');
  }
}
