# Duck Chain

This project uses the @boardname@ radio and **block chain** to create a fun game of teleporting ducks.

## Teleporting duck

Teleporting duck is a simple program where a @boardname@ send a message to other @boardname@ using radio. 
When receiving a message, you display the message on the screen.

The @boardname@ contains a radio antenna that allows to send small message. In this program, we send a ``"DUCK"`` message
when pressing ``A`` and we display a duck when receiving a message.

Try this code with 2 @boardname@.

```blocks
input.onButtonPressed(Button.A, () => {
    basic.clearScreen()
    radio.sendString("DUCK")
})
radio.onDataPacketReceived( ({ receivedString }) =>  {
    basic.showLeds(`
        . # # . .
        # # # . .
        . # # # #
        . # # # .
        . . . . .
        `)
})
radio.setGroup(1)
```

## ~ hint

The **teleporting duck** is a popular @boardname@ program invented by [@ntoll](https://twitter.com/ntoll).

## ~

## Ducks are multiplying!

It all works fine if you use 2 @boardname@, but as soon as you add more boards, ducks start multiplying. That is, when a @boardname@ sends 1 duck message, all other @boardname@ receive it and display it. That's too many ducks! We are going to change the program so that only 1 duck exists in the game, even if you have many @boardname@.

## Catch the duck

The first step is to slightly change the game play. When you receiving a ``"DUCK"`` message, you'll need to catch it. In this case, catching it means, you need to shake the @boardname@.

* add a ``duck`` variable and assign it to ``true`` in the ``radio received block``
* instead of showing the duck, show an mail envolope image

```blocks
let duck = false
radio.onDataPacketReceived( ({ receivedString }) =>  {
    duck = true
    basic.showLeds(`
        # # # # #
        # # . # #
        # . # . #
        # . . . #
        # # # # #
        `)
})
```

* add a ``on shake`` event where code checks if a duck is waiting or not.
* **if** the ``duck`` variable is ``true``, show the duck image **else** show a skull

```blocks
let duck = false
input.onGesture(Gesture.Shake, () => {
    if (duck) {
        basic.showLeds(`
            . # # . .
            # # # . .
            . # # # #
            . # # # .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            . # # # .
            # . # . #
            # # # # #
            . # . # .
            . # # # .
            `)
    }
    duck = false
})
```

Put all these pieces together and you have new reaction game when player have to shake the @boardname@ to catch the duck.

```blocks
let duck = false
input.onButtonPressed(Button.A, () => {
    basic.clearScreen()
    radio.sendString("DUCK")
})
input.onGesture(Gesture.Shake, () => {
    if (duck) {
        basic.showLeds(`
            . # # . .
            # # # . .
            . # # # #
            . # # # .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            . # # # .
            # . # . #
            # # # # #
            . # . # .
            . # # # .
            `)
    }
    duck = false
})
radio.onDataPacketReceived( ({ receivedString }) =>  {
    duck = true
    basic.showLeds(`
        # # # # #
        # # . # #
        # . # . #
        # . . . #
        # # # # #
        `)
})
radio.setGroup(1)
```

## Recording the catch in a block chain

The next step when successfully catching a duck is to tell all other @boradname@ that you have it. The first @boardname@ who catches gets to keep it. To tell other players, we are going to use a **block chain**.

A **block chain** is a plubic ledger that encodes all past translations. In this project, a transaction is a successful catch of a duck. Once a translation is added to a block chain, the block chain is transmitted to other @boardname@ which can verify the translation and update their own copy of the chain.

* go to ``Advanced``, ``Add package`` and search for ``pxt-blockchain``
* add the **pxt-blockchain** package to your project

```blocks
let TRANSIT = 1;
let CATCH = 2;
input.onButtonPressed(Button.AB, () => {
    basic.clearScreen()
    blockchain.addBlock(CATCH)
})
input.onGesture(Gesture.Shake, () => {
    if (blockchain.lastBlock() == TRANSIT) {
        blockchain.addBlock(CATCH);
        basic.showLeds(`
            . # # . .
            # # # . .
            . # # # #
            . # # # .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            . # # # .
            # . # . #
            # # # # #
            . # . # .
            . # # # .
            `)
    }
})
blockchain.onUpdate(() => {
    if (blockchain.lastBlock() == TRANSIT) {
        basic.showLeds(`
            # # # # #
            # # . # #
            # . # . #
            # . . . #
            # # # # #
            `)
    } else if (blockchain.lastBlock() == CATCH) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . # . .
            . # . # .
            . . . . .
            `)
    }
})
```

## Making sure you send a duck only when you have one

The code in ``on button pressed`` does not check if the player has a duck so pressing ``A`` multiple times will generate many ducks!

```blocks
let TRANSIT = 1;
let CATCH = 2;
input.onButtonPressed(Button.A, () => {
    if (blockchain.me() == blockchain.lastId() &&
        blockchain.lastValue() == CATCH) {
        basic.clearScreen()
        blockchain.addBlock(TRANSIT)
    } else {
        basic.showLeds(`
            . # # # .
            # . # . #
            # # # # #
            . # . # .
            . # # # .
            `)        
    }
})
input.onButtonPressed(Button.AB, () => {
    if (blockchain.length == 0) {
        blockchain.addBlock(CATCH)
    }
})
```

```package
blockchain=github:Microsoft/pxt-blockchain#master
```