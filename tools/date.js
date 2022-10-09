import { differenceInCalendarDays, format } from 'date-fns';

export function formatRelative(date, options) {
	try {
		const deltaDays = differenceInCalendarDays(date, new Date());

		if (deltaDays == 0) return 'Today';
		if (deltaDays == 1) return 'Tomorrow';
		if (deltaDays == -1) return 'Yesterday';
		if (deltaDays < 4) return format(date, 'EEEE');
		return format(date, 'EEE LLL do');
	} catch {
		return '';
	}
}
