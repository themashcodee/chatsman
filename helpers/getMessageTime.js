import moment from 'moment';

export function getMessageTime(time) {
    return `${moment(time).fromNow()} · ${moment(time).format('LT')}`
}