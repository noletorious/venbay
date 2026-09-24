import AppHeader from "./app-header.marko";

export default {
  title: "Components/SearchInput",
  component: AppHeader,
};

export const Idle = () => ({
  input: {},
});

export const Searching = () => ({
  input: {
    searching: true,
  },
});

export const WithActiveQuery = () => ({
  input: {
    query: "nature",
  },
});

export const SearchingWithSuggestions = () => ({
  input: {
    searching: true,
    query: "an",
    showSuggestions: true,
  },
});
