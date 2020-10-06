export interface PollenRecord {
    level: number;
    date: number;
}

export interface Pollen {
    city: string;
    pollen: string;
    year: number;
    data: Array<PollenRecord>;
}
