
export function FormattedDate({ date }) {
    let newDate = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return newDate.toLocaleDateString('fr-FR', options);
}
export function FormattedDateWithTime({ date }) {
    let newDate = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',minute: 'numeric'};
    return newDate.toLocaleDateString('fr-FR', options);
}
/*export function FormattedTime({ date }){
    return date.toLocaleTimeString('fr-FR');
}*/
