import { inject } from '@angular/core';
import { EMPTY, Observable, pipe, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../feature/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from '../data-access/confirm-dialog.service';

export function confirmDialog<T, R>(project: (value: T) => Observable<R>): (source: Observable<T>) => Observable<R> {
  const confirmService = inject(ConfirmDialogService);
  const dialog = inject(MatDialog);

  return pipe(
    tap(_ => dialog.open(ConfirmDialogComponent, { disableClose: true })),
    switchMap(value => confirmService.confirm$.pipe(
      switchMap(confirmed => {
        if(confirmed) {
          return project(value);
        }
        return EMPTY;
      })
    )),
    tap(_ => dialog.closeAll())
  );
}