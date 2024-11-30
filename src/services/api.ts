const API_BASE_URL = 'https://eonet.gsfc.nasa.gov/api/v3'

export async function getEvents(days: string, category: string): Promise<Event[]> {
    const allQueries = {
        days,
        category
    };

    const filteredQueries = Object.entries(allQueries).reduce((acc, [key, value]) => {
        if (value) {
            acc[key] = value;
        }
        return acc;
    }, {} as { [key: string]: string });

    if (category === 'all') {
        delete filteredQueries.category;
    }

    const queries = new URLSearchParams(filteredQueries).toString();

    try {
        const response = await fetch(`${API_BASE_URL}/events?${queries}`);
        const data = await response.json();
        return data.events as Event[];
    } catch (error) {
        console.error('Error fetching events', error);
        return [];
    }
}

export async function getCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        const data = await response.json();

        // Retorna o array de categorias completo
        return data.categories;
    } catch (error) {
        console.error('Error fetching categories', error);
        return [];
    }
}