export function formatDateTime(date: Date) {
    const d = new Date(date);

    // Pobierz składniki daty
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Miesiące są indeksowane od 0
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    // Zamień format na właściwy ciąg
    return `${day}.${month}.${year} ${hours}:${minutes}`
}
export function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}