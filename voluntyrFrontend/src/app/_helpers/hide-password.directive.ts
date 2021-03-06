import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHidePassword]'
}
)
export class HidePasswordDirective {
  private _shown = false;
  constructor(private el: ElementRef, private render: Renderer2) {
    this.setup();
  }

  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = 'Hide Password';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = 'Show Password';
    }
  }

  setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('p');
    span.innerHTML = 'Show Password';
    span.style.color = 'white';
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }
}
