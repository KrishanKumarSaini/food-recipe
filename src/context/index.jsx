import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favList, setFavList] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?search=${searchParam}`);
      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data.data.recipes);
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
      setSearchParam("");
    }
  };

  const handleAddtoFavorite = (recipe) => {
    const index = favList.findIndex((item) => item.id === recipe.id);
    if (index === -1) {
      setFavList([...favList, recipe]);
    } else {
      const newFavList = [...favList];
      newFavList.splice(index, 1);
      setFavList(newFavList);
    }
  };

  function clearFavorites() {
    setFavList([]);
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddtoFavorite,
        favList,
        clearFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
