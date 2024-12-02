import { Component, EventEmitter, Input, model, Output } from '@angular/core';
import { RdxSliderHorizontalComponent } from './slider-horizontal.component';
import {
    clamp,
    getClosestValueIndex,
    getDecimalCount,
    getNextSortedValues,
    hasMinStepsBetweenValues,
    OrientationContext,
    roundValue
} from './utils';

@Component({
    selector: 'rdx-slider',
    standalone: true,
    imports: [RdxSliderHorizontalComponent],
    template: `
        @if (orientation === 'horizontal') {
            <rdx-slider-horizontal
                [className]="className"
                [min]="min"
                [max]="max"
                [dir]="dir"
                [inverted]="inverted"
                [attr.aria-disabled]="disabled"
                [attr.data-disabled]="disabled ? '' : undefined"
                (pointerdown)="onPointerDown()"
                (slideStart)="handleSlideStart($event)"
                (slideMove)="handleSlideMove($event)"
                (slideEnd)="handleSlideEnd()"
                (homeKeyDown)="updateValues(min, 0, true)"
                (endKeyDown)="updateValues(max, modelValue().length - 1, true)"
                (stepKeyDown)="handleStepKeyDown($event)"
            >
                <ng-content />
            </rdx-slider-horizontal>
        } @else {
            <ng-template #vertical />
        }
    `
})
export class RdxSliderRootComponent {
    @Input() min: number = 0;
    @Input() max: number = 100;
    @Input() step: number = 1;
    @Input() minStepsBetweenThumbs: number = 0;
    @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
    @Input() disabled: boolean = false;
    @Input() inverted: boolean = false;
    @Input() dir: 'ltr' | 'rtl' = 'ltr';
    @Input() className: string = '';

    readonly modelValue = model<number[]>([0]);
    @Output() valueChange = new EventEmitter<number[]>();
    @Output() valueCommit = new EventEmitter<number[]>();

    thumbElements: HTMLElement[] = [];
    valueIndexToChange = model(0);
    valuesBeforeSlideStart = model<number[]>([]);

    get orientationContext(): OrientationContext {
        return this.orientation === 'horizontal'
            ? {
                  direction: this.dir === 'ltr' ? 1 : -1,
                  size: 'width',
                  startEdge: 'left',
                  endEdge: 'right'
              }
            : {
                  direction: 1,
                  size: 'height',
                  startEdge: 'top',
                  endEdge: 'bottom'
              };
    }

    onPointerDown() {
        this.valuesBeforeSlideStart.set([...this.modelValue()]);
    }

    handleSlideStart(value: number): void {
        const closestIndex = getClosestValueIndex(this.modelValue(), value);
        this.updateValues(value, closestIndex);
    }

    handleSlideMove(value: number): void {
        this.updateValues(value, this.valueIndexToChange());
    }

    handleSlideEnd(): void {
        const prevValue = this.valuesBeforeSlideStart()[this.valueIndexToChange()];
        const nextValue = this.modelValue()[this.valueIndexToChange()];
        const hasChanged = nextValue !== prevValue;

        if (hasChanged) {
            this.valueCommit.emit([...this.modelValue()]);
        }
    }

    handleStepKeyDown(event: { event: KeyboardEvent; direction: number }): void {
        const stepInDirection = this.step * event.direction;
        const atIndex = this.valueIndexToChange();
        const currentValue = this.modelValue()[atIndex];
        this.updateValues(currentValue + stepInDirection, atIndex, true);
    }

    updateValues(value: number, atIndex: number, commit = false): void {
        const decimalCount = getDecimalCount(this.step);
        const snapToStep = roundValue(Math.round((value - this.min) / this.step) * this.step + this.min, decimalCount);
        const nextValue = clamp(snapToStep, this.min, this.max);

        const nextValues = getNextSortedValues(this.modelValue(), nextValue, atIndex);

        if (hasMinStepsBetweenValues(nextValues, this.minStepsBetweenThumbs * this.step)) {
            this.valueIndexToChange.set(nextValues.indexOf(nextValue));
            const hasChanged = String(nextValues) !== String(this.modelValue());

            if (hasChanged) {
                this.modelValue.set(nextValues);
                this.valueChange.emit([...this.modelValue()]);
                this.thumbElements[this.valueIndexToChange()]?.focus();

                if (commit) {
                    this.valueCommit.emit([...this.modelValue()]);
                }
            }
        }
    }
}
