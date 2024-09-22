// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.35
// 

const schema = require("@colyseus/schema");
const Schema = schema.Schema;
const type = schema.type;
const Vector3 = require("./Vector3");

class AlienState extends Schema {
    constructor () {
        super();
        this.position = new Vector3()
        this.rotation = new Vector3()
    }
}
type("string")(AlienState.prototype, "sessionId");
type("string")(AlienState.prototype, "role");
type(Vector3)(AlienState.prototype, "position");
type(Vector3)(AlienState.prototype, "rotation");
type("string")(AlienState.prototype, "animation");
type("boolean")(AlienState.prototype, "isHost");

export default AlienState;
