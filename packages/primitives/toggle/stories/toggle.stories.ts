import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { Italic, LucideAngularModule } from 'lucide-angular';
import { RdxToggleRootDirective } from '../src/toggle-root.directive';

export default {
    title: 'Primitives/Toggle',
    decorators: [
        moduleMetadata({
            imports: [
                RdxToggleRootDirective,
                LucideAngularModule,
                LucideAngularModule.pick({ Italic })
            ]
        }),
        componentWrapperDecorator(
            (story) =>
                `<div class="radix-themes light light-theme"
                      data-radius="medium"
                      data-scaling="100%">${story}

                        <style>
                            button {
                                all: unset;
                            }
                            .Toggle {
                              background-color: white;
                              color: var(--mauve-11);
                              height: 35px;
                              width: 35px;
                              border-radius: 4px;
                              display: flex;
                              font-size: 15px;
                              line-height: 1;
                              align-items: center;
                              justify-content: center;
                              box-shadow: 0 2px 10px var(--black-a7);
                            }
                            .Toggle:hover {
                              background-color: var(--violet-3);
                            }
                            .Toggle[data-state='on'] {
                              background-color: var(--violet-6);
                              color: var(--violet-12);
                            }
                            .Toggle:focus {
                              box-shadow: 0 0 0 2px black;
                            }
                        </style>

                      </div>`
        )
    ],
    argTypes: {
        pressed: {
            control: 'boolean'
        }
    }
} as Meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
<button ToggleRoot aria-label="Toggle italic" class="Toggle">
    <lucide-angular name="italic" size="16"></lucide-angular>
</button>
`
    })
};

export const State: Story = {
    render: () => ({
        template: `
<button ToggleRoot [pressed]="pressed" aria-label="Toggle italic" class="Toggle">
    <lucide-angular name="italic" size="16"></lucide-angular>
</button>
`
    })
};
