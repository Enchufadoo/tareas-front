import moment, { Moment } from 'moment'

export const ellapsedTime = (datetime: string) => {
  let end = moment(datetime)
  let start = moment()

  let days = Math.floor(moment.duration(start.diff(end)).asDays())

  if (!days) return 'today'

  if (days === 1) return 'yesterday'

  return days + ' days ago'
}

export const hours = (dateObj: moment.Moment): string => {
  return dateObj.format('HH:mm')
}
