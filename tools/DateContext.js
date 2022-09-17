import { format, getMinutes  } from 'date-fns'
import differenceInDays from 'date-fns/differenceInDays'

export function getDateInContext(date,useTime) {
    if (!date) return '';

    const dateMinusTime = date;
    dateMinusTime.setHours(0,0,0,0);

    const daysAway = differenceInDays(date,new Date().setHours(0,0,0,0));
    let timeString = useTime ? getTime(date) : '';

    if (daysAway >= 7 || daysAway < -1) {
        return format(date,'MMM d').toUpperCase() + timeString;
    } else {
        if (daysAway > 1) {
            return format(date,'EEEE').toUpperCase() + timeString;
        } else {
            if (daysAway == 1) {
                return 'TOMMOROW' + timeString;
            } else {
                if (daysAway == 0) {
                    return 'TODAY' + timeString;
                } else {
                    if (daysAway == -1) {
                        return 'YESTERDAY' + timeString;
                    }
                }
            }
        }
    }
}

export function getTime(date) {
    if (!date) return undefined;

    if (getMinutes(date) === 0)
        return format(date,'h aaa');
    else
        return format(date,'h:mm aaa');
}