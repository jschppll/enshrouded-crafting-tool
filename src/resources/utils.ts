import data from "../resources/resource_data.js";

const getCompoundResourceFromId = (id : string) => {
    for (const resource of data.compoundResources) {
        if (resource.id === id) {
            return resource;
        }
    }

    return undefined;
};

const getRawResourceFromId = (id : string) => {
    for (const resource of data.rawResources) {
        if (resource.id === id) {
            return resource;
        }
    }

    return undefined;
}

export default { getCompoundResourceFromId, getRawResourceFromId };
