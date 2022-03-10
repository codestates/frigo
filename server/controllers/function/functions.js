module.exports = {
  calculateRemain: (foodDate) => {
    // foodDate
    const foodDateYear = Number(foodDate.slice(0, 4));
    const foodDateMonth = Number(foodDate.slice(5, 7));
    const foodDateDay = Number(foodDate.slice(8, 10));

    // foodRemain
    const today = new Date();
    const dday = new Date(foodDateYear, foodDateMonth - 1, foodDateDay);
    const gap = dday.getTime() - today.getTime();
    const result = Math.ceil(gap / (1000 * 60 * 60 * 24));

    if (result <= -1) {
      return "red";
    } else if (result >= 0 && result <= 4) {
      return "yellow";
    } else {
      return "green";
    }

    // 2022 03 12 - 2022 03 07 = 5
    // 2022 03 12 - 2022 03 10 = 2
    // 2022 03 12 - 2022 03 13 = -1
  },

  tagArrayToString: (tag) => {
    let tagMap = "";
    for (let i = 0; i < tag.length; i++) {
      if (i === 0) {
        tagMap += `${tag[i]}`;
      } else {
        tagMap += `,${tag[i]}`;
      }
    }
    return tagMap;
  },

  tagStringToArray: (tag) => {
    let tagArray = tag.split(",");
    return tagArray;
  },
};
