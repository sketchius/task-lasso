import { format, getMinutes  } from 'date-fns'
import differenceInDays from 'date-fns/differenceInDays'

export function getDateInContext(date,useTime) {
    if (!date) return '';

    const daysAway = differenceInDays(date,new Date().setHours(0,0,0,0));


    if (daysAway >= 7 || daysAway < 0) {
        return format(date,'MMM d').toUpperCase();
    } else {
        if (daysAway > 1) {
            return format(date,'EEE').toUpperCase();
        } else {
            if (daysAway == 1) {
                return 'TMRW';
            } else {
                if (daysAway == 0) {
                    return 'TODAY';
                }
            }
        }
    }
}

export function getTime(date) {
    if (!date) return '';

    if (getMinutes(date) === 0)
        timeString = format(date,'h aaa');
    else
        timeString = format(date,'h:mm aaa');
}