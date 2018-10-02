# Reset

Reset the @boardname@ and enter pairing mode.

```sig
control.resetIntoPairingMode()
```
## ~hint

**Simulator**

The **reset** function works only on a real @boardname@ and not in the simulator.

## ~

## Example

This program will enter pairing mode when AB buttons are pressed.

```blocks
input.onButtonPressed(Button.AB, () => {
    control.resetIntoPairingMode();
});
```

## See also

[reset](/reference/control/reset)