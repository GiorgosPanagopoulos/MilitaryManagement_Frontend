export interface Training {
    id: string;
    description: string;
    location: string;
    from: string;
    to: string;
    personnel?: string[]; // Προαιρετικό για συμβατότητα
}
