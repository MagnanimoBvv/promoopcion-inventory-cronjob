const axios = require('axios');
require('dotenv').config();
const { uploadProduct } = require('./uploadProduct');
const { getLocationId } = require('./getLocations');
const { getPublications } = require('./getPublications');

async function getPromoOpcionProducts() {
    const response = await axios.post(
        'https://promocionalesenlinea.net/api/all-products',
        JSON.stringify({
            user: process.env.USER_PO,
            password: process.env.PASSWORD_PO,
        }), {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    return response.data;
}

async function getPromoOpcionInventory() {
// async function getVariantInventory(sku) {
    const response = await axios.post(
        'https://promocionalesenlinea.net/api/all-stocks',
        JSON.stringify({
            user: process.env.USER_PO,
            password: process.env.PASSWORD_PO,
            // sku,
        }), {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    return response.data;
}

function productHasSize(variants) {
    return variants.some(variant => variant.talla !== null);
}

async function getProductByHandle(handle) {
    const response = await axios.post(
        process.env.GRAPHQL_URL,
        JSON.stringify({
            query: `
                query {
                    productByHandle(handle: "${handle}") {
                        id
                        title
                        variants(first: 250) {
                            nodes {
                                title
                                sku
                                inventoryQuantity
                                inventoryItem {
                                    id
                                }
                            }
                        }
                    }
                }
            `,
        }), {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
            }
        }
    );

    return response.data.data.productByHandle;
}

async function deleteProduct(input) {
    const response = await axios.post(
        process.env.GRAPHQL_URL,
        JSON.stringify({
            query: `
                mutation productDelete($input: ProductDeleteInput!) {
                    productDelete(input: $input) {
                        deletedProductId
                    }
                }
            `,
            variables: {
                input,
            }
        }), {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
            }
        }
    );

    return response.data.data.productDelete;
}

async function updateInventory(input) {
    //Usa esta mutation porque Shopify no permite actualizar inventario por productVariantsBulkUpdate
    const response = await axios.post(
        process.env.GRAPHQL_URL,
        JSON.stringify({
            query: `
                mutation InventorySet($input: InventorySetQuantitiesInput!) {
                    inventorySetQuantities(input: $input) {
                        inventoryAdjustmentGroup {
                            changes {
                                delta
                                name
                            }
                        }
                        userErrors {
                            message
                            field
                        }
                    }
                }
            `,
            variables: {
                input,
            }
        }), {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
            }
        }
    );

    return response.data.data.inventorySetQuantities.inventoryAdjustmentGroup;
}

async function updateProducts() {
    const responseProducts = await getPromoOpcionProducts();
    if (!responseProducts.success) return;

    const responseInventory = await getPromoOpcionInventory();
    if (!responseInventory.success) return;

    const locationId = await getLocationId();
    const productPublications = await getPublications();
    const products = responseProducts.response || responseProducts.respusta;
    for (const product of products) {
        try {
            // if (product.skuPadre !== 'PET 008') continue; // If para pruebas con un producto específico
            const activeVariants = product.hijos;
            // const activeVariants = product.hijos.filter(variant => variant.estatus === '1');

            const handle = `po-${product.skuPadre}`.trim().toLowerCase().replace(/-+$/g, '').replace(/[\s/]+/g, '-'); // Reemplaza espacios y diagonales y quita guiones al final
            // const handle = `${product.nombrePadre} ${product.skuPadre}`.trim().toLowerCase().replace(/[\s/]+/g, '-').replace(/-+$/g, ''); // Reemplaza espacios y diagonales y quita guiones al final
            let shopifyProduct = await getProductByHandle(handle);
            // if (shopifyProduct && activeVariants.length === 0) { // Borra producto subido sin variantes activas
            //     const deletedProduct = await deleteProduct({ id: shopifyProduct.id });
            //     console.log(`Producto borrado: ${handle} (${deletedProduct.deletedProductId})`);
            //     continue;
            // }
            if (!shopifyProduct) {
                continue;
                // if (activeVariants.length === 0) continue; // Salta producto sin variantes activas

                // const isUploaded = await uploadProduct(product, locationId, productPublications); // Intenta subir producto
                // if (!isUploaded) continue;
                // shopifyProduct = await getProductByHandle(handle);
            }

            const hasSize = productHasSize(activeVariants);
            const shopifyVariants = shopifyProduct.variants.nodes;
            for (const activeVariant of activeVariants) {
                // const variantTitle = hasSize ? `${activeVariant.color} / ${activeVariant.talla}` : activeVariant.color;
                const variant = shopifyVariants.find(v => v.sku === activeVariant.skuHijo);
                // const variant = shopifyVariants.find(v => v.title === variantTitle);

                const vendorInventory = responseInventory.Stocks.filter(item => item.Material === activeVariant.skuHijo);
                // const responseInventory = await getVariantInventory(activeVariant.skuHijo);
                const variantInventory = vendorInventory.reduce((acum, item) => acum + item.Stock, 0); // Suma el inventario de todas las ubicaciones
                // const variantInventory = responseInventory.Stocks.reduce((acum, item) => acum + item.Stock, 0); // Suma el inventario de todas las ubicaciones
                console.log(`Variante encontrada: ${shopifyProduct.title} ${variant.title}, Inventario: Prev ${variant.inventoryQuantity} Now ${variantInventory}`);

                if (variant.inventoryQuantity !== variantInventory) { //Actualiza la variante si el inventario ha cambiado
                    const variantToUpdate = {
                        quantities: {
                            inventoryItemId: variant.inventoryItem.id, //Usa id de inventario porque usar id de variante o producto no funciona
                            locationId,
                            quantity: variantInventory,
                        },
                        name: "available",
                        reason: "correction",
                        ignoreCompareQuantity: true, //Desactiva la comparación de inventario para siempre sobreescribir con la info del proveedor
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