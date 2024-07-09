import { Directive } from '@angular/core';

import { injectAccordionItem, RdxAccordionItemState } from './accordion-item.directive';
import { injectAccordionRoot, RdxAccordionOrientation } from './accordion-root.directive';

@Directive({
    selector: '[AccordionTrigger]',
    standalone: true,
    host: {
        '(click)': 'onClick()',
        '[attr.data-state]': 'getState()',
        '[attr.data-disabled]': 'getDisabled()',
        '[attr.data-orientation]': 'getOrientation()'
    }
})
export class RdxAccordionTriggerDirective {
    /**
     * @ignore
     */
    private readonly accordionRoot = injectAccordionRoot();
    /**
     * @ignore
     */
    private readonly accordionItem = injectAccordionItem();

    /**
     * Fires when trigger clicked
     */
    onClick(): void {
        if (!this.accordionRoot.collapsible) {
            return;
        }

        this.accordionRoot.value = [this.accordionItem];
    }

    /**
     * @ignore
     */
    getState(): RdxAccordionItemState {
        return this.accordionItem.state();
    }

    /**
     * @ignore
     */
    getDisabled(): boolean | undefined {
        return this.accordionItem.disabled() || undefined;
    }

    /**
     * @ignore
     */
    getOrientation(): RdxAccordionOrientation {
        return this.accordionRoot.getOrientation();
    }
}
