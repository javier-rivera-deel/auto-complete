import React, { useState, useCallback, useEffect } from "react";
import {
  FilteredSuggestionsType,
  FetchedSuggestionsType,
  DataType,
} from "./types";

export default function Autocomplete() {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] =
    useState<FilteredSuggestionsType>([]);
  const [userInput, setUserInput] = useState("");
  const [fetchedSuggestions, setFetchedSuggestions] =
    useState<FetchedSuggestionsType>([]);
  const [requestError, setRequestError] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const debounceFunction = () => {
    let timer: ReturnType<typeof setTimeout>;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // url hard coded, can be customizable, but response data structure needs to be
        // taken into consideration
        fetch("https://pokeapi.co/api/v2/pokemon")
          .then(res => res.json())
          .then((data: DataType) => {
            const pokenames = data.results.map(pokemon => pokemon.name);
            setFetchedSuggestions(pokenames);
          })
          .catch(() => setRequestError(true));
      }, 200); // hard coded, can be customizable if needed
    };
  };

  const debounceAction = useCallback(debounceFunction(), []);

  useEffect(() => {
    if (!requestError && fetchedSuggestions.length > 0) {
      const filteredSuggestions = fetchedSuggestions.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
      setFilteredSuggestions(filteredSuggestions);
      setShowResults(true);
    }
    // Not necessary to hear out for other variables
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedSuggestions]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    if (userInput.length > 0) debounceAction();
    // Results clean up
    if (userInput.length === 0) {
      setFilteredSuggestions([]);
      setShowResults(false);
    }
    setUserInput(userInput);
  };

  const onClick = (e: {
    currentTarget: { innerText: React.SetStateAction<string> };
  }) => {
    setUserInput(e.currentTarget.innerText);
    setFilteredSuggestions([]);
    setActiveSuggestion(0);
    setShowResults(false);
  };

  const suggestionList = () => {
    // Highlight matching text
    const getSuggestionName = (name: string) => {
      return name.split("").map(char => {
        if (userInput.toLowerCase().split("").includes(char.toLowerCase())) {
          return <span className="match-char">{char}</span>;
        } else {
          return <span>{char}</span>;
        }
      });
    };

    // Build the suggestion results
    if (showResults) {
      return filteredSuggestions.length > 0 ? (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className: string = "";
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {getSuggestionName(suggestion)}
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          <p className="no-suggestion"> No suggestions avaialable.</p>
        </div>
      );
    }
  };

  // Accessibility management
  const onKeyDown = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setShowResults(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) return;
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) return;
      setActiveSuggestion(activeSuggestion + 1);
    } else if (e.keyCode === 27) {
      setShowResults(false);
      setFilteredSuggestions([]);
    }
  };

  return (
    <div className="input-ac">
      <input
        type="text"
        value={userInput}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="input-autocomplete"
      />
      <div className="suggestion-list">
        {userInput.length > 0 && suggestionList()}
      </div>
    </div>
  );
}
