const filterAddItems = (arrToFilter=[], item, idx) => {
    if (idx < 0) {
        return [...arrToFilter,...item];
    }
    return [...arrToFilter.slice(0, idx), ...item, ...arrToFilter.slice(idx + 1)];
};
const filterRemoveItems = (arrToFilter=[],category ,filterItem) => {
    console.log(category,' : ',filterItem);
    
    return arrToFilter.filter(item => item[category] !== filterItem);
}
export { filterAddItems, filterRemoveItems }
