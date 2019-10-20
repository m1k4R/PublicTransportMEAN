export interface NewPricelist {
    from: Date;
    to: Date;
    active: boolean;
    type: string;
    priceHourly: number;
    priceDaily: number;
    priceMonthly: number;
    priceAnnual: number;
    idHourly?: number;
    idDaily?: number;
    idMonthly?: number;
    idAnnual?: number;
}
