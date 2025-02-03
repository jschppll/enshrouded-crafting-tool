import type {Data} from "./ResourceTypes";

const data : Data = {
    rawResources : [
        { id : "aloe" },
        { id : "ammonia_gland" },
        { id : "animal_fur" },
        { id : "bone" },
        { id : "chamomile" },
        { id : "copper_ore" },
        { id : "dirt" },
        { id : "flax" },
        { id : "flintstone" },
        { id : "fossilized_bone" },
        { id : "kindlewaste_flower" },
        { id : "lump_of_clay" },
        { id : "metal_scraps" },
        { id : "mycelium" },
        { id : "penny_bun" },
        { id : "purple_berries"},
        { id : "plant_fiber" },
        { id : "rooibos" },
        { id : "saffron" },
        { id : "salt" },
        { id : "sand" },
        { id : "shroud_liquid" },
        { id : "shroud_spore" },
        { id : "sugar_cane" },
        { id : "sulfur" },
        { id : "tin_ore" },
        { id : "torn_cloth" },
        { id : "water" },
        { id : "wheat_grain" },
        { id : "wood_logs" },
    ],
    compoundResources : [
        {
            id : "antiseptic",
            inputs : [
                { id : "wood_acid", quantity : 1 },
                { id : "aloe", quantity : 1 },
            ],
            workshop: "alchemy_station",
            outputQuantity : 1,
        },
        {
            id : "alchemical_base",
            inputs : [
                { id : "shroud_liquid", quantity : 1 },
                { id : "mycelium", quantity : 1 },
                { id : "water", quantity : 3 },
                { id : "shroud_spore", quantity : 1 },
            ],
            workshop: "alchemy_station",
            outputQuantity : 1,
        },
        {
            id : "alchemy_station",
            inputs : [
                { id : "fired_brick", quantity : 20 },
                { id : "wood_planks", quantity : 6 },
                { id : "nails", quantity : 10 },
                { id : "wood_logs", quantity : 3 },
                { id : "copper_bars", quantity : 5 },
                { id : "black_cauldron", quantity : 1 },
            ],
            workshop: "alchemist",
            outputQuantity : 1,
        },
        {
            id : "almanac_of_plants_and_seedlings",
            inputs : [
                { id : "paper", quantity : 25 },
                { id : "string", quantity : 5 },
            ],
            workshop: "farmer",
            outputQuantity: 1,
        },
        {
            id : "athanor",
            inputs : [
                { id : "alchemy_station", quantity : 1 },
                { id : "glass", quantity : 10 },
                { id : "bronze_bars", quantity : 10 },
                { id : "lump_of_clay", quantity : 5 },
            ],
            workshop: "alchemist",
            outputQuantity : 1,
        },
        {
            id : "bandage",
            inputs : [
                { id : "torn_cloth", quantity : 1 },
                { id : "string", quantity : 1 },
            ],
            workshop: "manual_crafting",
            outputQuantity : 1,
        },
        {
            id : "black_powder",
            inputs : [
                { id : "nitrate", quantity : 7 },
                { id : "sulfur", quantity : 1 },
                { id : "coal_powder", quantity : 2 },
            ],
            workshop: "laboratory",
            outputQuantity : 1,
        },
        {
            id : "bonemeal",
            inputs : [
                { id : "bone", quantity : 1 },
            ],
            workshop: "grinding_stones",
            outputQuantity : 2,
        },
        {
            id : "brick_timbered_block",
            inputs : [
                { id : "fired_bricks_block", quantity : 5 },
                { id : "wood_logs", quantity : 5 },
            ],
            workshop: "workbench",
            outputQuantity : 100,
        },
        {
            id : "bronze_bars",
            inputs : [
                { id : "copper_bars", quantity : 7 },
                { id : "tin_bars", quantity : 3 },
                { id : "charcoal", quantity : 10 },
            ],
            workshop: "smelter",
            outputQuantity : 10,
        },
        {
            id : "black_cauldron",
            inputs : [
                { id : "forge", quantity : 1 },
                { id : "iron_bars", quantity : 3 },
                { id : "copper_bars", quantity : 2 },
                { id : "bonemeal", quantity : 15 },
            ],
            workshop: "blacksmith",
            outputQuantity : 1,
        },
        {
            id : "charcoal",
            inputs : [
                { id : "wood_logs", quantity : 17 },
                { id : "dirt", quantity : 3 },
            ],
            workshop: "charcoal_kiln",
            outputQuantity : 15,
        },
        {
            id : "circular_sawblade",
            inputs: [
                { id : "forge", quantity : 1 },
                { id : "iron_bars", quantity : 2 },
                { id : "charcoal", quantity : 6 },
            ],
            workshop: "blacksmith",
            outputQuantity : 1,
        },
        {
            id : "coal_powder",
            inputs : [
                { id : "charcoal", quantity : 5 },
            ],
            workshop: "grinding_stones",
            outputQuantity : 5,
        },
        {
            id : "copper_bars",
            inputs : [
                { id : "charcoal", quantity : 20 },
                { id : "copper_ore", quantity : 20 },
            ],
            workshop: "smelter",
            outputQuantity : 10,
        },
        {
            id : "cleaned_bandage",
            inputs : [
                { id : "torn_cloth", quantity : 1 },
                { id : "string", quantity : 1 },
                { id : "antiseptic", quantity : 1 },
            ],
            workshop: "hunter",
            outputQuantity : 1,
        },
        {
            id : "dried_fur",
            inputs : [
                { id : "animal_fur", quantity : 1 },
                { id : "salt", quantity : 3 },
            ],
            workshop: "drying_rack",
            outputQuantity : 1,
        },
        {
            id : "drying_rack",
            inputs : [
                { id : "wood_logs", quantity : 10 },
                { id : "string", quantity : 6 },
            ],
            workshop: "hunter",
            outputQuantity : 1,
        },
        {
            id : "farm_soil",
            inputs : [
                { id : "dirt", quantity : 7 },
                { id : "bonemeal", quantity : 3 },
            ],
            workshop: "farmer",
            outputQuantity : 10,
        },
        {
            id : "fertilized_farm_soil",
            inputs : [
                { id : "sand", quantity : 10 },
                { id : "fossilized_bone_dust", quantity : 2 },
                { id : "nitrate", quantity : 3 },
            ],
            workshop: "farmer",
            outputQuantity : 15,
        },
        {
            id : "fired_brick",
            inputs : [
                { id : "lump_of_clay", quantity : 1 },
                { id : "wood_logs", quantity : 1 },
            ],
            workshop: "kiln",
            outputQuantity : 2,
        },
        {
            id : "fired_bricks_block",
            inputs : [
                { id : "fired_brick", quantity : 10 },
            ],
            workshop: "workbench",
            outputQuantity : 100,
        },
        {
            id : "flour",
            inputs : [
                { id : "wheat_grain", quantity : 2 },
            ],
            workshop: "grinding_stones",
            outputQuantity : 1,
        },
        {
            id : "fossilized_bone_dust",
            inputs : [
                { id : "fossilized_bone", quantity : 1 },
            ],
            workshop: "grinding_stones",
            outputQuantity : 3,
        },
        {
            id : "forge",
            inputs : [
                { id : "stone", quantity : 30 },
                { id : "metal_scrap", quantity : 10 },
                { id : "charcoal", quantity : 10 },
                { id : "wood_logs", quantity : 12 },
            ],
            workshop: "blacksmith",
            outputQuantity : 1,
        },
        {
            id : "glass",
            inputs : [
                { id : "sand", quantity : 30 },
                { id : "charcoal", quantity : 5 },
            ],
            workshop: "smelter",
            outputQuantity : 10,
        },
        {
            id : "greater_health_potion",
            inputs : [
                { id : "mortar", quantity: 1 },
                { id : "honey", quantity : 1 },
                { id : "water", quantity : 1 },
                { id : "purple_berries", quantity : 1 },
                { id : "chamomile", quantity : 1 },
            ],
            workshop: "alchemist",
            outputQuantity : 1,
        },
        {
            id : "half_timbered_block",
            inputs : [
                { id : "lump_of_clay", quantity : 10 },
                { id : "wood_logs", quantity : 5 },
            ],
            workshop: "workbench",
            outputQuantity : 100,
        },
        {
            id : "hand_spindle",
            inputs : [
                { id : "fossilized_bone", quantity : 3 },
                { id : "wood_planks", quantity : 4 },
            ],
            workshop: "hunter",
            outputQuantity : 5,
        },
        {
            id : "health_potion",
            inputs : [
                { id : "penny_bun", quantity : 1 },
                { id : "purple_berries", quantity : 1 },
                { id : "water", quantity : 1 },
            ],
            workshop: "alchemist",
            outputQuantity : 1,
        },
        {
            id : "honey",
            inputs : [
                { id : "water", quantity : 2 },
                { id : "sugar", quantity : 1 },
            ],
            workshop: "beehive",
            outputQuantity : 5,
        },
        {
            id : "laboratory",
            inputs : [
                { id : "scientific_instrument", quantity : 1 },
                { id : "athanor", quantity : 1 },
                { id : "fired_brick", quantity : 40 },
                { id : "copper_bars", quantity : 10 },
                { id : "glass", quantity : 3 },
            ],
            workshop: "alchemist",
            outputQuantity : 1,
        },
        {
            id : "leather",
            inputs : [
                { id : "dried_fur", quantity : 10 },
                { id : "salt", quantity : 20 },
                { id : "ammonia_gland", quantity : 2 },
            ],
            workshop: "tanning_station",
            outputQuantity : 10,
        },
        {
            id : "linen",
            inputs : [
                { id : "flax", quantity : 2 },
            ],
            workshop: "hand_spindle",
            outputQuantity : 1,
        },
        {
            id : "metal_sheet",
            inputs : [
                { id : "charcoal", quantity : 2 },
                { id : "metal_scraps", quantity : 2 },
            ],
            workshop: "forge",
            outputQuantity : 1,
        },
        {
            id : "mortar",
            inputs : [
                { id : "sand", quantity : 5 },
                { id : "lump_of_clay", quantity : 10 },
                { id : "sulfur", quantity : 3 },
                { id : "nitrate", quantity : 2 },
                { id : "charcoal", quantity : 5 },
            ],
            workshop: "alchemist",
            outputQuantity : 1,
        },
        {
            id : "nails",
            inputs : [
                { id : "metal_scraps", quantity : 1 },
            ],
            workshop: "blacksmith",
            outputQuantity : 2,
        },
        {
            id : "nitrate",
            inputs : [
                { id : "sand", quantity : 5 },
                { id : "salt", quantity : 5 },
                { id : "wood_acid", quantity : 1 },
                { id : "alchemical_base", quantity : 1 },
            ],
            workshop: "laboratory",
            outputQuantity : 5,
        },
        {
            id : "palm_wood_block",
            inputs : [
                { id : "palm_wood_logs", quantity : 7 },
                { id : "wood_logs", quantity : 3 },
            ],
            workshop: "workbench",
            outputQuantity : 100,
        },
        {
            id : "paper",
            inputs : [
                { id : "wood_logs", quantity : 1 },
                { id : "ammonia_gland", quantity : 1 },
            ],
            workshop: "laboratory",
            outputQuantity : 5,
        },
        {
            id : "refined_stone_block",
            inputs : [
                { id : "limestone", quantity : 10 },
                { id : "flintstone", quantity : 10 },
            ],
            workshop: "workbench",
            outputQuantity : 100,
        },
        {
            id : "refined_wood_block",
            inputs : [
                { id : "wood_planks", quantity : 15 },
                { id : "wood_logs", quantity : 5 },
            ],
            workshop: "workbench",
            outputQuantity : 100,
        },
        {
            id : "roughly_cut_stone_block",
            inputs : [
                { id : "stone", quantity : 10 },
                { id : "rubble", quantity : 1 },
            ],
            workshop: "workbench",
            outputQuantity : 100,
        },
        {
            id : "scientific_instrument",
            inputs : [
                { id : "alchemy_station", quantity : 1 },
                { id : "glass", quantity : 10 },
                { id : "bronze_bars", quantity : 10 },
                { id : "iron_bars", quantity : 5 },
                { id : "charcoal", quantity : 20 },
            ],
            workshop: "alchemist",
            outputQuantity : 1,
        },
        {
            id : "seedbed",
            inputs : [
                { id : "wood_logs", quantity : 10 },
                { id : "metal_scraps", quantity : 2 },
                { id : "farm_soil", quantity : 2 },
            ],
            workshop: "farmer",
            outputQuantity : 1,
        },
        {
            id : "spice",
            inputs : [
                { id : "saffron", quantity : 1 },
                { id : "alchemical_base", quantity : 1 },
                { id : "chamomile", quantity : 1 },
                { id : "rooibos", quantity : 1 },
                { id : "kindlewaste_flower", quantity : 2 },
            ],
            workshop: "laboratory",
            outputQuantity : 10,
        },
        {
            id : "string",
            inputs : [
                { id : "plant_fiber", quantity : 3 },
            ],
            workshop: "manual_crafting",
            outputQuantity : 1,
        },
        {
            id : "sugar",
            inputs : [
                { id : "almanac_of_plants_and_seedlings", quantity: 1 },
                { id : "sugar_cane", quantity : 2 },
            ],
            workshop: "farmer",
            outputQuantity : 1,
        },
        {
            id : "table_saw",
            inputs : [
                { id : "wood_logs", quantity : 8 },
                { id : "nails", quantity : 10 },
                { id : "circular_sawblade", quantity : 1 },
            ],
            workshop: "carpenter",
            outputQuantity : 1,
        },
        {
            id : "tanning_station",
            inputs : [
                { id : "wood_planks", quantity : 10 },
                { id : "nails", quantity : 4 },
                { id : "lump_of_clay", quantity : 10 },
                { id : "tar", quantity : 10 },
            ],
            workshop: "hunter",
            outputQuantity : 1,
        },
        {
            id : "tar",
            inputs : [
                { id : "wood_logs", quantity : 30 },
                { id : "dirt", quantity : 6 },
            ],
            workshop: "charcoal_kiln",
            outputQuantity : 20,
        },
        {
            id : "tin_bars",
            inputs : [
                { id : "tin_ore", quantity : 15 },
                { id : "charcoal", quantity : 5 },
                { id : "wood_acid", quantity : 2 },
            ],
            workshop: "smelter",
            outputQuantity : 3,
        },
        {
            id : "water_well",
            inputs : [
                { id : "linen", quantity : 20 },
                { id : "stone", quantity : 100 },
                { id : "wooden_bucket", quantity : 1 },
            ],
            workshop: "carpenter",
            outputQuantity : 1,
        },
        {
            id : "wax",
            inputs : [
                { id : "plant_fiber", quantity : 3 },
                { id : "water", quantity : 1 },
            ],
            workshop: "beehive",
            outputQuantity : 1,
        },
        {
            id : "wood_acid",
            inputs : [
                { id : "wood_logs", quantity : 15 },
                { id : "dirt", quantity : 3 },
            ],
            workshop: "charcoal_kiln",
            outputQuantity : 10,
        },
        {
            id : "wood_planks",
            inputs : [
                { id : "wood_logs", quantity : 1 },
            ],
            workshop: "table_saw",
            outputQuantity : 2,
        },
        {
            id : "wooden_bucket",
            inputs : [
                { id : "wood_planks", quantity : 2 },
                { id : "metal_sheets", quantity : 1 },
                { id : "charcoal", quantity : 1 },
            ],
            workshop: "carpenter",
            outputQuantity : 1,
        },
        {
            id : "yellow_luminescent_block",
            inputs : [
                { id : "glass", quantity : 3 },
                { id : "saffron", quantity : 3 },
                { id : "flintstone", quantity : 4 },
            ],
            workshop: "workbench",
            outputQuantity : 100,
        },
    ],
};

export default data;
