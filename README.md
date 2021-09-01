# The Chamomile Club Monorepo

## Packages

### The Chamomile Club App
Front Facing Website For The Club. Introducing London Hold'Em To The World.

#### Features
* Displays The Rules Of London Hold'Em and teaches users how to play the original game.
* Display the hands in Texas Hold'Em
* Show The Founders and Team Members
* Users can sign up to pseudo Subscriptions and apply for positions in the Club.

![Landing Page](./images/landing-app.png)
App Landing Page

### CasinoJS
Offers SVGs for common casino objects (Cards, Chips etc).

#### Features
* Currently has SVGs for a full 52 cards deck. Standard Coloured Chips and One Card Back.
* Can be used with any framework that supports SVG imports

#### Coming Soon
* Pre-made 3d Manipulations
* React Components
* More Styles

<img src="./images/ace-clubs.svg" width="100px">
<img src="./images/jack-diamonds.svg" width="100px">
<img src="./images/king-hearts.svg" width="100px">
<img src="./images/queen-spades.svg" width="100px">

Some of the cards on offer - One away from a straight.

## Setup
The Monorepo Workspace is governed by Yarn and can everything can easily be installed by running

```bash
    yarn install
```
If you want to run commands for the app workspace you can run:

```bash
    yarn app <command_name>
```
Or if you want to run commands for casinoJS:
```bash
    yarn casino <command_name>
```
