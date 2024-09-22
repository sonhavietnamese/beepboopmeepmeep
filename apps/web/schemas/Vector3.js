// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.35
// 

const schema = require("@colyseus/schema");
const Schema = schema.Schema;
const type = schema.type;


class Vector3 extends Schema {
    constructor () {
        super();

    }
}
type("number")(Vector3.prototype, "x");
type("number")(Vector3.prototype, "y");
type("number")(Vector3.prototype, "z");

export default Vector3;
