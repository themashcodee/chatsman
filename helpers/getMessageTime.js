import moment from 'moment';

export const getMessageTime = time => `${moment(time).fromNow()} · ${moment(time).format('LT')}`