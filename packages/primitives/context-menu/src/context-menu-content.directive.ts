import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { Directive, inject, Input } from '@angular/core';
import { pairwise, startWith, Subject } from 'rxjs';
import { RdxContextMenuItemDirective } from './context-menu-item.directive';
import { RdxContextMenuTriggerDirective } from './context-menu-trigger.directive';

@Directive({
    selector: '[rdxContextMenuContent]',
    standalone: true,
    host: {
        '[attr.data-state]': "menuTrigger.isOpen() ? 'open': 'closed'",
        '[attr.data-orientation]': 'orientation'
    },
    providers: [
        {
            provide: CdkMenu,
            useExisting: RdxContextMenuContentDirective
        }
    ]
})
export class RdxContextMenuContentDirective extends CdkMenu {
    readonly highlighted = new Subject<RdxContextMenuItemDirective>();
    readonly menuTrigger = inject(RdxContextMenuTriggerDirective, { optional: true });

    @Input() onEscapeKeyDown: (event?: Event) => void = () => undefined;
    @Input() closeOnEscape: boolean = true;

    constructor() {
        super();

        this.highlighted.pipe(startWith(null), pairwise()).subscribe(([prev, item]) => {
            if (prev) {
                prev.highlighted = false;
            }

            if (item) {
                item.highlighted = true;
            }
        });
    }

    updateActiveItem(item: CdkMenuItem) {
        this.keyManager.updateActiveItem(item);
    }
}
