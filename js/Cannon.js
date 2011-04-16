/**
 * Cannon.js
 *
 * @author ktoso
 * @date 16.04.11
 * @version 1
 */

var Cannon = Class.extend({

    power: 15,

    x: 30,
    y: 30,

    currentBrowser: null,

    browsers: [

    ],

    init: function() {

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