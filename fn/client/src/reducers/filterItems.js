const filterItems = (arrToFilter, filterItem) => {
 return   arrToFilter.filter(item => {
        console.log('brands', item.brand, ':: ', filterItem);
        return item.brand.toLowerCase() === filterItem.toLowerCase();
    });
}
export default filterItems;