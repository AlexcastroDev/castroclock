import { schema } from './chronometer.schema'
import { Timer } from './../types/Timer.type'

function reactiveTimer(schema: any) {
    const handler: ProxyHandler<Timer> = new Proxy(schema, {
        get: function(target, property, receiver) {
            return Reflect.get(target, property, receiver);
        },
        set: function(target, property, value) {
            target.onChange && target.onChange();
            return Reflect.set(target, property, value);
        },
    })

    return new Proxy(schema, handler);
  };

const Timer = reactiveTimer(schema);

export default Timer