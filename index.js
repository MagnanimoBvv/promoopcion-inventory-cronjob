require('dotenv').config();
const axios = require('axios');
const { getLocationId, getProductByHandle, updateInventory } = require('./shopifyFunctions');

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

async function updateProducts() {
    const responseProducts = await getPromoOpcionProducts();
    if (!responseProducts.success) return;

    const responseInventory = await getPromoOpcionInventory();
    if (!responseInventory.success) return;

    const locationId = await getLocationId();
    const products = responseProducts.response || responseProducts.respusta;
    for (const product of products) {
        try {
            // if (product.skuPadre !== 'PET 008') continue; // If para pruebas con un producto específico
            const handle = `po-${product.skuPadre}`.trim().toLowerCase().replace(/-+$/g, '').replace(/[\s/]+/g, '-'); // Reemplaza espacios y diagonales y quita guiones al final
            const shopifyProduct = await getProductByHandle(handle);
            if (!shopifyProduct) {
                continue;
            }

            const activeVariants = product.hijos;
            const shopifyVariants = shopifyProduct.variants.nodes;
            for (const activeVariant of activeVariants) {
                const variant = shopifyVariants.find(v => v.sku === activeVariant.skuHijo);
                const vendorInventory = responseInventory.Stocks.filter(item => item.Material === activeVariant.skuHijo);
                const variantInventory = vendorInventory.reduce((acum, item) => acum + item.Stock, 0); // Suma el inventario de todas las ubicaciones
                console.log(`Variante encontrada: ${shopifyProduct.title} ${variant.title}, Inventario: Prev ${variant.inventoryQuantity} Now ${variantInventory}`);

                if (variant.inventoryQuantity !== variantInventory) {
                    const variantToUpdate = {
                        quantities: {
                            changeFromQuantity: null,
                            inventoryItemId: variant.inventoryItem.id,
                            locationId,
                            quantity: variantInventory,
                        },
                        name: "available",
                        reason: "correction",
                    };
                    const response = await updateInventory(variantToUpdate);
                    console.log('Inventario actualizado:', response.changes);
                }
            }
            // break;
        } catch (error) {
            console.error(`Error actualizando el producto ${product.nombrePadre} ${product.skuPadre}:`, error);
        }
    }
}

updateProducts();