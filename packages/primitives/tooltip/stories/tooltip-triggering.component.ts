import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { RdxTooltipModule } from '../index';

@Component({
    selector: 'rdx-tooltip-triggering',
    imports: [
        FormsModule,
        RdxTooltipModule,
        LucideAngularModule
    ],
    styles: `
        .container {
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* reset */
        button {
            all: unset;
        }

        .TooltipContent {
            border-radius: 4px;
            padding: 10px 15px;
            font-size: 15px;
            line-height: 1;
            color: var(--violet-11);
            background-color: white;
            box-shadow:
                hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
                hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
            user-select: none;
            animation-duration: 400ms;
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
            will-change: transform, opacity;
        }
        .TooltipContent[data-state='delayed-open'][data-side='top'] {
            animation-name: slideDownAndFade;
        }
        .TooltipContent[data-state='delayed-open'][data-side='right'] {
            animation-name: slideLeftAndFade;
        }
        .TooltipContent[data-state='delayed-open'][data-side='bottom'] {
            animation-name: slideUpAndFade;
        }
        .TooltipContent[data-state='delayed-open'][data-side='left'] {
            animation-name: slideRightAndFade;
        }

        .TooltipArrow {
            fill: white;
        }

        .IconButton {
            font-family: inherit;
            border-radius: 100%;
            height: 35px;
            width: 35px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: var(--violet-11);
            background-color: white;
            box-shadow: 0 2px 10px var(--black-a7);
        }
        .IconButton:hover {
            background-color: var(--violet-3);
        }
        .IconButton:focus {
            box-shadow: 0 0 0 2px black;
        }

        @keyframes slideUpAndFade {
            from {
                opacity: 0;
                transform: translateY(2px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideRightAndFade {
            from {
                opacity: 0;
                transform: translateX(-2px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideDownAndFade {
            from {
                opacity: 0;
                transform: translateY(-2px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideLeftAndFade {
            from {
                opacity: 0;
                transform: translateX(2px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        /* =============== Trigger layout =============== */

        .TriggerContainer {
            display: flex;
            column-gap: 8px;
            color: var(--white-a12);
            margin-bottom: 32px;
            align-items: baseline;

            button {
                color: var(--violet-11);
                background-color: white;
                box-shadow: 0 2px 10px var(--black-a7);
                padding: 4px 8px;
                border-radius: 4px;
            }
        }
    `,
    template: `
        <div class="TriggerContainer">
            <button (click)="trigger()" type="button">Open: {{ isOpen() }}</button>
            <span>onOpenChange count: {{ counter() }}</span>
        </div>
        <div class="container">
            <ng-container [open]="isOpen()" (onOpenChange)="count()" rdxTooltipRoot>
                <button class="IconButton" #triggerElement rdxTooltipTrigger>
                    <lucide-angular [img]="PlusIcon" size="16" style="display: flex" />
                </button>

                <ng-template [sideOffset]="8" rdxTooltipContent>
                    <div class="TooltipContent" rdxTooltipContentAttributes>
                        Add to library
                        <br />
                        or do nothing
                        <div class="TooltipArrow" rdxTooltipArrow></div>
                    </div>
                </ng-template>
            </ng-container>
        </div>
    `
})
export class RdxTooltipTriggeringComponent {
    readonly PlusIcon = Plus;

    isOpen = signal(false);
    counter = signal(0);

    trigger(): void {
        this.isOpen.update((value) => !value);
    }

    count(): void {
        this.counter.update((value) => value + 1);
    }
}
