export function getDateInTimezone(offsetHours: string) {
   
    const offset = parseFloat(offsetHours);

    if (isNaN(offset)) {
        throw new Error('Invalid offsetHours value. It must be a number.');
    }

    const utcDate = new Date();
    const localDate = new Date(utcDate.getTime() + (offset * 60 * 60 * 1000));

    const hours = localDate.getHours();
    const minutes = localDate.getMinutes();
    const seconds = localDate.getSeconds();

    return { hours, minutes, seconds };
}



