import { ProductType } from "../../typings/product"

export const getQtyInStock = (product: ProductType, colorway: string, size: string): number => {
    // returns remaining stock for specified colorway and size
    if (product.stock[colorway] && product.stock[colorway][size]) {
        return product.stock[colorway][size]
    }
    return 0;
}

export const displayStock = (product: ProductType, colorway: string, size: string): string => {
    // returns string describing remaining stock 
    if (product.stock[colorway] && product.stock[colorway][size]) {
        const qty = product.stock[colorway][size];
        if (qty > 0) {
            return `${qty} available`;
        }
        return "OUT OF STOCK";
    }
    
    return "ERROR: invalid color/size selected";
}

export const isOutOfStock = (product: ProductType): boolean => {
    // returns true if product is out of stock in all colorways and sizes
    const totalQty = Object.values(product.stock).reduce((acc, stockByColorway)=>{
        const colorQty = Object.values(stockByColorway).reduce((acc2, qty)=>acc2+qty, 0);
        return acc+colorQty
    }, 0);
    return totalQty <= 0;

} 

export const isColorwayAvailable = (product: ProductType, colorway: string): boolean => {
    // returns true if colorway is available in any size
    // returns false if colorway is out of stock in all sizes
    const colorwayStock = Object.values(product.stock[colorway]).reduce(
		(acc: any, size: any)=>acc+size, 0
	);
    return (colorwayStock > 0);
}

export const isSizeAvailable = (product: ProductType, size: string): boolean => {
    // returns true if size is available in any colorway
    // returns false if size is out of stock in all colorways
    const sizeStock = Object.values(product.stock).map(d => d[size]||0);
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
    const colorwayStock = Object.values(product.stock).map(d => d[sizeIndex]);
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
