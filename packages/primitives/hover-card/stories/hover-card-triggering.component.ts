import { Component, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, MountainSnow, TriangleAlert, X } from 'lucide-angular';
import { RdxHoverCardModule } from '../index';
import { RdxHoverCardContentAttributesComponent } from '../src/hover-card-content-attributes.component';
import { provideRdxCdkEventService } from '../src/utils/cdk-event.service';
import { containerAlert } from './utils/constants';
import { OptionPanelBase } from './utils/option-panel-base.class';
import styles from './utils/styles.constants';
import { WithOptionPanelComponent } from './utils/with-option-panel.component';

@Component({
    selector: 'rdx-hover-card-triggering',
    providers: [provideRdxCdkEventService()],
    imports: [
        FormsModule,
        RdxHoverCardModule,
        LucideAngularModule,
        RdxHoverCardContentAttributesComponent,
        WithOptionPanelComponent
    ],
    styles: styles(),
    template: `
        <p class="ExampleSubtitle">Initially closed</p>
        <with-option-panel
            [arrowWidth]="arrowWidth()"
            [arrowHeight]="arrowHeight()"
            [openDelay]="openDelay()"
            [closeDelay]="closeDelay()"
            (onOverlayEscapeKeyDownDisabledChange)="onOverlayEscapeKeyDownDisabled.set($event)"
            (onOverlayOutsideClickDisabledChange)="onOverlayOutsideClickDisabled.set($event)"
            (arrowWidthChange)="arrowWidth.set($event)"
            (arrowHeightChange)="arrowHeight.set($event)"
            (openDelayChange)="openDelay.set($event)"
            (closeDelayChange)="closeDelay.set($event)"
        >
            <div class="ParamsContainer">
                <button (mouseup)="triggerOpenFalse()" type="button">Open: {{ isOpenFalse() }}</button>
                onOpenChange count: {{ counterOpenFalse() }}
            </div>

            <div class="ParamsContainer">
                <input
                    [ngModel]="externalControlFalse()"
                    (ngModelChange)="externalControlFalse.set($event)"
                    type="checkbox"
                />
                External control
            </div>

            <div class="ContainerAlerts">
                <lucide-angular [img]="TriangleAlert" size="16" />
                {{ containerAlert }}
            </div>
            <div class="container">
                <ng-container
                    #root1="rdxHoverCardRoot"
                    [open]="isOpenFalse()"
                    [openDelay]="openDelay()"
                    [closeDelay]="closeDelay()"
                    [externalControl]="externalControlFalse()"
                    rdxHoverCardRoot
                >
                    <a
                        class="reset ImageTrigger"
                        href="https://twitter.com/radix_ui"
                        target="_blank"
                        rel="noreferrer noopener"
                        rdxHoverCardTrigger
                    >
                        <img
                            class="Image normal"
                            src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
                            alt="Radix UI"
                        />
                    </a>

                    <ng-template
                        [sideOffset]="8"
                        [onOverlayEscapeKeyDownDisabled]="onOverlayEscapeKeyDownDisabled()"
                        [onOverlayOutsideClickDisabled]="onOverlayOutsideClickDisabled()"
                        (onOpen)="countOpenFalse(true)"
                        (onClosed)="countOpenFalse(false)"
                        rdxHoverCardContent
                    >
                        <div class="HoverCardContent" rdxHoverCardContentAttributes>
                            <button class="reset HoverCardClose" rdxHoverCardClose aria-label="Close">
                                <lucide-angular [img]="XIcon" size="16" style="display: flex" />
                            </button>
                            <div style="display: flex; flex-direction: column; gap: 7px">
                                <img
                                    class="Image large"
                                    src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
                                    alt="Radix UI"
                                />
                                <div style="display: flex; flex-direction: column; gap: 15px;">
                                    <div>
                                        <div class="Text bold">Radix</div>
                                        <div class="Text faded">{{ '@radix_ui' }}</div>
                                    </div>
                                    <div class="Text">
                                        Components, icons, colors, and templates for building high-quality, accessible
                                        UI. Free and open-source.
                                    </div>
                                    <div style="display: flex; gap: 15px">
                                        <div style="display: flex; gap: 5px">
                                            <div class="Text bold">0</div>
                                            &nbsp;
                                            <div class="Text faded">Following</div>
                                        </div>
                                        <div style="display: flex; gap: 5px">
                                            <div class="Text bold">2,900</div>
                                            &nbsp;
                                            <div class="Text faded">Followers</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="HoverCardArrow"
                                [width]="arrowWidth()"
                                [height]="arrowHeight()"
                                rdxHoverCardArrow
                            ></div>
                        </div>
                    </ng-template>
                </ng-container>
            </div>
            <div class="HoverCardId">ID: {{ rootDirective1()?.uniqueId() }}</div>
        </with-option-panel>

        <p class="ExampleSubtitle">Initially open</p>
        <with-option-panel
            [arrowWidth]="arrowWidth()"
            [arrowHeight]="arrowHeight()"
            [openDelay]="openDelay()"
            [closeDelay]="closeDelay()"
            (onOverlayEscapeKeyDownDisabledChange)="onOverlayEscapeKeyDownDisabled.set($event)"
            (onOverlayOutsideClickDisabledChange)="onOverlayOutsideClickDisabled.set($event)"
            (arrowWidthChange)="arrowWidth.set($event)"
            (arrowHeightChange)="arrowHeight.set($event)"
            (openDelayChange)="openDelay.set($event)"
            (closeDelayChange)="closeDelay.set($event)"
        >
            <div class="ParamsContainer">
                <button (mouseup)="triggerOpenTrue()" type="button">Open: {{ isOpenTrue() }}</button>
                <span>onOpenChange count: {{ counterOpenTrue() }}</span>
            </div>

            <div class="ParamsContainer">
                <input
                    [ngModel]="externalControlTrue()"
                    (ngModelChange)="externalControlTrue.set($event)"
                    type="checkbox"
                />
                External control
            </div>

            <div class="ContainerAlerts">
                <lucide-angular [img]="TriangleAlert" size="16" />
                {{ containerAlert }}
            </div>
            <div class="container">
                <ng-container
                    #root2="rdxHoverCardRoot"
                    [open]="isOpenTrue()"
                    [openDelay]="openDelay()"
                    [closeDelay]="closeDelay()"
                    [externalControl]="externalControlTrue()"
                    rdxHoverCardRoot
                >
                    <a
                        class="reset ImageTrigger"
                        href="https://twitter.com/radix_ui"
                        target="_blank"
                        rel="noreferrer noopener"
                        rdxHoverCardTrigger
                    >
                        <img
                            class="Image normal"
                            src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
                            alt="Radix UI"
                        />
                    </a>

                    <ng-template
                        [sideOffset]="8"
                        [onOverlayEscapeKeyDownDisabled]="onOverlayEscapeKeyDownDisabled()"
                        [onOverlayOutsideClickDisabled]="onOverlayOutsideClickDisabled()"
                        (onOpen)="countOpenTrue(true)"
                        (onClosed)="countOpenTrue(false)"
                        rdxHoverCardContent
                    >
                        <div class="HoverCardContent" rdxHoverCardContentAttributes>
                            <button class="reset HoverCardClose" rdxHoverCardClose aria-label="Close">
                                <lucide-angular [img]="XIcon" size="16" style="display: flex" />
                            </button>
                            <div style="display: flex; flex-direction: column; gap: 7px">
                                <img
                                    class="Image large"
                                    src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
                                    alt="Radix UI"
                                />
                                <div style="display: flex; flex-direction: column; gap: 15px;">
                                    <div>
                                        <div class="Text bold">Radix</div>
                                        <div class="Text faded">{{ '@radix_ui' }}</div>
                                    </div>
                                    <div class="Text">
                                        Components, icons, colors, and templates for building high-quality, accessible
                                        UI. Free and open-source.
                                    </div>
                                    <div style="display: flex; gap: 15px">
                                        <div style="display: flex; gap: 5px">
                                            <div class="Text bold">0</div>
                                            &nbsp;
                                            <div class="Text faded">Following</div>
                                        </div>
                                        <div style="display: flex; gap: 5px">
                                            <div class="Text bold">2,900</div>
                                            &nbsp;
                                            <div class="Text faded">Followers</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="HoverCardArrow"
                                [width]="arrowWidth()"
                                [height]="arrowHeight()"
                                rdxHoverCardArrow
                            ></div>
                        </div>
                    </ng-template>
                </ng-container>
            </div>
            <div class="HoverCardId">ID: {{ rootDirective2()?.uniqueId() }}</div>
        </with-option-panel>
    `
})
export class RdxHoverCardTriggeringComponent extends OptionPanelBase {
    readonly rootDirective1 = viewChild('root1');
    readonly rootDirective2 = viewChild('root2');

    readonly MountainSnowIcon = MountainSnow;
    readonly XIcon = X;

    isOpenFalse = signal(false);
    counterOpenFalse = signal(0);
    externalControlFalse = signal(true);

    isOpenTrue = signal(true);
    counterOpenTrue = signal(0);
    externalControlTrue = signal(true);

    triggerOpenFalse(): void {
        this.isOpenFalse.update((value) => !value);
    }

    countOpenFalse(open: boolean): void {
        this.isOpenFalse.set(open);
        this.counterOpenFalse.update((value) => value + 1);
    }

    triggerOpenTrue(): void {
        this.isOpenTrue.update((value) => !value);
    }

    countOpenTrue(open: boolean): void {
        this.isOpenTrue.set(open);
        this.counterOpenTrue.update((value) => value + 1);
    }

    protected readonly containerAlert = containerAlert;
    protected readonly TriangleAlert = TriangleAlert;
}
