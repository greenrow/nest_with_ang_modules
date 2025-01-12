export interface IOrder {
    tourId: string,
    userId?: string,
    orderPerson: IOrderPerson,
    _id?: string
}

export interface IOrderPerson {
    firstName: string;
    lastName: string;
    cardNumber: string;
    birthDate: string;
    age: number
    citizenship: string;
}