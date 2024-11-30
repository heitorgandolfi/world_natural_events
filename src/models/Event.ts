export type Event = {
    id: string;
    title: string;
    description: string | null;
    link: string;
    categories: {
        id: string;
        title: string;
    }[];
    sources: {
        id: string;
        url: string;
    }[];
    geometry: {
        coordinates: [number, number];
        date: string;
        magnitudeValue?: number;
        magnitudeUnit?: string;
        type: string;
    }[];
    closed: string | null;
};
