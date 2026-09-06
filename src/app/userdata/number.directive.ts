import { Directive, HostListener } from '@angular/core';

@Directive({
  // ADD SQUARE BRACKETS HERE so Angular treats it as an attribute
  selector: '[numbersInp]', 
  standalone: true
})
export class OnlyNumbersDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    
    // 1. Allow control keys
    if (allowedKeys.includes(event.key)) {
      return;
    }

    // 2. Explicitly block the Spacebar, and block any non-numeric keystrokes
    if (event.key === ' ' || isNaN(Number(event.key))) {
      event.preventDefault();
    }
  }
}