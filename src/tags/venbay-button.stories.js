import Button from "./venbay-button.marko";

export default {
  title: "Components/Button",
  component: Button,
};

export const Dispense = () => ({
  input: {
    label: "Dispense",
    icon: "⏏",
    variant: "primary",
  },
});

export const Secondary = () => ({
  input: {
    label: "Cancel",
    variant: "secondary",
  },
});

export const Disabled = () => ({
  input: {
    label: "Dispense",
    icon: "⏏",
    variant: "primary",
    disabled: true,
  },
});
