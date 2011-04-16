/**
 * Cannon.js
 *
 * @author ktoso
 * @date 16.04.11
 * @version 1
 */

var Cannon = Class.extend({

    x: 30,
    y: 30,

    currentBrowser: null,

    browsers: [

    ],

    fixDef: null,

    init: function() {
        this.fixDef = new b2FixtureDef;
        this.fixDef.density = 1.0;
        this.fixDef.friction = 0.5;
        this.fixDef.restitution = 0.2;
    },

    fire: function() {
        mousePVec = new b2Vec2(this.x, this.y);
        var aabb = new b2AABB();

        aabb.lowerBound.Set(this.y - 0.001, this.y - 0.001);
        aabb.upperBound.Set(this.y + 0.001, this.y + 0.001);

        // Query the world for overlapping shapes.

        selectedBody = null;
        world.QueryAABB(getBodyCB, aabb);
        return selectedBody;
    }
});