import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngInstSmoothHover]',
})
export class SmoothHoverDirective implements OnInit {
  @Input()
  public defaultBackgroundColor = 'transparent';

  @Input()
  public hoverBackgroundColor = '#F9F9F9';

  private svgElement: SVGElement | null = null;
  private hostNativeElement: HTMLElement | null = null;

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    this.hostNativeElement = this.hostElement.nativeElement;
    this.svgElement = this.findSvgElementInTree(this.hostElement.nativeElement.children);

    if (!this.svgElement) {
      throw new Error('[ngInstSmoothHover] directive must have svg element as a child');
    }

    this.renderer.setStyle(this.hostNativeElement, 'background-color', this.defaultBackgroundColor);
    this.renderer.setStyle(this.hostNativeElement, 'transition', 'ease-in 0.1s');
    this.renderer.setStyle(this.svgElement, 'transition', 'ease-in 0.2s');
  }

  @HostListener('mouseover')
  public onMouseOver(): void {
    this.renderer.setStyle(this.hostNativeElement, 'background-color', this.hoverBackgroundColor);
    this.renderer.setStyle(this.svgElement, 'scale', '105%');
  }

  @HostListener('mouseout')
  public onMouseOut(): void {
    this.renderer.setStyle(this.hostNativeElement, 'background-color', this.defaultBackgroundColor);
    this.renderer.setStyle(this.svgElement, 'scale', '100%');
  }

  private findSvgElementInTree(children: HTMLCollection): SVGElement | null {
    for (let i = 0; i < children.length; i++) {
      if (children[i] instanceof SVGElement) {
        return <SVGElement>children[i];
      }

      if (children[i]?.children.length > 0) {
        return this.findSvgElementInTree(children[i].children);
      }
    }

    return null;
  }
}
