import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favList, setFavList] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await res.json();

      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddtoFavorite(getCurrentItem) {
    let cpyFavoriteList = [...favList];
    const index = cpyFavoriteList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      cpyFavoriteList.push(getCurrentItem);
    } else {
      cpyFavoriteList.splice(index);
    }
    setFavList(cpyFavoriteList);
  }

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
