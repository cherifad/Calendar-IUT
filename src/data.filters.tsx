function getAllGroup(dataP: any) {
  try {
    var groups = Object.keys(dataP);
    return groups;
  } catch {
    return ['error'];
  }
}

function getEdtFromGroup(dataP: any, group: string) {
  console.log("getEdtFromGroup");
  var edt: any = [];
  try {
    for (var course of dataP[group]) {
      edt.push(course);
    }
    return edt;
  } catch {
    return null;
  }
}

function sortByDate(dataP: any) {
  console.log("sortByDate");
  try {
    console.log("sortByDate : " + dataP.length);
    return dataP.sort((obj1: any, obj2: any) => {
      return new Date(obj1.begin).getTime() - new Date(obj2.begin).getTime();
    });
  } catch (error) {
    console.error(error);
    return dataP;
  }
}

function getCurrentDay(dataP: any) {
  const today = new Date();
  const current = today.getDate();
  const week = [];
  try {
    dataP = sortByDate(dataP);
    for (let i = 0; i < dataP.length; i++) {
      if (new Date(dataP[i].begin).getDate() === current) {
        week.push(dataP[i]);
      }
      {
        /** if the date is higher break */
      }
      if (new Date(dataP[i].begin).getDate() > current) {
        break;
      }
    }
    return week;
  } catch {
    return week;
  }
}

function getSeparatedDays(dataP: any) {
  console.log("getSeparatedDays");
  dataP = sortByDate(dataP);
  const days = [];
  var dateList: any[] = [];
  var temp: any[] = [];
  for(var course of dataP) {
    var date = new Date(course.begin).getDate();
    if (!dateList.includes(date)) {
      if (temp.length !== 0) {
        days.push(temp);
      }
      temp = [];
      dateList.push(date);
      temp.push(course);
    } else {
      temp.push(course);
    }
  }
  return days;
}




function getOneWeek(dataP: any, days: number) {
  const temp = new Date();
  const future = temp.setDate(temp.getDate() + days);
  const today = new Date();
  const week = [];
  dataP = sortByDate(dataP);
  for (let i = 0; i < dataP.length; i++) {
    const courseDate = new Date(dataP[i].begin);
    if (courseDate.getTime() <= future && courseDate.getTime() >= today.getTime() || courseDate.getDate() === today.getDate()) {
      week.push(dataP[i]);
    }
    {
      /** if the date is higher break */
    }
    if (new Date(dataP[i].begin).getTime() > future) {
      break;
    }
  }
  return week;
}

export {getOneWeek, sortByDate, getCurrentDay, getAllGroup, getEdtFromGroup, getSeparatedDays};
