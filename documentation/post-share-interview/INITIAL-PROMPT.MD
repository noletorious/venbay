# Noel's initial prompt

## venbay - ebays vending machine

The concept is users will be able to buy digital photo cards. The cards will be from unsplash api. Cards should be styled like trading cards, each card has a unique name, picture, a card type, with some extra stats.

Cards can be interchangeable with other products, like NFTs, digital assets, etc.

Users will be given credits on a timely bases which allow them to buy these photo cards.

## Working on this build with Noel

- Besides the scaffolding, I need to know thoroughly about the code that's being generated.
- Let's work one by one, no committing, until I say.
- In general the build needs to use minimal code, I will review most of the changes, work incrementally
- We'll work on two branches `phase-1` and `phase-2`

## Phase 1

This is the MVP. It needs to have all the functional components and acceptable UX flows.

### General layout

- The top header consists of ebays logo, `EBay_logo.svg.webp` left aligned. To the right of that, which is center aligned in the header is a search. Then to the right of that, right aligned in the header are two icon buttons: a theme toggle and a search button. The search creates a searching state, where the center search input is revealed, the ebay logo becomes "Search", then the two right buttons are a 'X' close. The search item is a keyword/phrase to query unsplash.
- Below the header are two columns. The left column is the main column where all the items are displayed. Each item since it's a vending machine item, has a corresponding row A - E, each item per row, 1 - 5. The right column, will have vending machine components. From the top of the right column, a sort of "digital" screen that by default shows the users credit balance. Below the screen a section that tells the user how to add more credits. Then below that a keypad like a vending machine, A - E, 1 - 5, plus a dispense button icon.

### Dev build requirements

- The build needs to use basic css. Okay to use css variables and or sass. Considering what components are created, write css to get me started
- Storybook — Integrate Storybook for at least one component, with ~3 stories
  demonstrating different inputs / properties.
- Tests — Add snapshots or unit tests.

### Noel's ask

- Create a initial steps, like the commands to follow with starting vite/marko, I think there is a npx command for that but don't know if it's supported
- Create a checklist, so we can visually see what is done and what needs to be worked on next
- Create a README.md, we'll likely update it
- Build yourself a CLAUDE.md, given the context from this initial build, formulate what you need in that file.
- Workflow: i prompt code changes, you commit only when told to.
- Create a .gitignore, add what logically makes sense to add
- Follow up with me on anything unclear
- Here is my preference for build order:
  1.  Build scaffold
  2.  Build out header
  3.  Build out left column card loop
  4.  Build out right column vending machine components
  5.  Build out search, be able to query
  6.  Setup Storybook with 3 stories, from the vending machine components
  7.  Setup snapshots or unit test, idk lets talk this through
  8.  Setup how to manage data
  9.  Work on building out the interaction of purchasing a card. Data can be mock.
  10. When a card is purchased, we'll need a /my-cards route to show all purchased cards.

## Phase 2

In this phase we want it work more on design side. At a high level these are things we can incoporate.

- In the `documentation` folder, I included ebay resource links to their component library. Maybe we can we've in parts of that.
- Add a initial state of a 3d vending machine, when the user interacts with it, it zooms to the top portion of the machine, replacing it with the app interface, making it look seamless.
