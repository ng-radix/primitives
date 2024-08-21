import { computed, Directive, ElementRef, inject, input, InputSignal } from '@angular/core';

let idIterator = 0;

@Directive({
    selector: 'label[rdxLabel]',
    exportAs: 'rdxLabel',
    standalone: true,
    host: {
        '[attr.id]': 'this.elementId()',
        '[attr.for]': 'htmlFor ? htmlFor() : null',
        '(mousedown)': 'onMouseDown($event)'
    }
})
export class RdxLabelDirective {
    /**
     * @type string
     * @default 'rdx-label-{idIterator}'
     */
    readonly id: InputSignal<string> = input<string>(`rdx-label-${idIterator++}`);

    /**
     * @ignore
     */
    protected readonly elementId = computed(() => (this.id() ? this.id() : null));

    /**
     * The id of the element the label is associated with.
     * @type string
     * @default false
     */
    readonly htmlFor: InputSignal<string> = input<string>('');

    /**
     * @ignore
     */
    private readonly elementRef = inject(ElementRef<HTMLElement>);

    // prevent text selection when double-clicking label
    // The main problem with double-clicks in a web app is that
    // you will have to create special code to handle this on touch enabled devices.
    /**
     * @ignore
     */
    onMouseDown(event: MouseEvent): void {
        const target = event.target as HTMLElement;

        // only prevent text selection if clicking inside the label itself
        if (['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) {
            return;
        }

        // prevent text selection when double-clicking label
        if (this.elementRef.nativeElement.contains(target) && !event.defaultPrevented && event.detail > 1) {
            event.preventDefault();
        }
    }
}
