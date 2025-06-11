import { useState } from "react";
import IngredientsList from "./IngredientsList";
import HFRecipe from "./HFRecipe";
import { getRecipeFromMistral } from "./ai";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");

  async function getRecipe() {
    // setRecipeShown((prevShown) => !prevShown);
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    // console.log(recipeMarkdown);
    setRecipe(recipeMarkdown);
  }

  function addIngredient(formData) {
    // event.preventDefault(); // Prevents page being reloaded!

    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);

    // event.currentTarget.reset(); // Erases input from the form.
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}

      {recipe && <HFRecipe recipe={recipe} />}
    </main>
  );
}
