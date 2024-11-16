"use client";

import { url } from "inspector";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Page = () => {
  const sampleData: recipeData = {
    label: "Shredded chicken",
    url: "https://www.bbcgoodfood.com/recipes/shredded-chicken",
    image:
      "https://edamam-product-images.s3.amazonaws.com/web-img/f98/f98cb99f615f7cc0ec01c033e9ff72ec.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDzvsPtjhnRJmO6HlD4D%2FB5WCPAen8Bqf7UycstJjGO5QIhANbg2vHYn4E%2Bn%2FuquTVZFfrjYj1jUJkDlX3Ut6zmL7puKrkFCDEQABoMMTg3MDE3MTUwOTg2IgyamuI5iT71ZVBBp04qlgWUw16lKoNQ0PWDiy%2BZwKTPrXfuDcNtwtVF5rtc68H0kiBColGWDy%2Fi0RYaDwLQC9MvcEOZ%2BXBlKL29XcH1t2GVGMz7RRTTH2Qyj%2Bw7WjI8NWW%2FOSDX2i33pA6qE2TKhEgItgeTGwrVSqTSXuSPRpZMVxo0FadOmbMgoGiH3rhGzkjhuNbUJpU%2FaELv0swkSy5Si1vWbz01Ei715arBgOa%2Bu6N47UsKdFtJAZYbznsBn0gbrMcfgFH85h8Kt2aXyrCi4b8RBJvGi0AQ5sj9%2FNwDMLNnTfjNlXNRGNZ8LUAkUEKGs2nN%2Fw5rLBXpoLN7DOrsqfaoOFHQbdwnAToXVuMKMteJRD9VpwfTmDa0nETw8%2B2voLJFL%2FGhGCB6gmBzSpwDlxcJf3HmS%2FlNVQs7Wi%2F2AaCmC4Tuxu3AOUGMXrLc3RmORuLlU3iqKWco4UhtTY5rbO43bptOJ3O5NX3FCJOeJMaIQG76gj7zuKrGY%2FW8Ec8rsSoqpkQGuL4OkLrCWKE9paU1zKnTrg%2FqGqz%2F9K4Tigqs4UIcOE4mKuhOwPNWe6hPTaJdJGz%2BR0LxXva4jNHezMfQU%2F4fGUOKzYU15MDsjNR9LOakG%2B9WsCeLlh%2BGNjND7YdkcPD%2F0gCUWuH2fm2JRc1vYdmbbS6F7PIhcVpRFw3x4MRCn0Q5TjO2dOjQOnvgitbSdpgd%2FkIx4TGquP0C%2BVr6e7OktdsA9OYS%2Brx4rkSjUTa7aDWQIk4frbRLdvm1QG2wzGmnXuj2ojAibkkJLRaNtrAkoNRWmYMD%2BM4xCTQ2YlSZ0yWmG8yIYBlj8sTTgqwVLkuZqVVcUDAZC%2BlkS%2BYHbRLhkkv9HVgfvtGF8WsvQgyJw35uvrCfjmA9f1LM6WrrSDCh8%2BK5BjqwAcBKl9UgWmMwNKQD9QOtsbFVP5L52ASHpf98YpUhql84%2FpdZ653kx5y%2FwGsV893v0w3dStyJJ1I4WFlz3AHwlLzxa1P0xiykat1gUvv1kOONkdEs3eNPUGUlJeuYb5hulPaEuBsZRM5gw95erXuBJSpPSZO7sVpokbrg7D3GzZLfiJudYuV1mt0fHl3vxem4tkUjP4EqxggG8A5%2BxqDkGxmr7CvlA76QckODlmJRi5XS&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241116T165624Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFIHGUUXDW%2F20241116%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=d33609fae570f36db37a602cbfba6685ba9b2550fa2301f5d31a23363f47ed53",
  };

  const [recipeList, setRecipeList] = useState<RecipeList>([sampleData]);
  const [searchQuery, setSearchQuery] = useState("");

  const inputHandler = (event: ChangeEvent) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
  };

  const searchHandler = async (event: FormEvent) => {
    event.preventDefault();
    await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=17657f22&app_key=82a879c747049a78c09d2d2b87481464`
    ).then(async (response) => {
      const data = await response.json();

      const recipelistfromAPI: RecipeList = [];
      for (let i in [0, 1, 2, 3, 4]) {
        recipelistfromAPI.push({
          label: data.hits[i].recipe.label,
          url: data.hits[i].recipe.url,
          image: data.hits[i].recipe.image,
        });
      }
      console.log(recipelistfromAPI);
      setRecipeList(recipelistfromAPI);
    });
  };

  return (
    <div>
      <h1 className="text-2xl p-2 m-2">Recipe Searcher</h1>
      <div className="box-border w-60 h-50 border-4 border-black m-2 p-2">
        <h1 className="m-2">Search your ingredient:</h1>
        <form onSubmit={searchHandler}>
          <input
            className="border-2 m-2"
            onChange={inputHandler}
            value={searchQuery}
          ></input>
          <button type="submit" className="border-2 border-black m-2 p-2">
            Search
          </button>
        </form>
      </div>
      {recipeList.map((element) => (
        <RecipeCard key={element.url} recipe={element} />
      ))}
    </div>
  );
};

export default Page;

/////////////////////////////////
/*
Problem:

app that creates the ability to search for ingredients,

5 recipes

- component - where we would showcase what a recipe
- search form: 

- image 
- label
- url

- 
*/

type recipeData = {
  label: string;
  image: string;
  url: string;
};

type RecipeList = recipeData[];

const sampleData: recipeData = {
  label: "Shredded chicken",
  url: "https://www.bbcgoodfood.com/recipes/shredded-chicken",
  image:
    "https://edamam-product-images.s3.amazonaws.com/web-img/f98/f98cb99f615f7cc0ec01c033e9ff72ec.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDzvsPtjhnRJmO6HlD4D%2FB5WCPAen8Bqf7UycstJjGO5QIhANbg2vHYn4E%2Bn%2FuquTVZFfrjYj1jUJkDlX3Ut6zmL7puKrkFCDEQABoMMTg3MDE3MTUwOTg2IgyamuI5iT71ZVBBp04qlgWUw16lKoNQ0PWDiy%2BZwKTPrXfuDcNtwtVF5rtc68H0kiBColGWDy%2Fi0RYaDwLQC9MvcEOZ%2BXBlKL29XcH1t2GVGMz7RRTTH2Qyj%2Bw7WjI8NWW%2FOSDX2i33pA6qE2TKhEgItgeTGwrVSqTSXuSPRpZMVxo0FadOmbMgoGiH3rhGzkjhuNbUJpU%2FaELv0swkSy5Si1vWbz01Ei715arBgOa%2Bu6N47UsKdFtJAZYbznsBn0gbrMcfgFH85h8Kt2aXyrCi4b8RBJvGi0AQ5sj9%2FNwDMLNnTfjNlXNRGNZ8LUAkUEKGs2nN%2Fw5rLBXpoLN7DOrsqfaoOFHQbdwnAToXVuMKMteJRD9VpwfTmDa0nETw8%2B2voLJFL%2FGhGCB6gmBzSpwDlxcJf3HmS%2FlNVQs7Wi%2F2AaCmC4Tuxu3AOUGMXrLc3RmORuLlU3iqKWco4UhtTY5rbO43bptOJ3O5NX3FCJOeJMaIQG76gj7zuKrGY%2FW8Ec8rsSoqpkQGuL4OkLrCWKE9paU1zKnTrg%2FqGqz%2F9K4Tigqs4UIcOE4mKuhOwPNWe6hPTaJdJGz%2BR0LxXva4jNHezMfQU%2F4fGUOKzYU15MDsjNR9LOakG%2B9WsCeLlh%2BGNjND7YdkcPD%2F0gCUWuH2fm2JRc1vYdmbbS6F7PIhcVpRFw3x4MRCn0Q5TjO2dOjQOnvgitbSdpgd%2FkIx4TGquP0C%2BVr6e7OktdsA9OYS%2Brx4rkSjUTa7aDWQIk4frbRLdvm1QG2wzGmnXuj2ojAibkkJLRaNtrAkoNRWmYMD%2BM4xCTQ2YlSZ0yWmG8yIYBlj8sTTgqwVLkuZqVVcUDAZC%2BlkS%2BYHbRLhkkv9HVgfvtGF8WsvQgyJw35uvrCfjmA9f1LM6WrrSDCh8%2BK5BjqwAcBKl9UgWmMwNKQD9QOtsbFVP5L52ASHpf98YpUhql84%2FpdZ653kx5y%2FwGsV893v0w3dStyJJ1I4WFlz3AHwlLzxa1P0xiykat1gUvv1kOONkdEs3eNPUGUlJeuYb5hulPaEuBsZRM5gw95erXuBJSpPSZO7sVpokbrg7D3GzZLfiJudYuV1mt0fHl3vxem4tkUjP4EqxggG8A5%2BxqDkGxmr7CvlA76QckODlmJRi5XS&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241116T165624Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFIHGUUXDW%2F20241116%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=d33609fae570f36db37a602cbfba6685ba9b2550fa2301f5d31a23363f47ed53",
};

type recipeCardProps = {
  recipe: recipeData;
};

const RecipeCard = ({ recipe }: recipeCardProps) => {
  return (
    <div className="box-border w-60 h-50 border-4 border-black m-2 p-2">
      <h1>{recipe.label}</h1>
      <a href={recipe.url} className="text-blue-400">
        Click here for recipe
      </a>
      <img className="h-32" src={recipe.image}></img>
    </div>
  );
};

const RecipeSearcher = () => {};
