import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext);

  return (
    <nav className="fflex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0 border-none dark:bg-gray-900 text-white">
      <h2 className="text-2xl font-semibold text-white">
        <NavLink to={"/"}>FoodRecipe</NavLink>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(event) => {
            setSearchParam(event.target.value);
          }}
          placeholder="Enter Items..."
          className="bg-gray-700 p-3 px-8 rounded-full outline-none lg:w-96 border border-gray-300  focus:border-blue-500"
        />
      </form>
      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className="text-white-900 rounded hover:text-blue-400 font-medium"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favorites"}
            className="text-white-900 rounded hover:text-blue-400 font-medium"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
