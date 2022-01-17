//export const API = process.env.NODE_ENV === 'development'
export const API = false
    ? 'https://localhost:44308'
    : 'https://mitreinosreactbackend.azurewebsites.net';

export const STORAGEUID = 'Web-UID';

export function GetFetchHeaders() {
    const headers = new Headers();
    headers.append('authorization', 'Bearer ' + localStorage.getItem(STORAGEUID));
    return headers;
}