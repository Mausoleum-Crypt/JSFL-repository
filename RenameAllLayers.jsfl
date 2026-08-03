//
// RenameAllLayers
//
// Created by Davido
// https://github.com/Mausoleum-Crypt/JSFL-repository

var doc = fl.getDocumentDOM();
var lib = doc.library;
var items = lib.items;

fl.outputPanel.clear();

function renameLayers(mode) {
	var count = 0;
	var total = 0;
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		var itemName = item.name;
		if (item.itemType == "movie clip" || item.itemType == "graphic") {
			try {
				lib.editItem(itemName);
				var timeline = doc.getTimeline();
				var layers = timeline.layers;
				var totalLayers = layers.length;
				for (var layer = 0; layer < totalLayers; layer++) {
					timeline.currentLayer = layer;
					var newName = null;
					// Number mode
					if (mode === "number") {
						newName = totalLayers - layer;
					}
					// Number mode
					if (mode === "number2") {
						newName = layer + 1;
					}
					// Bitmap mode
					if (mode === "bitmap") {
						var frames = layers[layer].frames;
						for (var f = 0; f < frames.length; f++) {
							var frame = frames[f];
							if (!frame.startFrame == f) continue;
							for (var e = 0; e < frame.elements.length; e++) {
								var element = frame.elements[e];
								if (element.elementType !== "instance") {
									continue;
								}
								var libItemName = element.libraryItem.name;
								if (libItemName) {
									newName = libItemName.replace("sprite/", "").replace("image/", "");
									break;
								}
							}
							if (newName) break;
						}
					}
					if (newName !== null) {
						timeline.setLayerProperty("name", newName);
						total++;
					}
				}
				count++;
			} finally {
				doc.exitEditMode();
			}
			fl.trace("Edited: '" + itemName + "'");
		}
	}
	fl.trace("Edited: " + total + " layers.");
}

function layerColorUnification(value) {
	var count = 0;
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		var itemName = item.name;
		if (item.itemType == "movie clip" || item.itemType == "graphic") {
			try {
				lib.editItem(itemName);
				var timeline = doc.getTimeline();
				var layers = timeline.layers;
				for (var layer = 0; layer < layers.length; layer++) {
					timeline.currentLayer = layer;
					if (timeline.getLayerProperty("color") !== value) {
						timeline.setLayerProperty("color", value);
					}
				}
				count++;
			} finally {
				doc.exitEditMode();
			}
		}
		fl.trace("Edited: '" + itemName + "'");
	}
	fl.trace("Edited: " + count + " layers.");
}
// valid options
// number, number2, bitmap
var mode = "number"
var color = "#4F4FFF";

layerColorUnification(color);
renameLayers(mode);
