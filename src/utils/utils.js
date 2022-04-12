export const dateToDateString = (date) => {
    return `${date.substring(8,10)}/${date.substring(5,7)}/${date.substring(0,4)}`
}

export const capitalizeFirstLetter = (str) =>{
    if (typeof str !== 'string') return;    
    return str.substring(0,1).toUpperCase() + str.substring(1,str.length).toLowerCase();
}