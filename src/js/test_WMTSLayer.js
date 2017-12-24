// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/accessorSupport/decorators dojo/_base/lang ../request ../core/HandleRegistry ../core/Collection ../core/promiseUtils ./Layer ./WebTileLayer ./mixins/OperationalLayer ./mixins/PortalLayer ./support/WMTSSublayer ./support/wmtsUtils".split(" "),
    function (d, z, q, g, f, l, m, n, r, t, u, v, w, x, h, k)

        /*require												d
        exports	 z
        ../core/tsSupport/declareExtendsHelper				 q
        ../core/tsSupport/decorateHelper				 g
        ../core/accessorSupport/decorators				 f
        dojo/_base/lang									 l
        ../request	 									m
        ../core/HandleRegistry							 n
        ../core/Collection					 r
        ../core/promiseUtils					 t
        ./Layer	 						u
        ./WebTileLayer					 v
        ./mixins/OperationalLayer	 w
        ./mixins/PortalLayer	 		x
        ./support/WMTSSublayer	 		h
        ./support/wmtsUtils	 			k
        */


    {
        function y(d, e)
        {
            return d.map(function (a)
            {
                var b = new h;
                b.read(a, e);
                return b;
            })
        }
        var p =
            {
                "image/png" : ".png", "image/png8" : ".png", "image/png24" : ".png", "image/png32" : ".png", "image/jpg" : ".jpg",
                "image/jpeg" : ".jpeg", "image/gif" : ".gif", "image/bmp" : ".bmp", "image/tiff" : ".tif", "image/jpgpng" : "",
                "image/jpegpng" : "", "image/unknown" : ""
            };
        d = function (d)
        {
            function e(a, b)
            {
                var c = d.call(this) || this;
                c._sublayersHandles = new n;
                c.copyright = null;
                c.customParameters = null;
                c.customLayerParameters = null;
                c.operationalLayerType = "WMTS";
                c.resourceInfo = null;
                c.serviceMode = "RESTful";
                c.sublayers = null;
                c.type = "wmts";
                c.version = "1.0.0";
                c.watch("activeLayer", function (a, b)
                    {
                        b && (b.layer = null);
                        a && (a.layer = c);
                    },
                    !0);
                c.watch("sublayers", function (a, b)
                    {
                        b && (b.forEach(function (a)
                        {
                            a.layer = null;
                        }), c._sublayersHandles.removeAll(), c._sublayersHandles = null);
                        a && (a.forEach(function (a)
                        {
                            a.layer = c;
                        }), c._sublayersHandles || (c._sublayersHandles = new n), c._sublayersHandles.add([a.on("after-add",
                            function (a)
                            {
                                a.item.layer = c;
                            }), a.on("after-remove", function (a)
                        {
                            a.item.layer = null;
                        })]))
                    },
                    !0);
                return c
            }
            q(e, d);
            e.prototype.normalizeCtorArgs = function (a, b)
            {
                return "string" === typeof a ? l.mixin({}, {
                    url : a
                }, b) : a
            };
            e.prototype.load = function ()
            {
                var a = this;
                if ("KVP" !== this.serviceMode && "RESTful" !== this.serviceMode) {
                    console.error("WMTS mode could only be 'KVP' or 'RESTful'");
                }
                else
                {
                    return this.addResolvingPromise(this.loadFromPortal(
                        {
                            supportedTypes : ["WMTS"]
                        }).then(function ()
                    {
                        return a._fetchService();
                    })), this;
                }
            };
            Object.defineProperty(e.prototype, "activeLayer",
                {
                    get : function ()
                    {
                        return this._get("activeLayer");
                    },
                    set : function (a)
                    {
                        this._set("activeLayer", a)
                    },
                    enumerable :!0, configurable :!0
                });
            e.prototype.readActiveLayerFromService = function (a, b, c)
            {
                var d = this, e;
                this.activeLayer ? b.layers.some(function (a)
                {
                    return a.id === d.activeLayer.id ? (e = a, !0) :!1;
                }) : (this.activeLayer = new h, e = b.layers[0]);
                this.activeLayer.read(e, c);
                return this.activeLayer;
            };
            e.prototype.readActiveLayerFromItemOrWebMap = function (a, b, c)
            {
                return new h(
                    {
                        id : b.wmtsInfo.layerIdentifier, tileMatrixSetId : b.wmtsInfo.tileMatrixSet
                    })
            };
            e.prototype.readServiceMode = function (a, b, c)
            {
                return - 1 < b.templateUrl.indexOf("?") ? "KVP" : "RESTful";
            };
            e.prototype.readSublayersFromService = function (a, b, c)
            {
                return y(b.layers, c);
            };
            Object.defineProperty(e.prototype, "title",
                {
                    get : function ()
                    {
                        return "Layer" === this._get("title") ? this.activeLayer.title : this._get("title");
                    },
                    set : function (a)
                    {
                        this._set("title", a)
                    },
                    enumerable :!0, configurable :!0
                });
            Object.defineProperty(e.prototype, "url",
                {
                    get : function ()
                    {
                        return this._get("url");
                    },
                    set : function (a)
                    {
                        a && "/" === a.substr(-1) ? this._set("url", a.slice(0, - 1)) : this._set("url", a)
                    },
                    enumerable :!0, configurable :!0
                });
            e.prototype.readUrlFromService = function (a, b, c)
            {
                return b.tileUrl;
            };
            e.prototype.readUrlFromItemOrWebMap = function (a, b, c)
            {
                return b.wmtsInfo.url;
            };
            e.prototype.createWebTileLayer = function (a)
            {
                var b = this.getUrlTemplate(this.activeLayer.id, this.activeLayer.tileMatrixSetId, this.activeLayer.imageFormat,
                    this.activeLayer.styleId), c = this._getTileMatrixSetById(a.tileMatrixSetId).tileInfo, d = a.fullExtent;
                a = {
                    layerIdentifier : a.id, tileMatrixSet : a.tileMatrixSetId, url : this.url
                };
                this.customLayerParameters && (a.customLayerParameters = this.customLayerParameters);
                this.customParameters && (a.customParameters = this.customParameters);
                return new v(
                    {
                        fullExtent : d, urlTemplate : b, tileInfo : c, wmtsInfo : a
                    })
            };
            e.prototype.fetchTile = function (a, b, c)
            {
                a = this.getTileUrl(a, b, c);
                return m(a,
                    {
                        responseType : "image"
                    }).then(function (a)
                {
                    return a.data;
                })
            };
            e.prototype.findSublayerById = function (a)
            {
                return this.sublayers.find(function (b)
                {
                    return b.id === a;
                })
            };
            e.prototype.getTileUrl = function (a, b, c)
            {
                var d = this._getTileMatrixSetById(this.activeLayer.tileMatrixSetId).tileInfo.lods[a], d = d.levelValue ? d.levelValue : String(d.level);
                (a = this.resourceInfo ? "" : k.getTileUrlFromResourceUrls(this.activeLayer.id, this.activeLayer.tileMatrixSetId,
                    this.activeLayer.styleId, a, b, c)) || (a = this.getUrlTemplate(this.activeLayer.id, this.activeLayer.tileMatrixSetId,
                    this.activeLayer.imageFormat, this.activeLayer.styleId).replace(/\{level\}/gi, d).replace(/\{row\}/gi,
                    b).replace(/\{col\}/gi, c));
                return a = this._appendCustomLayerParameters(a);
            };
            e.prototype.getUrlTemplate = function (a, b, c, d)
            {
                var e = "";
                if (!this.resourceInfo && (e = k.getTileUrlTemplateFromResourceUrls(a, b, c, d))) {
                    return e;
                }
                "KVP" === this.serviceMode ? e = this.url + "SERVICE\x3dWMTS\x26VERSION\x3d" + this.version + "\x26REQUEST\x3dGetTile\x26LAYER\x3d" + a + "\x26STYLE\x3d" + d + "\x26FORMAT\x3d" + c + "\x26TILEMATRIXSET\x3d" + b + "\x26TILEMATRIX\x3d{level}\x26TILEROW\x3d{row}\x26TILECOL\x3d{col}" : "RESTful" === this.serviceMode && (e = "",
                p[c.toLowerCase()] && (e = p[c.toLowerCase()]), e = this.url + a + "/" + d + "/" + b + "/{level}/{row}/{col}" + e);
                return e;
            };
            e.prototype._fetchService = function ()
            {
                var a = this;
                return t.resolve().then(function ()
                {
                    if (a.resourceInfo)
                    {
                        return "KVP" === a.resourceInfo.serviceMode && (a.url +=- 1 < a.url.indexOf("?") ? "" : "?"),
                            {
                                ssl :!1, data : a.resourceInfo
                            };
                    }
                    var b = a._getCapabilitiesUrl(a.serviceMode);
                    return m(b,
                        {
                            responseType : "text", callbackParamName : "callback"
                        }).otherwise(function (c)
                    {
                        b = a._getCapabilitiesUrl("KVP" === a.serviceMode ? "RESTful" : "KVP");
                        return m(b,
                            {
                                responseType : "text", callbackParamName : "callback"
                            })
                    })
                }).then(function (b)
                {
                    b.data = a.resourceInfo ? k.parseResourceInfo(b.data) : k.parseCapabilities(b.data, {
                        serviceMode : a.serviceMode
                    });
                    b.data && a.read(b.data, {
                        origin : "service"
                    })
                })
            };
            e.prototype._getTileMatrixSetById = function (a)
            {
                return this.findSublayerById(this.activeLayer.id).tileMatrixSets.find(function (b)
                {
                    return b.id === a;
                })
            };
            e.prototype._appendCustomParameters = function (a)
            {
                if (this.customParameters)
                {
                    for (var b in this.customParameters)
                    {
                        a += (-1 === a.indexOf("?") ? "?" : "\x26") + b + "\x3d" + encodeURIComponent(this.customParameters[b]);
                    }
                }
                return a;
            };
            e.prototype._appendCustomLayerParameters = function (a)
            {
                if (this.customLayerParameters || this.customParameters)
                {
                    var b = l.clone(this.customParameters || {});
                    l.mixin(b, this.customLayerParameters || {});
                    for (var c in b) {
                        a += (-1 === a.indexOf("?") ? "?" : "\x26") + c + "\x3d" + encodeURIComponent(b[c]);
                    }
                }
                return a;
            };
            e.prototype._getCapabilitiesUrl = function (a)
            {
                var b;
                this.url = this.url.split("?")[0];
                "KVP" === a ? (this.url += "?", b = this.url + "request\x3dGetCapabilities\x26service\x3dWMTS\x26version\x3d" + this.version) : "RESTful" === a && (b = this.url + "/" + this.version + "/WMTSCapabilities.xml");
                return b = this._appendCustomParameters(b);
            };
            return e
        }
        (f.declared(u, w, x));
        g([f.shared({
            "2d" : "../views/2d/layers/WMTSLayerView2D"
        })], d.prototype, "viewModulePaths", void 0);
        g([f.property({
            type : h, dependsOn : ["sublayers"]
        })], d.prototype, "activeLayer", null);
        g([f.reader("service", "activeLayer", ["layers"])], d.prototype, "readActiveLayerFromService", null);
        g([f.reader(["web-map", "portal-item"], "activeLayer", ["wmtsInfo"])], d.prototype, "readActiveLayerFromItemOrWebMap",
            null);
        g([f.property()], d.prototype, "copyright", void 0);
        g([f.property()], d.prototype, "customParameters", void 0);
        g([f.property()], d.prototype, "customLayerParameters", void 0);
        g([f.property()], d.prototype, "operationalLayerType", void 0);
        g([f.property()], d.prototype, "resourceInfo", void 0);
        g([f.property()], d.prototype, "serviceMode", void 0);
        g([f.reader(["portal-item", "web-map"], "serviceMode", ["templateUrl"])], d.prototype, "readServiceMode",
            null);
        g([f.property({
            type : r.ofType(h)
        })], d.prototype, "sublayers", void 0);
        g([f.reader("service", "sublayers", ["layers"])], d.prototype, "readSublayersFromService", null);
        g([f.property({
            dependsOn : ["activeLayer"], json : {
                read : {
                    source : "title"
                }
            }
        })], d.prototype, "title", null);
        g([f.property({
            json : {
                read :!1
            },
            readOnly :!0, value : "wmts"
        })], d.prototype, "type", void 0);
        g([f.property()], d.prototype, "url", null);
        g([f.reader("service", "url", ["tileUrl"])], d.prototype, "readUrlFromService", null);
        g([f.reader(["portal-item", "web-map"], "url", ["wmtsInfo"])], d.prototype, "readUrlFromItemOrWebMap",
            null);
        g([f.property()], d.prototype, "version", void 0);
        return d = g([f.subclass("esri.layers.WMTSLayer")], d);
    });
