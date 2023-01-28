import { ProductType } from "../../typings/product"

export const getQtyInStock = (product: ProductType, colorway: string, size: string): number => {
    // returns remaining stock for specified colorway and size
    const colorwayIndex = product.colorways.indexOf(colorway);
    const sizeIndex = product.sizes.indexOf(size);
    if (colorwayIndex !== -1 && sizeIndex !== -1) {
        return product.stock[colorwayIndex][sizeIndex];
    }
    return 0;
}

export const displayStock = (product: ProductType, colorway: string, size: string): string => {
    // returns string describing remaining stock 
    const colorwayIndex = product.colorways.indexOf(colorway);
    const sizeIndex = product.sizes.indexOf(size);
    if (colorwayIndex !== -1 && sizeIndex !== -1) {
        const qty = product.stock[colorwayIndex][sizeIndex];
        if (qty > 0) {
            return `${qty} available`;
        }
        return "OUT OF STOCK";
    }
    
    return "ERROR: invalid color/size selected";
}

export const isColorwayAvailable = (product: ProductType, colorway: string): boolean => {
    // returns true if colorway is available in any size
    // returns false if colorway is out of stock in all sizes
    const index = product.colorways.indexOf(colorway);
    if (index === -1) { // no such colorway
        return false;
    }
    const colorwayStock = product.stock[index];
    const totalQty = colorwayStock.reduce((a, b) => {
        return a + b;
    }, 0);
    return (totalQty > 0);
} 

export const isSizeAvailable = (product: ProductType, size: string): boolean => {
    // returns true if size is available in any colorway
    // returns false if size is out of stock in all colorways
    const index = product.sizes.indexOf(size);
    if (index === -1) { // no such size
        return false;
    }
    const sizeStock = product.stock.map(d => d[index]);
    const totalQty = sizeStock.reduce((a, b) => {
        return a + b;
    }, 0);
    return (totalQty > 0);
} 

export const getDefaultSize = (product: ProductType): string => {
    const index = product.sizes.findIndex((size) => isSizeAvailable(product, size));
    if (index !== -1) {
        return product.sizes[index];
    }
    return "";
}

export const getDefaultColorway = (product: ProductType, size: string): string => {
    const sizeIndex = product.sizes.indexOf(size);
    if (sizeIndex === -1) { // no such size
        return "";
    }
    const colorwayStock = product.stock.map(d => d[sizeIndex]);
    const availColorwayIndex = colorwayStock.map((qty, idx) => qty > 0 ? idx : -1).filter(idx => idx !== -1);
    if (availColorwayIndex.length > 0) {
        return product.colorways[availColorwayIndex[0]];
    }
    return "";
}

export const getDefaults = (product: ProductType): [string, string] => {
    const size = getDefaultSize(product);
    const colorway = getDefaultColorway(product, size); 
    return [colorway, size];
}