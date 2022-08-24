export type FilteredSuggestionsType = string[];
export type FetchedSuggestionsType = string[];
export type DataType = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};
