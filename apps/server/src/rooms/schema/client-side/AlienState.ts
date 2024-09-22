// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.35
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';
import { Vector3 } from './Vector3'

export class AlienState extends Schema {
    @type("string") public sessionId!: string;
    @type("string") public role!: string;
    @type(Vector3) public position: Vector3 = new Vector3();
    @type(Vector3) public rotation: Vector3 = new Vector3();
    @type("string") public animation!: string;
    @type("boolean") public isHost!: boolean;
}
