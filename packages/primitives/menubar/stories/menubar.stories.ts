import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { Check, Dot, LucideAngularModule } from 'lucide-angular';

import { MenubarModule } from '../index';

export default {
    title: 'Primitives/Menubar [In Progress]',
    decorators: [
        moduleMetadata({
            imports: [MenubarModule, LucideAngularModule, LucideAngularModule.pick({ Check, Dot })]
        }),
        componentWrapperDecorator(
            (story) => `
                <div class="radix-themes light light-theme radix-themes-default-fonts rt-Flex rt-r-ai-start rt-r-jc-center rt-r-position-relative"
                    data-accent-color="indigo"
                    data-radius="medium"
                    data-scaling="100%"
                >
                    ${story}
                </div>`
        )
    ]
} as Meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
<div MenuBarRoot class="MenubarRoot">
  <button class="MenubarTrigger" MenuBarItem [MenuBarTrigger]="file">
    File
  </button>
  <button class="MenubarTrigger" MenuBarItem [MenuBarTrigger]="edit">
    Edit
  </button>
  <button class="MenubarTrigger" MenuBarItem [MenuBarTrigger]="view">
    View
  </button>
  <button class="MenubarTrigger" MenuBarItem [MenuBarTrigger]="profiles">
    Profiles
  </button>
</div>

<ng-template #profiles>
  <div class="MenubarContent" MenuBarContent>
    <div MenubarRadioGroup>
        <button class="MenubarRadioItem inset" MenubarItemRadio>
            <lucide-icon class="MenubarItemIndicator" name="dot"/>Andy
        </button>
        <button class="MenubarRadioItem inset" MenubarItemRadio checked>
            <lucide-icon class="MenubarItemIndicator" name="dot"/>Luis
        </button>
    </div>
    <div MenubarSeparator class="MenubarSeparator"></div>
    <button MenuBarItem class="MenubarItem inset">Edit</button>
  </div>
</ng-template>

<ng-template #view>
  <div class="MenubarContent" MenuBarContent>
    <button class="MenubarCheckboxItem inset" MenubarCheckboxItem>
        <lucide-icon class="MenubarItemIndicator" size="16" name="check" />Always Show Bookmarks Bar
    </button>
    <button class="MenubarCheckboxItem inset" MenubarCheckboxItem checked>
        <lucide-icon class="MenubarItemIndicator" size="16" name="check" />Always Show Full URLs
    </button>
    <div MenubarSeparator class="MenubarSeparator"></div>
    <button class="MenubarItem" MenuBarItem>Reload <div class="RightSlot">⌘ R</div></button>
  </div>
</ng-template>

<ng-template #file>
  <div class="MenubarContent" MenuBarContent>
    <button class="MenubarItem" MenuBarItem>
        New Tab <div class="RightSlot">⌘ T</div>
    </button>
    <button class="MenubarItem" MenuBarItem>
        New Window <div class="RightSlot">⌘ N</div>
    </button>
    <button class="MenubarItem" MenuBarItem disabled>
        New Incognito Window
    </button>
    <div MenubarSeparator class="MenubarSeparator"></div>
    <button class="MenubarItem" MenuBarItem [MenuBarTrigger]="share">
        Share <div class="RightSlot">></div>
    </button>
    <div MenubarSeparator class="MenubarSeparator"></div>
    <button class="MenubarItem" MenuBarItem>
        Print… <div class="RightSlot">⌘ P</div>
    </button>
  </div>
</ng-template>

<ng-template #edit>
  <div class="MenubarContent" MenuBarContent>
    <button class="MenubarItem" MenuBarItem>Undo <div class="RightSlot">⌘ Z</div></button>
    <button class="MenubarItem" MenuBarItem>Redo <div class="RightSlot">⇧ ⌘ Z</div></button>
    <div MenubarSeparator class="MenubarSeparator"></div>
    <button class="MenubarItem" MenuBarItem>Cut</button>
    <button class="MenubarItem" MenuBarItem>Copy</button>
    <button class="MenubarItem" MenuBarItem>Paste</button>
  </div>
</ng-template>

<ng-template #share>
  <div class="MenubarSubContent" MenuBarContent>
    <button class="MenubarItem" MenuBarItem>Undo</button>
    <button class="MenubarItem" MenuBarItem>Redo</button>
    <div MenubarSeparator class="MenubarSeparator"></div>
    <button class="MenubarItem" MenuBarItem>Cut</button>
    <button class="MenubarItem" MenuBarItem>Copy</button>
    <button class="MenubarItem" MenuBarItem>Paste</button>
  </div>
</ng-template>

<style>
/* reset */
button {
  all: unset;
}

.MenubarRoot {
  display: flex;
  background-color: white;
  padding: 3px;
  border-radius: 6px;
  box-shadow: 0 2px 10px var(--black-a7);
}

.MenubarTrigger {
  padding: 8px 12px;
  outline: none;
  user-select: none;
  font-weight: 500;
  line-height: 1;
  border-radius: 4px;
  color: var(--violet-11);
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
}

.MenubarTrigger[data-highlighted],
.MenubarTrigger[data-state='open'] {
  background-color: var(--violet-4);
}

.MenubarContent,
.MenubarSubContent {
  flex-direction: column;
  display: inline-flex;
  min-width: 220px;
  background-color: white;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  will-change: transform, opacity;
}

.MenubarItem,
.MenubarSubTrigger,
.MenubarCheckboxItem,
.MenubarRadioItem {
  all: unset;
  font-size: 13px;
  line-height: 1;
  color: var(--violet-11);
  border-radius: 4px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 10px;
  position: relative;
  user-select: none;
}

.MenubarItem.inset,
.MenubarSubTrigger.inset,
.MenubarCheckboxItem.inset,
.MenubarRadioItem.inset {
  padding-left: 20px;
}

.MenubarItem[data-disabled],
.MenubarSubTrigger[data-disabled],
.MenubarCheckboxItem[data-disabled],
.MenubarRadioItem[data-disabled] {
  color: var(--mauve-8);
  pointer-events: none;
}

.MenubarItemIndicator {
  position: absolute;
  left: 0;
  width: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.MenubarRadioItem:hover,
.MenubarCheckboxItem:hover,
.MenubarItem:hover {
  background-color: var(--violet-11);
  color: white;
}

.MenubarSeparator {
  height: 1px;
  background-color: var(--violet-6);
  margin: 5px;
}

.RightSlot {
  margin-left: auto;
  padding-left: 20px;
  color: var(--mauve-9);
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;
}

</style>
`
    })
};
