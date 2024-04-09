import { Component } from '@angular/core';

import { LabelDirective } from '../../label/src/label.directive';
import { SwitchDirective } from '../src/switch.directive';
import { SwitchThumbDirective } from '../src/switch-thumb.directive';

@Component({
    selector: 'rdx-switch',
    styles: `
        button {
            all: unset;
        }

        .SwitchRoot {
            width: 42px;
            height: 25px;
            background-color: color(display-p3 0 0 0/0.7);
            border-radius: 9999px;
            position: relative;
            box-shadow: 0 2px 10px color(display-p3 0 0 0/0.5);
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        .SwitchRoot:focus {
            box-shadow: 0 0 0 2px black;
        }
        .SwitchRoot[data-state='checked'] {
            background-color: black;
        }

        .SwitchThumb {
            display: block;
            width: 21px;
            height: 21px;
            background-color: white;
            border-radius: 9999px;
            box-shadow: 0 2px 2px color(display-p3 0 0 0/0.5);
            transition: transform 100ms;
            transform: translateX(2px);
            will-change: transform;
        }
        .SwitchThumb[data-state='checked'] {
            transform: translateX(19px);
        }

        .Label {
            color: black;
            font-size: 15px;
            line-height: 1;
        }

    `,
    template: `
        <label rdxLabel class="Label" style="display: flex; align-items: center;">
            Airplane mode
            <button class="SwitchRoot" rdxSwitch [(checked)]="checked">
                <span class="SwitchThumb" rdxSwitchThumb></span>
            </button>
        </label>
    `,
    standalone: true,
    imports: [LabelDirective, SwitchDirective, SwitchThumbDirective]
})
export class SwitchComponent {
    checked = true;
}
