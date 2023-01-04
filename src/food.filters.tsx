function getLastUpdatedDate(data: any) {
    return data['info']['date']
}

function getAllFood(data: any) {
    var food = [];
    for (let single of data['data']) {
        food.push(single);
    }
    return food;
}

function getFromCurrentDate(data: any, date: Date) {
    var food = [];
    for (let single of data['data']) {
        const foodDate = new Date(single['begin']).getTime();
        if (new Date(single['date']).getTime() >= date.getTime()) {
            food.push(single);
        }
    }
    return food;
}

export {getLastUpdatedDate, getAllFood, getFromCurrentDate};