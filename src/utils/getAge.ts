// import dayjs from 'dayjs';

// export function getAge(birthday: Date, endPoint?: Date) {
//   const today = dayjs(endPoint);
//   return today.diff(dayjs(birthday), 'years');
// }

const error = new Error('message', { cause: 'LoginError' });

console.log(error.cause);
