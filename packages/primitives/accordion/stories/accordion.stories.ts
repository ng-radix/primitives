import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { RdxAccordionContentDirective } from '../src/accordion-content.directive';
import { RdxAccordionHeaderDirective } from '../src/accordion-header.directive';
import { RdxAccordionItemDirective } from '../src/accordion-item.directive';
import { RdxAccordionRootDirective } from '../src/accordion-root.directive';
import { RdxAccordionTriggerDirective } from '../src/accordion-trigger.directive';

export default {
    title: 'Primitives/Accordion',
    decorators: [
        moduleMetadata({
            imports: [
                RdxAccordionRootDirective,
                RdxAccordionItemDirective,
                RdxAccordionHeaderDirective,
                RdxAccordionTriggerDirective,
                RdxAccordionContentDirective,

                BrowserAnimationsModule
            ],
            providers: [provideAnimations()]
        }),
        componentWrapperDecorator(
            (story) => `
                <div class="radix-themes light light-theme radix-themes-default-fonts"
                    data-accent-color="indigo"
                    data-radius="medium"
                    data-scaling="100%"
                >
                    ${story}
                </div>

                <style>
                    /* reset */
                    button,
                    h3 {
                        all: unset;
                    }

                    .AccordionRoot {
                        border-radius: 6px;
                        width: 300px;
                        background-color: var(--mauve-6);
                        box-shadow: 0 2px 10px var(--black-a4);
                    }

                    .AccordionItem {
                        overflow: hidden;
                        margin-top: 1px;
                    }

                    .AccordionItem:first-child {
                        margin-top: 0;
                        border-top-left-radius: 4px;
                        border-top-right-radius: 4px;
                    }

                    .AccordionItem:last-child {
                        border-bottom-left-radius: 4px;
                        border-bottom-right-radius: 4px;
                    }

                    .AccordionItem:focus-within {
                        position: relative;
                        z-index: 1;
                        box-shadow: 0 0 0 2px var(--mauve-12);
                    }

                    .AccordionHeader {
                        display: flex;
                    }

                    .AccordionTrigger {
                        font-family: inherit;
                        padding: 0 20px;
                        height: 45px;
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 15px;
                        line-height: 1;
                        color: var(--violet-11);
                        box-shadow: 0 1px 0 var(--mauve-6);
                        background-color: white;
                    }

                    .AccordionTrigger:hover {
                        background-color: var(--mauve-2);
                    }

                    .AccordionContent {
                        overflow: hidden;
                        font-size: 15px;
                        color: var(--mauve-11);
                        background-color: var(--mauve-2);
                    }
                    .AccordionContent[data-state='open'] {
                        animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
                    }
                    .AccordionContent[data-state='closed'] {
                        animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
                    }

                    .AccordionContentText {
                        padding: 15px 20px;
                    }

                    .AccordionChevron {
                        color: var(--violet-10);
                        transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
                    }
                    .AccordionTrigger[data-state='open'] > .AccordionChevron {
                        transform: rotate(180deg);
                    }

                    @keyframes slideDown {
                        from {
                            height: 0;
                        }
                        to {
                            height: var(--radix-accordion-content-height);
                        }
                    }

                    @keyframes slideUp {
                        from {
                            height: var(--radix-accordion-content-height);
                        }
                        to {
                            height: 0;
                        }
                    }
                </style>`
        )
    ]
} as Meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="AccordionRoot" AccordionRoot [defaultValue]="item2" [type]="'single'">
                <div #item1="AccordionItem" class="AccordionItem" AccordionItem>
                    <span class="AccordionTrigger" type="button" AccordionTrigger>Is it accessible?</span>
                    <div class="AccordionContent" AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</div>
                </div>

                <div #item2="AccordionItem" class="AccordionItem" AccordionItem>
                    <span class="AccordionTrigger" type="button" AccordionTrigger>Is it unstyled?</span>
                    <div class="AccordionContent" AccordionContent>
                        Yes. It's unstyled by default, giving you freedom over the look and feel.
                    </div>
                </div>

                <div #item3="AccordionItem" class="AccordionItem" AccordionItem>
                    <span class="AccordionTrigger" type="button" AccordionTrigger>Can it be animated?</span>
                    <div class="AccordionContent" AccordionContent>
                        <div class="AccordionContentText">
                            Yes! You can animate the Accordion with CSS or JavaScript.
                        </div>
                    </div>
                </div>
            </div>
        `
    })
};
