import { DialogRef } from '@angular/cdk/dialog';
import { filter, isObservable, map, Observable, of, take } from 'rxjs';
import { RdxDialogConfig, RdxDialogResult } from './dialog.config';

export const DISMISSED_VALUE = {} as const;

function isDismissed(v: unknown): v is typeof DISMISSED_VALUE {
    return v === DISMISSED_VALUE;
}

export class RdxDialogRef<C = unknown> {
    closed$: Observable<RdxDialogResult<C> | undefined> = this.cdkRef.closed.pipe(
        map((res): RdxDialogResult<C> | undefined => (isDismissed(res) ? undefined : res))
    );

    dismissed$: Observable<void> = this.cdkRef.closed.pipe(
        filter((res) => res === DISMISSED_VALUE),
        map((): void => undefined)
    );

    result$: Observable<RdxDialogResult<C>> = this.cdkRef.closed.pipe(
        filter((res): res is RdxDialogResult<C> => !isDismissed(res))
    );

    constructor(
        public readonly cdkRef: DialogRef<RdxDialogResult<C> | typeof DISMISSED_VALUE, C>,
        public readonly config: RdxDialogConfig<C>
    ) {}

    get instance(): C | null {
        return this.cdkRef.componentInstance;
    }

    dismiss(): void {
        if (!this.instance) {
            return;
        }
        const canClose = this.config.canClose?.(this.instance) ?? true;
        const canClose$ = isObservable(canClose) ? canClose : of(canClose);
        canClose$.pipe(take(1)).subscribe((close: any) => {
            if (close) {
                this.cdkRef.close(DISMISSED_VALUE);
            }
        });
    }

    close(res: RdxDialogResult<C>): void {
        this.cdkRef.close(res);
    }
}

export type RdxDialogSelfRef<R> = { dismiss(): void; close(res: R): void };
