import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'custompipe', standalone: true })
export class CustomTitleCasePipe implements PipeTransform {
    transform(value: string | null | undefined): string {

        if (!value) return '';

        return value
            .split(' ')
            .map(word => {
                if (!word) return '';
                // Capitalize the first letter, and append the rest of the word untouched
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');

    }
}