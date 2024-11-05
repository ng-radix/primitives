import { FocusableOption } from '@angular/cdk/a11y';
import { booleanAttribute, Directive, ElementRef, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RdxToggleGroupItemToken } from './toggle-group-item.token';
import { injectToggleGroup } from './toggle-group.token';

@Directive({
    selector: '[rdxToggleGroupItem]',
    exportAs: 'rdxToggleGroupItem',
    standalone: true,
    providers: [{ provide: RdxToggleGroupItemToken, useExisting: RdxToggleGroupItemDirective }],
    host: {
        role: 'radio',
        '[attr.aria-checked]': 'checked',
        '[attr.aria-disabled]': 'disabled || toggleGroup.disabled',
        '[attr.aria-pressed]': 'undefined',

        '[attr.data-disabled]': 'disabled || toggleGroup.disabled',
        '[attr.data-state]': 'checked ? "on" : "off"',
        '[attr.data-orientation]': 'toggleGroup.orientation',

        '(click)': 'toggle()'
    }
})
export class RdxToggleGroupItemDirective implements OnChanges, FocusableOption {
    /**
     * Access the toggle group.
     * @ignore
     */
    protected readonly toggleGroup = injectToggleGroup();

    private readonly elementRef = inject(ElementRef);
    /**
     * The value of this toggle button.
     */
    @Input({ required: true }) value!: string;

    /**
     * Whether this toggle button is disabled.
     * @default false
     */
    @Input({ transform: booleanAttribute }) disabled = false;

    /**
     * Whether this toggle button is checked.
     */
    protected get checked(): boolean {
        return this.toggleGroup.isSelected(this.value);
    }

    /**
     * @ignore
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ('disabled' in changes) {
            // TODO
        }
    }

    /**
     * @ignore
     */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }

    /**
     * @ignore
     */
    toggle(): void {
        if (this.disabled) {
            return;
        }

        this.toggleGroup.toggle(this.value);
    }

    /**
     * Ensure the disabled state is propagated to the roving focus item.
     * @internal
     * @ignore
     */
    updateDisabled(): void {
        // TODO
    }
}
