
$('#recipe-button').on('click', getRecipe)

var ingredient = document.getElementById('ingredient')
ingredient.addEventListener("keyup", e => {
  e.preventDefault()
  if (e.key !== 'Enter') return

  $('#recipe-button').click()
})

var FOOD2FORK_API_KEY = 'ead9d99ee9b0075ab503d1546c68e04f'

function showRecipes(recipeData) {
  const recipes = JSON.parse(recipeData).recipes

  const recipeHolder = $('#recipe-holder')

  if (recipes === undefined || recipes.length === 0){
    return recipeHolder.html("<div class='row' style='color: red'> Oops, sorry no recipes available </div>")
  }

  //recipes.length = 30
  var row_div = $("<div>", {"class": "row"})
  recipeHolder.append(row_div)

  recipes.map((recipe, index) => {
    if ((index % 4 === 0) && (index !== 0)) {
      row_div = $("<div>", {"class": "row"})
      recipeHolder.append(row_div)
    }
    var $recipe = $("<div>", {"class": "recipe-card col-md-3 col-sm-4 col-xs-6"});
    row_div.append($recipe);

    var $recipeTitle = $("<a>", {"class": "recipe-title"})
    $recipeTitle.html("<p>" + recipe.title +"</p>")
    $recipeTitle.attr("href", recipe.source_url)

    $recipe.append($recipeTitle)

    var $recipeImage = $("<img>", {"class": "recipe-image"})
    $recipeImage.attr("src", recipe.image_url)

    $recipe.append($recipeImage)
  })
}

function getRecipe() {
    var ingredient = $("#ingredient").val()
    var food2forkRecipeUrl = 'https://www.food2fork.com/api/search?key='+FOOD2FORK_API_KEY+'&q='+ingredient
    $.ajax({
        url: food2forkRecipeUrl,
        type: 'GET',
        success: showRecipes,
        error: function() { alert('Failed!'); },
    });
}
