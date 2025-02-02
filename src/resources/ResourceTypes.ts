export type CompoundResource = {
    id : string,
    inputs : { id : string, quantity : number }[],
    outputQuantity : number,
    workshop: string,
}

export type Data = {
    rawResources : { id : string }[],
    lockedResources : { id : string }[],
    compoundResources : CompoundResource[],
}
