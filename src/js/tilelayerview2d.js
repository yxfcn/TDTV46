// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.5/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/tsSupport/decorateHelper ../../../core/accessorSupport/decorators ../../../core/ObjectPool ../../../core/Error ../../../core/promiseUtils ./LayerView2D ../tiling/TileInfoView ../tiling/TileKey ../tiling/TileQueue ../tiling/TileStrategy ../engine/Bitmap ../engine/BitmapSource ../engine/BitmapContainer ../engine/Canvas2DContainer ../engine/Tiled ../../layers/RefreshableLayerView".split(" "), function (B, C, f, h, e, m, k, n, p, q, r, t,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               u, v, w, x, y, z, A) {
    var l = function (d) {
        function b(a) {
            a = d.call(this, a) || this;
            a.key = new r(0, 0, 0, 0);
            return a
        }

        f(b, d);
        b.prototype.acquire = function (a) {
        };
        b.prototype.release = function () {
            this.key.set(0, 0, 0, 0)
        };
        b.pool = new m(b, !0);
        return b
    }(z(v));
    return function (d) {
        function b() {
            var a = null !== d && d.apply(this, arguments) || this;
            a._tileStrategy = null;
            a._tileInfoView = null;
            a._fetchQueue = null;
            a._tileRequests = new Map;
            a.container = new y;
            a.layer = null;
            return a
        }

        f(b, d);
        b.prototype.initialize = function () {
            var a = this.layer.tileInfo, a =
                a && a.spatialReference, c;
            a || (c = new k("layerview:tiling-information-missing", "The layer doesn't provide tiling information", {layer: this.layer}));
            a.equals(this.view.spatialReference) || (c = new k("layerview:spatial-reference-incompatible", "The spatial reference of this layer does not meet the requirements of the view", {layer: this.layer}));
            c && this.addResolvingPromise(n.reject(c))
        };
        b.prototype.hitTest = function (a, c) {
            return null
        };
        b.prototype.update = function (a) {
            this._fetchQueue.pause();
            this._fetchQueue.state =
                a.state;
            this._tileStrategy.update(a);
            this._fetchQueue.resume();
            this.notifyChange("updating")
        };
        b.prototype.attach = function () {
            var a = this;
            this._tileContainer = new x;
            this.container.addChild(this._tileContainer);
            this._tileInfoView = new q(this.layer.tileInfo, this.layer.fullExtent);
            this._fetchQueue = new t({
                tileInfoView: this._tileInfoView, process: function (c) {
                    return a.fetchTile(c)
                }
            });
            this._tileStrategy = new u({
                cachePolicy: "keep", acquireTile: function (c) {
                    return a.acquireTile(c)
                }, releaseTile: function (c) {
                    return a.releaseTile(c)
                },
                tileInfoView: this._tileInfoView
            })
        };
        b.prototype.detach = function () {
            this._tileStrategy.destroy();
            this._fetchQueue.clear();
            this.container.removeChild(this._tileContainer);
            this._fetchQueue = this._tileStrategy = this._tileInfoView = this._tileContainer = null
        };
        b.prototype.moveStart = function () {
            this.requestUpdate()
        };
        b.prototype.viewChange = function () {
            this.requestUpdate()
        };
        b.prototype.moveEnd = function () {
            this.requestUpdate()
        };
        b.prototype.getTileBounds = function (a, c) {
            return this._tileStrategy.tileInfoView.getTileBounds(a,
                c)
        };
        b.prototype.getTileCoords = function (a, c) {
            return this._tileStrategy.tileInfoView.getTileCoords(a, c)
        };
        b.prototype.getTileResolution = function (a) {
            return this._tileStrategy.tileInfoView.getTileResolution(a)
        };
        b.prototype.acquireTile = function (a) {
            var c = this, b = l.pool.acquire();
            b.key.set(a);
            this._tileInfoView.getTileCoords(b.coords, b.key);
            b.resolution = this._tileInfoView.getTileResolution(b.key);
            a = this._tileInfoView.tileInfo.size;
            b.width = a[0];
            b.height = a[1];
            a = this._fetchQueue.push(b.key).then(function (a) {
                b.source =
                    a;
                b.once("attach", function () {
                    return c.requestUpdate()
                });
                c._tileContainer.addChild(b);
                c.notifyChange("updating");
                c.requestUpdate()
            });
            this._tileRequests.set(b, a);
            this.requestUpdate();
            return b
        };
        b.prototype.releaseTile = function (a) {
            var b = this, g = this._tileRequests.get(a);
            g.isFulfilled() || g.cancel();
            this._tileRequests.delete(a);
            this._tileContainer.removeChild(a);
            a.once("detach", function () {
                l.pool.release(a);
                b.requestUpdate()
            });
            this.requestUpdate();
            this.notifyChange("updating")
        };
        b.prototype.fetchTile = function (a) {
            var b =
                this, g = this.layer.tilemapCache;
            if (g) {
                var d = a.level, e = a.row, f = a.col;
                return g.fetchAvailabilityUpsample(d, e, f, a).then(function () {
                    return b._fetchImage(a)
                }).otherwise(function () {
                    a.level = d;
                    a.row = e;
                    a.col = f;
                    return b._fetchImage(a)
                })
            }
            return this._fetchImage(a)
        };
        b.prototype._fetchImage = function (a) {
            var b = this;
            return this.layer.fetchTile(a.level, a.row, a.col).then(function (c) {
                c = w.pool.acquire(c);
                c.coords = b.getTileCoords(c.coords, a);
                c.resolution = b.getTileResolution(a);
                return c
            })
        };
        h([e.property({
            dependsOn: ["updateRequested",
                "attached"]
        })], b.prototype, "updating", void 0);
        return b = h([e.subclass("esri.views.2d.layers.TiledLayerView2D")], b)
    }(e.declared(p, A))
});