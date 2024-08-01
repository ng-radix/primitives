import { booleanAttribute, Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RdxToggleGroupButtonToken } from './toggle-group-button.token';
import { injectToggleGroup } from './toggle-group.token';

@Directive({
    selector: 'button[rdxToggleGroupButton]',
    standalone: true,
    providers: [{ provide: RdxToggleGroupButtonToken, useExisting: RdxToggleGroupButtonDirective }],
    host: {
        role: 'radio',
        '[attr.aria-checked]': 'checked',
        '[attr.aria-disabled]': 'disabled || toggleGroup.disabled',
        '[attr.data-disabled]': 'disabled || toggleGroup.disabled',
        '[attr.data-state]': 'checked ? "on" : "off"',
        '[attr.data-orientation]': 'toggleGroup.orientation',

        '(click)': 'toggle()'
    }
})
export class RdxToggleGroupButtonDirective implements OnChanges {
    /**
     * Access the toggle group.
     * @ignore
     */
    protected readonly toggleGroup = injectToggleGroup();

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
