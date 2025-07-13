export interface Personnel {
    _id: string;
    firstName: string;
    lastName: string;
    rank?: string;
}

export interface Training {
    id: string;
    description: string;
    location: string;
    from: string;
    to: string;
    success_rate?: number;
    personnel?: Array<
        | string
        | {
        _id: string;
        firstName: string;
        lastName: string;
        rank?: string;
    }
    >;
}