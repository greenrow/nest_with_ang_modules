import {IOrder, IOrderPerson} from "../interfaces/order";
import {
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsString, Matches,
    Max,
    MaxLength,
    Min,
    MinLength,
    ValidateNested
} from "class-validator";
import {Type} from "class-transformer";


export class OrderPersonDto implements IOrderPerson {
    @IsInt()
    @Min(18)
    @Max(100)
    @IsNotEmpty()
    age: number;

    @IsNotEmpty()
    @IsDateString()
    birthDate: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    lastName: string;

    @IsNotEmpty() firstName: string;
    @IsNotEmpty() citizenship: string;

    @IsNotEmpty()
    @Matches(/^\d{12,14}$/)
    cardNumber: string;

}

export class OrderDto implements IOrder {
    @IsNotEmpty() tourId: string;
   // @IsNotEmpty() userId: string;
    @ValidateNested()
    @Type(() => OrderPersonDto)
    orderPerson: OrderPersonDto;
}

