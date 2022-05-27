import MapView from "@arcgis/core/views/MapView";
import ArcGISMap from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const layer = new FeatureLayer({
  portalItem: {
    id: "a3c1297d7ca64a02a14edd3b70406011"
  },
  outFields: ["*"]
});

const webmap = new ArcGISMap({
  basemap: "streets-vector",
  layers: [ layer ]
});

const view = new MapView({
  container: "viewDiv",
  map: webmap,
  center: [-100, 42],
  zoom: 5
});

view.when(() => console.log("view ready"));
