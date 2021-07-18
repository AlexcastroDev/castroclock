import { padStart } from "../../src/utils/strings"

describe('Should padStart a string like ES2017 implements', () => {
    it('Should returns a object with hours, minutes and seconds', () => {
        expect(padStart(2,'1','0')).toEqual('01');
        expect(padStart(3,'1','0')).toEqual('001');
        expect(padStart(4,'1','0')).toEqual('0001');
        expect(padStart(5,'1','0')).toEqual('00001');
        expect(padStart(3,'10','0')).toEqual('010');
    });
});