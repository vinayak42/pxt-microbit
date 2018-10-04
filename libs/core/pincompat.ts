//% noRefCounting fixedInstances
abstract class Pin {
    public id: number;
    constructor(id: number) {
        this.id = id;
    }

    protected digitalId(): DigitalPin {
        return <DigitalPin>this.id;
    }

    protected analogId(): AnalogPin {
        return <AnalogPin>this.id;
    }
}

//% noRefCounting fixedInstances
class AnalogInPin extends Pin {
    constructor(id: number) {
        super(id);
    }

    public analogRead(): number {
        return pins.analogReadPin(this.analogId());
    }
}


//% noRefCounting fixedInstances
class AnalogOutPin extends AnalogInPin {
    public id: number;
    constructor(id: number) {
        super(id);
    }

    analogWrite(value: number): void {
        pins.analogWritePin(this.analogId(), value);
    }
}

//% noRefCounting fixedInstances
class PwmOnlyPin extends AnalogOutPin {
    constructor(id: number) {
        super(id);
    }

    //% parts=microservo trackArgs=0
    public analogSetPeriod(period: number): void {
        pins.analogSetPeriod(this.analogId(), period);
    }

    //% parts=microservo trackArgs=0
    public servoWrite(value: number): void {
        pins.servoWritePin(this.analogId(), value);
    }

    //% parts=microservo trackArgs=0
    public servoSetPulse(duration: number): void {
        pins.servoSetPulse(this.analogId(), duration);
    }
}

namespace pins {
    /**
     * Pin P0
     */
    //% fixedInstance whenUsed
    export const P0: PwmOnlyPin = new PwmOnlyPin(DigitalPin.P0);

    /**
     * Pin P1
     */
    //% fixedInstance whenUsed
    export const P1: PwmOnlyPin = new PwmOnlyPin(DigitalPin.P1);

    /**
     * Pin P2
     */
    //% fixedInstance whenUsed
    export const P2: PwmOnlyPin = new PwmOnlyPin(DigitalPin.P2);
}
