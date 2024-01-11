import { z } from 'zod';


export class Fish {
    id: number;
    name: string;
    price: number;
    weightRangeFrom: number;
    weightRangeTo: number;
    amount: number;
    location: string;
    description: string;

    constructor(
        id: number,
        name: string,
        price: number,
        weightRangeFrom: number,
        weightRangeTo: number,
        amount: number,
        location: string,
        description: string
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.weightRangeFrom = weightRangeFrom;
        this.weightRangeTo = weightRangeTo;
        this.amount = amount;
        this.location = location;
        this.description = description;
    }
};

export const FishDto = z.object({
    id: z.coerce.number(),
    name: z.string(),
    price: z.coerce.number(),
    weightRangeFrom: z.coerce.number(),
    weightRangeTo: z.coerce.number(),
    amount: z.coerce.number(),
    location: z.string(),
    description: z.string(),
});

export const CreateFishDto = FishDto.omit({ id: true });

export const UpdateFishDto = FishDto

