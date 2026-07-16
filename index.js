require('dotenv').config();
const axios = require('axios');
const { getLocationId, paginateProductsByVendor, updateInventory } = require('./shopifyFunctions');

async function getPromoOpcionProducts() {
    const response = await axios.post(
        'https://promocionalesenlinea.net/api/all-products',
        JSON.stringify({
            user: process.env.PO_USER,
            password: process.env.PO_PASS,
        }), {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    return response.data;
}

async function getPromoOpcionInventory() {
    const response = await axios.post(
        'https://promocionalesenlinea.net/api/all-stocks',
        JSON.stringify({
            user: process.env.PO_USER,
            password: process.env.PO_PASS,
        }), {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    return response.data;
}

function getStores() {
    const storeNames = process.env.STORES.split(',');

    return storeNames.map(name => ({
        name,
        graphqlUrl: process.env[`GRAPHQL_URL_${name}`],
        shopifyToken: process.env[`SHOPIFY_TOKEN_${name}`],
    }));
}

async function updateProducts(store, products, inventory) {
    const locationId = await getLocationId(store);
    const shopifyProducts = await paginateProductsByVendor(store, 'PromoOpcion');
    for (const product of products) {
        try {
            // if (product.skuPadre !== 'PET 008') continue; // If para pruebas con un producto específico
            const handle = `po-${product.skuPadre}`.trim().toLowerCase().replace(/-+$/g, '').replace(/[\s/]+/g, '-'); // Reemplaza espacios y diagonales y quita guiones al final
            const shopifyProduct = shopifyProducts.find(p => p.handle === handle);
            if (!shopifyProduct) continue;

            const shopifyVariants = shopifyProduct.variants.nodes;
            const activeVariants = product.hijos;
            const activeVariantBySKU = new Map(activeVariants.map(v => [v.skuHijo, v]));

            for (const variant of shopifyVariants) {
                const activeVariant = activeVariantBySKU.get(variant.sku);
                const targetInventory = activeVariant && activeVariant.estatus === '1' ? inventory.filter(i => i.Material === activeVariant.skuHijo).reduce((acum, i) => acum + i.Stock, 0) : 0;
                const label = activeVariant && activeVariant.estatus === '1' ? 'Variante existente' : 'Variante faltante';
                console.log(`[${store.name}] ${label}: ${shopifyProduct.title} ${variant.title}, Prev ${variant.inventoryQuantity} Now ${targetInventory}`);

                if (variant.inventoryQuantity === targetInventory) continue;

                const variantToUpdate = {
                    quantities: {
                        changeFromQuantity: null,
                        inventoryItemId: variant.inventoryItem.id,
                        locationId,
                        quantity: targetInventory,
                    },
                    name: "available",
                    reason: "correction",
                };
                const response = await updateInventory(store, variantToUpdate);
                console.log(`[${store.name}] Inventario actualizado:`, response.changes);
            }
            // break;
        } catch (error) {
            console.error(`[${store.name}] Error actualizando ${product.nombrePadre} ${product.skuPadre}:`, error);;
        }
    }
}

async function main() {
    const products = await getPromoOpcionProducts();
    if (!products.success) return;
    const inventory = await getPromoOpcionInventory();
    if (!inventory.success) return;

    const stores = getStores();
    for (const store of stores) {
        await updateProducts(store, products.response, inventory.Stocks);
    }
}

main();
