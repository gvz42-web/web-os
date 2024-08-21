// https://github.com/ngneat/effects/blob/master/libs/effects/src/lib/tap-result.ts

import { EMPTY, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export function tapResult<Result, Error = unknown>(
  next: (next: Result) => void,
  error?: (error: Error) => void,
  complete?: () => void
): MonoTypeOperatorFunction<Result> {
  return (source: Observable<Result>) =>
    source.pipe(
      tap({
        next,
        error: error ?? console.error,
        complete,
      }),
      catchError(() => EMPTY)
    );
}
