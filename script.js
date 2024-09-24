const APP_ID = 'YOUR_APP_ID';
const APP_KEY = 'YOUR_APP_KEY';

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    fetchRecipes(query);
});

async function fetchRecipes(query) {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    displayResults(data.hits);
}

function displayResults(recipes) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';

        recipeCard.innerHTML = `
                    <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                    <h3>${recipe.recipe.label}</h3>
                    <p>Calories: ${Math.round(recipe.recipe.calories)}</p>
                    <p>Protein: ${Math.round(recipe.recipe.totalNutrients.PROCNT.quantity)}${recipe.recipe.totalNutrients.PROCNT.unit}</p>
                    <p>Carbs: ${Math.round(recipe.recipe.totalNutrients.CHOCDF.quantity)}${recipe.recipe.totalNutrients.CHOCDF.unit}</p>
                    <p>Fat: ${Math.round(recipe.recipe.totalNutrients.FAT.quantity)}${recipe.recipe.totalNutrients.FAT.unit}</p>
                `;

        resultsDiv.appendChild(recipeCard);
    });
} 