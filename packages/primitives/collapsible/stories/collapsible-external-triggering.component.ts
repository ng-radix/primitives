import { Component } from '@angular/core';

import { RdxCollapsibleContentDirective } from '../src/collapsible-content.directive';
import { RdxCollapsibleRootDirective } from '../src/collapsible-root.directive';

@Component({
    selector: 'rdx-collapsible-external-triggering',
    standalone: true,
    imports: [RdxCollapsibleRootDirective, RdxCollapsibleContentDirective],
    styles: `
        .CollapsibleRoot {
            width: 300px;
        }

        .ExternalTrigger {
            font-family: inherit;
            border-radius: 8px;

            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: var(--violet-11);
            box-shadow: 0 2px 10px var(--black-a7);
            margin-bottom: 10px;
            padding: 4px;
        }

        .Text {
            color: var(--violet-11);
            font-size: 15px;
            line-height: 25px;
        }

        .Repository {
            background-color: white;
            border-radius: 4px;
            margin: 10px 0;
            padding: 10px;
            box-shadow: 0 2px 10px var(--black-a7);
        }
    `,
    template: `
        <button class="ExternalTrigger" (click)="open = !open">External Trigger</button>
        <div
            class="CollapsibleRoot"
            CollapsibleRoot
            #collapsibleRoot="collapsibleRoot"
            [open]="open"
        >
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <span class="Text" style="color: white">&#64;peduarte starred 3 repositories</span>
            </div>

            <div class="Repository">
                <span class="Text">&#64;radix-ui/primitives</span>
            </div>

            <div CollapsibleContent>
                <div class="Repository">
                    <span class="Text">&#64;radix-ui/colors</span>
                </div>
                <div class="Repository">
                    <span class="Text">&#64;stitches/react</span>
                </div>
            </div>
        </div>
    `
})
export class RdxCollapsibleExternalTriggeringComponent {
    open = true;
}
