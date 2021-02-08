const input=()=>{ 
    const getInputValue = document.getElementById('search').value;
    searchMeal(getInputValue);
    const nothing = document.getElementById('search').value = "";
}

//Fetching meals  
const searchMeal = name => { 
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data => {
            //validation 
            if (name === "" || data.meals === null) {
                errorMassege();
            }
            else {
                mealMenus(data.meals);
            }
        });
}

//Without result
const errorMassege = () => {
    let displayMsg = document.getElementById('detail');
    displayMsg.innerHTML = " ";
    const noResultsDiv = document.createElement('div');
    noResultsDiv.className = "noResultsDiv"
    noResultsDiv.innerHTML = `
    <h3>No Results Found.</h3>
    <p>Please Try Again.</p>
    `
    displayMsg.appendChild(noResultsDiv);
}

//get Searched menu
const mealMenus = allMenus => {
    let mealsDiv = document.getElementById('detail');
    mealsDiv.innerHTML = " ";
    allMenus.forEach(searchMenu => {
        const menuDiv = document.createElement('div');
        menuDiv.className = 'menus';
        const mealInfo = `
      <img src="${searchMenu.strMealThumb}"> 
      <h3>${searchMenu.strMeal}
      `
        menuDiv.innerHTML = mealInfo;
        mealsDiv.appendChild(menuDiv)

        menuDiv.addEventListener('click', function () {
            displayMenuDetail(searchMenu.strMeal);
        })
    });

    //Get one unique meal details
    const displayMenuDetail = name => {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
        fetch(url)
            .then(res => res.json())
            .then(data => renderMealInfo(data.meals[0]));
    }

    //Display Meal Ingredients 
    const renderMealInfo = Meal => {
        const MenuDiv = document.getElementById('ingredients');
        MenuDiv.innerHTML = `
          <img src="${Meal.strMealThumb}">
          <h1>${Meal.strMeal}</h1> 
          
          <h3>Ingredients</h3>
          <li>${Meal.strIngredient1}</li>  
          <li>${Meal.strIngredient2}</li>  
          <li>${Meal.strIngredient3}</li>  
          <li>${Meal.strIngredient4}</li>  
          <li>${Meal.strIngredient5}</li>  
          <li>${Meal.strIngredient6}</li>  
          <li>${Meal.strIngredient7}</li>  
          <li>${Meal.strIngredient7}</li>  
          <li>${Meal.strIngredient9}</li>  
        `
    }
}