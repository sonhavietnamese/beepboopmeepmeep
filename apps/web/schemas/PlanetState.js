// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.35
// 

const schema = require("@colyseus/schema");
const Schema = schema.Schema;
const type = schema.type;
const AlienState = require("./AlienState");

class PlanetState extends Schema {
    constructor () {
        super();
        this.aliens = new schema.MapSchema()
    }
}
type({ map: AlienState })(PlanetState.prototype, "aliens");
type("boolean")(PlanetState.prototype, "gameStarted");

export default PlanetState;
