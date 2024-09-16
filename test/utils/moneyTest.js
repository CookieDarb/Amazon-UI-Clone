import { formatMoney } from "../../scripts/utils/money.js";

describe("test suite : formatMoney()",()=>{
    it("normal conversion",()=>{
        expect(formatMoney(2095)).toEqual('$20.95');
    });

    it("zero conversion",()=>{
        expect(formatMoney(0)).toEqual("$0.00");
    });

    it("decimal conversion",()=>{
        expect(formatMoney(2000.5)).toEqual("$20.01");
    });
});