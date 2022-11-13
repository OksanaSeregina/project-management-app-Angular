import { createAction, props } from '@ngrx/store';

/**
 * Notification state actions
 */
export const showSuccessToast = createAction('[Notification] SHOW_SUCCESS_TOAST', props<{ message: string }>());
export const showFailToast = createAction('[Notification] SHOW_FAIL_TOAST', props<{ message: string }>());
