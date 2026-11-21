import { isPlatformServer } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { timeout } from 'rxjs';

/**
 * During server rendering / prerendering, never wait more than a few seconds
 * for the API. If the API is down or cold-starting, the page is rendered in its
 * loading/error state and the browser fetches the data again after hydration,
 * instead of the whole build hanging and failing.
 */
const SERVER_API_TIMEOUT_MS = 8000;

export const serverTimeoutInterceptor: HttpInterceptorFn = (req, next) =>
  isPlatformServer(inject(PLATFORM_ID))
    ? next(req).pipe(timeout(SERVER_API_TIMEOUT_MS))
    : next(req);
