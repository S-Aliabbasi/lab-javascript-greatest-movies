// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  let i = 0;
  let Narr = [0];
  moviesArray.forEach((item) => {
    Narr[i] = item.director;
    i++;
  });

  return Narr;
}
//itreation 1.1
//clean the array of directors

//#########################################################################################
//#########################################################################################
// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const result = moviesArray.filter((movies) => {
    const uppercase = movies.genre.map((item) => item.toUpperCase());
    return (
      movies.director.toUpperCase() == "STEVEN SPIELBERG" &&
      uppercase.includes("DRAMA")
    );
  });

  return result.length;
}

//#########################################################################################
//#########################################################################################
// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  let avg,
    sum = 0;
  //if array have no item or one item
  if (moviesArray.length == 0) return 0;
  if (moviesArray.length == 1) return moviesArray[0].score;

  moviesArray.forEach((item) => {
    if (typeof item.score != "number") sum += 0;
    else sum += item.score;
  });
  avg = sum / moviesArray.length;

  return Number(avg.toFixed(2));
}

//#########################################################################################
//#########################################################################################
// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const result = moviesArray.filter((movies) => {
    const uppercase = movies.genre.map((item) => item.toUpperCase());
    return uppercase.includes("DRAMA");
  });
  return scoresAverage(result);
}
//#########################################################################################
//#########################################################################################
// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const result = moviesArray.toSorted((a, b) => {
    if (typeof a.year == "number" || typeof b.year == "number") {
      if (a.year - b.year == 0) {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      } else return a.year - b.year;
    }
  });
  return result;
}
//#########################################################################################
//#########################################################################################
// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  //if item is less than 2
  if (moviesArray.length == 0) return moviesArray;
  if (moviesArray.length == 1 && typeof moviesArray[0].title == "string")
    return moviesArray[0].title;
  //check all of items be string else ommited it
  let limitedarr = [0],
    result = [0];
  for (let i = 0; i < moviesArray.length; i++) {
    if (typeof moviesArray[i].title == "string") {
      limitedarr[i] = moviesArray[i].title;
    } else break;
  }
  //sort items
  newarr = limitedarr.sort((a, b) => {
    const nameA = a.toUpperCase();
    const nameB = b.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  //pick top 20 items
  for (let i = 0; i < newarr.length; i++) {
    if (typeof newarr[i] == "string" && i < 20) {
      result[i] = newarr[i];
    } else break;
  }

  return result;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  //if array has one item
  if (moviesArray.length == 0) return moviesArray;

  let min;
  let i = 0;
  let arr = [0];
  let newarr = [0];
  //patern to detect hours and min
  const re = /(\d*)\w\s(\d*)\w\w\w/;

  moviesArray.forEach((item) => {
    //based on 2 pattern use if else
    //one pattern is general and start with hours ex:"2h...." and another has min ex"2h 30min"
    //if it didin`t match with these 2 set zero for duration
    if (
      typeof item.duration == "string" &&
      item.duration.match(/(\d*)\w/) != null
    ) {
      const str = item.duration;
      arr = str.match(re);
      if (arr != null) {
        min = Number(arr[1]) * 60;
        min += Number(arr[2]);
      } else {
        arr = str.match(/(\d*)\w/);
        min = Number(arr[1]) * 60;
      }
      item.duration = min;
    } else {
      item.duration = 0;
    }
    newarr[i] = item;
    i++;
  });

  return newarr;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  let temp = 0;
  if (moviesArray.length == 0) return null;
  if (moviesArray.length == 1)
    return (
      "The best year was " +
      moviesArray[0].year +
      " with an average score of " +
      moviesArray[0].score
    );

  let allyears = moviesArray.map((movies) => {
    return movies.year;
  });

  let sortedyears = allyears.sort((a, b) => a - b);
  sortedyears.forEach((el, i, arr) => {
    if (arr[temp] == arr[i + 1] && i + 1 != temp) {
      sortedyears[temp] = 0;
      temp = i + 1;
    } else temp++;
  });

  let sameyear = [0];
  let avgofyear = [0];
  let years = [0];
  sortedyears.forEach((element, index) => {
    if (element != 0) {
      sameyear = moviesArray.filter((value) => {
        if (value.year == element) {
          return true;
        } else {
          return false;
        }
      });
      years[index] = element;
      avgofyear[index] = scoresAverage(sameyear);
    }
  });
  let bestavg = avgofyear.reduce((a, b) => Math.max(a, b), -Infinity);
  let indexoffind = avgofyear.findIndex((element) => element == bestavg);
  let finalyear = years[indexoffind];
  return (
    "The best year was " + finalyear + " with an average score of " + bestavg
  );
}
