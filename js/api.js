
$('#recipe-button').on('click', getRecipe)

var FOOD2FORK_API_KEY = 'ead9d99ee9b0075ab503d1546c68e04f'

function showRecipes(recipeData) {
  const recipes = JSON.parse(recipeData).recipes

  //recipes.length = 30
  const recipeHolder = $('#recipe-holder')
  recipes.map(recipe => {
    var $recipe = $("<div>", {"class": "recipe"});
    recipeHolder.append($recipe);

    var $recipeTitle = $("<a>", {"class": "recipe-title"})
    $recipeTitle.text(recipe.title)
    $recipeTitle.attr("href", recipe.source_url)

    $recipe.append($recipeTitle)

    var $recipeImage = $("<img>", {"class": "recipe-image"})
    $recipeImage.attr("src", recipe.image_url)

    $recipe.append($recipeImage)
  })
}

function getRecipe() {
    var ingredient = $("#location").val()
    var food2forkRecipeUrl = 'https://www.food2fork.com/api/search?key='+FOOD2FORK_API_KEY+'&q='+ingredient
    $.ajax({
        url: food2forkRecipeUrl,
        type: 'GET',
        success: showRecipes,
        error: function() { alert('Failed!'); },
    });
}
