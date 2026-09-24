import TradingCard from "./trading-card.marko";

const mockCard = {
  alt_description: "a red fox standing in a snowy field",
  description: null,
  color: "#C0392B",
  likes: 214,
  width: 4000,
  height: 6000,
  urls: {
    small: "https://picsum.photos/seed/venbay-fox/400/533",
  },
  links: {
    html: "https://unsplash.com",
  },
  user: {
    name: "Jane Photographer",
  },
};

export default {
  title: "Components/TradingCard",
  component: TradingCard,
};

export const Default = () => ({
  input: {
    card: mockCard,
    code: "A1",
  },
});

export const NoDescription = () => ({
  input: {
    card: { ...mockCard, alt_description: null, description: null },
    code: "C3",
  },
});

export const HighLikes = () => ({
  input: {
    card: { ...mockCard, likes: 18420, color: "#156CED" },
    code: "E5",
  },
});

export const Rare = () => ({
  input: {
    card: { ...mockCard, color: "#7B2CBF" },
    code: "B4",
    rare: true,
  },
});
