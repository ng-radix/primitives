import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RdxDropdownMenuContentDirective } from '../src/dropdown-menu-content.directive';
import { RdxDropdownMenuItemCheckboxDirective } from '../src/dropdown-menu-item-checkbox.directive';
import { RdxDropdownMenuItemIndicatorDirective } from '../src/dropdown-menu-item-indicator.directive';
import { RdxDropdownMenuItemDirective } from '../src/dropdown-menu-item.directive';
import { RdxDropdownMenuLabelDirective } from '../src/dropdown-menu-label.directive';
import { RdxDropdownMenuSeparatorDirective } from '../src/dropdown-menu-separator.directive';
import { RdxDropdownMenuTriggerDirective } from '../src/dropdown-menu-trigger.directive';

@Component({
    selector: 'dropdown-menu-item-checkbox',
    styleUrl: 'dropdown-menu-item-checkbox.styles.scss',
    template: `
        <button
            class="IconButton"
            [rdxDropdownMenuTrigger]="menu"
            sideOffset="4"
            alignOffset="-5"
            aria-label="Customise options"
        >
            <lucide-angular size="16" name="menu" style="height: 1.2rem;"></lucide-angular>
        </button>

        <ng-template #menu>
            <div class="DropdownMenuContent" [onEscapeKeyDown]="onEscapeKeyDown" rdxDropdownMenuContent>
                <button
                    class="DropdownMenuItem"
                    [(checked)]="itemState"
                    (onSelect)="onSelect()"
                    rdxDropdownMenuItemCheckbox
                >
                    <div class="DropdownMenuItemIndicator" rdxDropdownMenuItemIndicator>
                        <lucide-icon size="16" name="check"></lucide-icon>
                    </div>
                    New Tab
                    <div class="RightSlot">⌘ T</div>
                </button>
                <button class="DropdownMenuItem" rdxDropdownMenuItemCheckbox disabled>
                    New Window
                    <div class="RightSlot">⌘ N</div>
                </button>
                <button
                    class="DropdownMenuItem"
                    [(checked)]="itemState2"
                    (onSelect)="onSelect()"
                    rdxDropdownMenuItemCheckbox
                >
                    <div class="DropdownMenuItemIndicator" rdxDropdownMenuItemIndicator>
                        <lucide-icon size="16" name="check"></lucide-icon>
                    </div>
                    New Incognito Window
                </button>
                <div class="DropdownMenuSeparator" rdxDropdownMenuSeparator></div>
                <div class="DropdownMenuLabel" rdxDropdownMenuLabel>Label</div>
                <button class="DropdownMenuItem DropdownMenuSubTrigger" (onSelect)="onSelect()" rdxDropdownMenuItem>
                    Share
                </button>
                <div class="DropdownMenuSeparator" rdxDropdownMenuSeparator></div>
                <button class="DropdownMenuItem" (onSelect)="onSelect()" rdxDropdownMenuItem>
                    Print…
                    <div class="RightSlot">⌘ P</div>
                </button>
            </div>
        </ng-template>
    `,
    standalone: true,
    imports: [
        RdxDropdownMenuTriggerDirective,
        RdxDropdownMenuItemDirective,
        RdxDropdownMenuItemCheckboxDirective,
        RdxDropdownMenuItemIndicatorDirective,
        RdxDropdownMenuSeparatorDirective,
        RdxDropdownMenuContentDirective,
        RdxDropdownMenuLabelDirective,
        LucideAngularModule
    ]
})
export class DropdownMenuItemCheckboxExampleComponent {
    itemState = true;
    itemState2 = false;

    onSelect() {
        console.log('onSelect');
    }

    onEscapeKeyDown(event: Event) {
        event.stopPropagation();

        console.log('onEscapeKeyDown: ', event);
    }
}
