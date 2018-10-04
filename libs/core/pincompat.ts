//% noRefCounting fixedInstances
class PwmOnlyPin {
    public id: number;
    constructor(id: number) {
        this.id = id;
    }

    public digitalPin(): DigitalPin {
        return <DigitalPin>this.id;
    }

    public analogPin(): AnalogPin {
        return <AnalogPin> this.id;
    }

    public servoWrite(value: int32): void {
        pins.servoWritePin(this.analogPin(), value);
    }

    public servoSetPulse(duration: int32): void {
        pins.servoSetPulse(this.analogPin(), duration);        
    }
}

namespace pins {
    /**
     * Pin P0
     */
    //% fixedInstance whenUsed
    export const P0 : PwmOnlyPin = new PwmOnlyPin(DigitalPin.P0);

    /**
     * Pin P1
     */
    //% fixedInstance whenUsed
    export const P1 : PwmOnlyPin = new PwmOnlyPin(DigitalPin.P1);

    /**
     * Pin P2
     */
    //% fixedInstance whenUsed
    export const P2 : PwmOnlyPin = new PwmOnlyPin(DigitalPin.P2);
}
