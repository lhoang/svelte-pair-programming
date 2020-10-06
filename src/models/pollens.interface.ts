export interface PollenRecord {
    level: number;
    date: number;
}

export interface CleanPollen {
    level: number;
    date: Date;
}

export interface Pollen {
    city: string;
    pollen: string;
    year: number;
    data: Array<PollenRecord>;
}
