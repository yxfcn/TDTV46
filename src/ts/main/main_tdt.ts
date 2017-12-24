///<reference path="../../typings/typings46.d.ts"/>
import Map=require("esri/Map");
import MapView=require("esri/views/MapView");
import esriConfig=require("esri/config");
import SpatialReference=require("esri/geometry/SpatialReference");
import TileInfo=require("esri/layers/support/TileInfo");
import WebTileLayer=require("esri/layers/WebTileLayer");
import Extent=require("esri/geometry/Extent");
import dom=require("dojo/dom");
import on=require("dojo/on");

console.log("come in");

var map,view,baselayer;

var TDTSR=new SpatialReference({wkid:4490});

for (var i = 0; i <= 7; i++)
{
    esriConfig.request.corsEnabledServers.push("http://t" + i.toString() + ".tianditu.com/");

}
//var tdtImgLyr = new TDTLayer();
var tdtTileInfo=new TileInfo({
    dpi:96,
    spatialReference:TDTSR,
    size:[256,256],
    origin:{
        x:-180,
        y:90
    },
    lods:[
        { "level": 0, "resolution": 1.40625, "scale": 590995197.14166909755553014475 },
        { "level": 1, "resolution": 0.703125, "scale": 295497598.57083454877776507238 },
        { "level": 2, "resolution": 0.3515625, "scale": 147748799.28541727438888253619 },
        { "level": 3, "resolution": 0.17578125, "scale": 73874399.642708637194441268094 },
        { "level": 4, "resolution": 0.087890625, "scale": 36937199.821354318597220634047 },
        { "level": 5, "resolution": 0.0439453125, "scale": 18468599.910677159298610317023 },
        { "level": 6, "resolution": 0.02197265625, "scale": 9234299.955338579649305158512 },
        { "level": 7, "resolution": 0.010986328125, "scale": 4617149.9776692898246525792559 },
        { "level": 8, "resolution": 0.0054931640625, "scale": 2308574.9888346449123262896279 },
        { "level": 9, "resolution": 0.00274658203125, "scale": 1154287.494417322456163144814 },
        { "level": 10, "resolution": 0.001373291015625, "scale": 577143.74720866122808157240698 },
        { "level": 11, "resolution": 0.0006866455078125, "scale": 288571.87360433061404078620349 },
        { "level": 12, "resolution": 0.00034332275390625, "scale": 144285.93680216530702039310175 },
        { "level": 13, "resolution": 0.000171661376953125, "scale": 72142.968401082653510196550873 },
        { "level": 14, "resolution": 8.58306884765625e-005, "scale": 36071.484200541326755098275436 },
        { "level": 15, "resolution": 4.291534423828125e-005, "scale": 18035.742100270663377549137718 },
        { "level": 16, "resolution": 2.1457672119140625e-005, "scale": 9017.871050135331688774568859 },
        { "level": 17, "resolution": 1.0728836059570313e-005, "scale": 4508.9355250676658443872844296 },
        { "level": 18, "resolution": 5.3644180297851563e-006, "scale": 2254.4677625338329221936422148 },
        { "level": 19, "resolution": 0.000002682209014892578125, "scale": 1127.2338812669164610968211074 },
        { "level": 20, "resolution": 0.0000013411045074462890625, "scale": 563.61694063345823054841055369 }
    ]
});


var urlPattern="http://{subDomain}.tianditu.com/img_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=img&STYLE=default&FORMAT=&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&format=tiles";
var cvaPattern="http://t${subDomain}.tianditu.com/cva_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=cva&STYLE="
    +"default&FORMAT=&TILEMATRIXSET=c&TILEMATRIX=${level}&TILEROW=${row}&TILECOL=${col}&format=tiles";
var ciaPattern="http://{subDomain}.tianditu.cn/DataServer?T=cia_c&X={col}&Y={row}&L={level}";


var fullExtent=new Extent({
    xmin:-180,
    ymin:-90,
    xmax:180,
    ymax:90,
    spatialReference:TDTSR
});
var imgoptions={
    fullExtent:fullExtent,
    subDomains:["t0","t1","t2","t3","t4","t5","t6","t7"],
    tileInfo:tdtTileInfo,
    urlTemplate:urlPattern
};

var ciaOptions={
    fullExtent:fullExtent,
    subDomains:["t0","t1","t2","t3","t4","t5","t6","t7"],
    tileInfo:tdtTileInfo,
    urlTemplate:ciaPattern
}
map = new Map();

baselayer=new WebTileLayer(imgoptions);
var cialayer=new WebTileLayer(ciaOptions);

map.add(baselayer);
map.add(cialayer);

view = new MapView({
    map: map,
    container: "viewDiv",
    zoom:10,
    extent:fullExtent,
    spatialReference:TDTSR

});

var viewDiv=dom.byId("viewDiv");
on(view,"click",function(evt){
   console.log("x:"+evt.mapPoint.x+",y:"+evt.mapPoint.y);
});
