import CardGrid from "./card-grid.marko";

const colors = ["#C0392B", "#156CED", "#7B2CBF", "#1E8A5F", "#D48806"];

const cards = Array.from({ length: 15 }, (_, i) => ({
  id: `card-${i}`,
  alt_description: `sample photo card ${i + 1}`,
  description: null,
  color: colors[i % colors.length],
  likes: (i * 137) % 5000,
  width: 4000,
  height: 6000,
  urls: {
    small: `https://picsum.photos/seed/venbay-${i}/400/533`,
  },
  links: {
    html: "https://unsplash.com",
  },
  user: {
    name: "Jane Photographer",
  },
}));

export default {
  title: "Components/CardList",
  component: CardGrid,
};

export const Default = () => ({
  input: {
    cards,
  },
});

export const SingleRow = () => ({
  input: {
    cards: cards.slice(0, 5),
  },
});

export const Empty = () => ({
  input: {
    cards: [],
  },
});
