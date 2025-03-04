export type CompoundResource = {
    id : string,
    inputs : { id : string, quantity : number }[],
    outputQuantity : number,
    workshop: string,
}

export type Data = {
    rawResources : { id : string, location : string }[],
    compoundResources : CompoundResource[],
}

export type IngredientMapType = Map<string, {
    amount: number,
    location: string
}>;
