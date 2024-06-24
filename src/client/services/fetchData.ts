const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

export const TOKEN_KEY = 'token'

export async function fetchData(endpoint: string, method: string = 'GET', payload: any = null) {
    try {
        const TOKEN = localStorage.getItem(TOKEN_KEY)

        const headers: HeadersInit = {};
        const options: RequestInit = {
            method,
            headers
        };

        if (TOKEN) {
            headers.authorization = `Bearer ${TOKEN}`
          }

        if (payload && method !== 'GET') {
            headers['Content-Type'] ='application/json'
            options.body = JSON.stringify(payload);
        }
       

        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Fetch error: ${error}`);
        throw error;
    }
}