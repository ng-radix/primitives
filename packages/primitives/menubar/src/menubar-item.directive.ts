import { BooleanInput } from '@angular/cdk/coercion';
import { CdkMenuItem } from '@angular/cdk/menu';
import {
    booleanAttribute,
    computed,
    Directive,
    effect,
    inject,
    input,
    signal
} from '@angular/core';

@Directive({
    selector: '[MenuBarItem]',
    standalone: true,
    hostDirectives: [CdkMenuItem],
    host: {
        role: 'menuitem',
        type: 'button',
        tabindex: '0',
        '[attr.data-orientation]': "'horizontal'",
        '[attr.data-disabled]': "disabledState() ? '' : undefined",
        '[disabled]': 'disabledState()'
    }
})
export class RdxMenuItemDirective {
    private readonly cdkMenuItem = inject(CdkMenuItem, { host: true });

    readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    protected readonly disabledState = computed(() => this.disabled());

    constructor() {
        effect(() => {
            this.cdkMenuItem.disabled = this.disabled();
        });
    }
}
