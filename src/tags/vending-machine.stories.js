import VendingMachine from "./vending-machine.marko";

export default {
  title: "Components/VendingMachine",
  component: VendingMachine,
};

export const Idle = () => ({
  input: {
    credits: 25,
  },
});

export const RowSelected = () => ({
  input: {
    credits: 25,
    initialRow: "A",
  },
});

export const ReadyToDispense = () => ({
  input: {
    credits: 25,
    initialRow: "A",
    initialCol: 1,
    onDispense: () => {},
  },
});

export const InsufficientCredits = () => ({
  input: {
    credits: 0,
    minCost: 3,
  },
});

export const LockedIn = () => ({
  input: {
    credits: 25,
    initialRow: "B",
    initialCol: 4,
    locked: true,
    minCost: 2,
    onDispense: () => {},
  },
});
