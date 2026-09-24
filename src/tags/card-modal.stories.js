import CardModal from "./card-modal.marko";

const mockCard = {
  alt_description: "a red fox standing in a snowy field",
  description: null,
  color: "#C0392B",
  likes: 214,
  width: 4000,
  height: 6000,
  urls: {
    regular: "https://picsum.photos/seed/venbay-fox/800/600",
  },
  links: {
    html: "https://unsplash.com",
  },
  user: {
    name: "Jane Photographer",
  },
};

export default {
  title: "Components/CardModal",
  component: CardModal,
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
