First example

```blocks
let voltage = 0
let reading = 0
basic.forever(() => {
    // start power
    pins.digitalWritePin(DigitalPin.P0, 1)
    // wait 250ms
    basic.pause(250)
    // read sensor [0..1023]
    reading = pins.analogReadPin(AnalogPin.P1)
    // stop sensor
    pins.digitalWritePin(DigitalPin.P0, 0)
    // scale data to millivolts [0..1023] -> [0..3300mV]
    voltage = pins.map(
    reading,
    0,
    1023,
    0,
    3300
    )
    // show the voltage on screen
    basic.showNumber(voltage)
    // send it to Excel, as volts [V]
    serial.writeNumber(voltage / 1000)
    serial.writeString(".")
    serial.writeNumber(voltage % 1000)
    serial.writeLine("")
})
```

```blocks
let reading = 0
let voltage = 0
radio.onDataPacketReceived( ({ receivedNumber }) =>  {
    // send it to Excel, as volts [V]
    serial.writeNumber(voltage / 1000)
    serial.writeString(".")
    serial.writeNumber(voltage % 1000)
    serial.writeLine("")
})
radio.setTransmitSerialNumber(true)
// pick a group number!!!
radio.setGroup(42)
basic.forever(() => {
    // start power
    pins.digitalWritePin(DigitalPin.P0, 1)
    // wait 250ms
    basic.pause(250)
    // read sensor [0..1023]
    reading = pins.analogReadPin(AnalogPin.P1)
    // stop sensor
    pins.digitalWritePin(DigitalPin.P0, 0)
    // scale data to millivolts [0..1023] -> [0..3300mV]
    voltage = pins.map(
    reading,
    0,
    1023,
    0,
    3300
    )
    // show the voltage on screen
    basic.showNumber(voltage)
    // send it via radio
    radio.sendNumber(voltage)
})
```