import { Directive, inject, InjectionToken } from '@angular/core';

import { RdxAccordionItemState } from './accordion-item.directive';
import { RdxCdkAccordionItem, RdxCdkAccordionItemToken } from './cdk-accordion-item.directive';

export const RdxAccordionContentToken = new InjectionToken<RdxAccordionContentDirective>(
    'RdxAccordionContentToken'
);

@Directive({
    selector: '[AccordionContent]',
    standalone: true,
    providers: [
        { provide: RdxAccordionContentToken, useExisting: RdxAccordionContentDirective },
        {
            provide: RdxCdkAccordionItemToken,
            useExisting: RdxCdkAccordionItem
        }
    ],
    host: {
        '[attr.hidden]': 'cdkAccordionItem.expanded ? undefined : ""',
        '[attr.data-state]': 'state'
        /*'[attr.data-disabled]': 'accordionItem.disabled',*/
        /*'[attr.data-orientation]': 'accordionItem.getOrientation'*/
    },
    hostDirectives: [RdxCdkAccordionItem]
})
export class RdxAccordionContentDirective {
    state: RdxAccordionItemState = 'closed';
    cdkAccordionItem = inject(RdxCdkAccordionItemToken);

    setOpen(state?: RdxAccordionItemState | undefined): void {
        if (state === undefined) {
            this.state = this.state === 'open' ? 'closed' : 'open';
        } else {
            this.state = state;
        }

        if (this.state === 'open') {
            this.cdkAccordionItem.open();
        } else {
            this.cdkAccordionItem.close();
        }
    }
}
