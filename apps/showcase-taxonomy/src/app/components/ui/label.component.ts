import { Directive } from '@angular/core';
import { RdxLabelRootDirective } from '@radix-ng/primitives/label';
import { cva } from 'class-variance-authority';

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

@Directive({
    selector: '[txLabel]',
    standalone: true,
    hostDirectives: [
        {
            directive: RdxLabelRootDirective,
            inputs: ['htmlFor']
        }
    ],
    host: {
        '[class]': '_computedClass()'
    }
})
export class LabelDirective {
    protected readonly _computedClass = labelVariants;
}
