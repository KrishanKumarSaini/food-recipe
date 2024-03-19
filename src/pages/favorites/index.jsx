import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

export default function Favorites() {
  const { favList, clearFavorites } = useContext(GlobalContext);

  function handleClearFavorites() {
    clearFavorites();
  }

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favList && favList.length > 0 ? (
        <>
          {favList.length > 1 && (
            <div>
              <button
                className="text-sm p-3 mt-5 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-md bg-black text-white"
                onClick={handleClearFavorites}
              >
                Remove All
              </button>
            </div>
          )}
          {favList.map((item) => (
            <RecipeItem item={item} />
          ))}
        </>
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing is added in Favorites.
          </p>
        </div>
      )}
    </div>
  );
}
