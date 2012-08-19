/*
* RendererNullMtx by Grant Skinner. Dec 5, 2010
* Visit http://easeljs.com/ for documentation, updates and examples.
*
*
* Copyright (c) 2010 Grant Skinner
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
* The Easel Javascript library provides a retained graphics mode for canvas
* including a full, hierarchical display list, a core interaction model, and
* helper classes to make working with Canvas much easier.
* @module EaselJS
**/

(function(window) {

/**
* A stage is the root level Container for a display list. Each time its tick method is called, it will render its display
* list to its target canvas.
* @class Stage
* @extends Container
* @constructor
* @param {HTMLCanvasElement} canvas The canvas the stage will render to.
**/
var RendererNullMtx = function(root, surface) {
  this.initialize(root, surface);
}
var p = RendererNullMtx.prototype = new Renderer();

// static properties:

// public properties:
	p.snapToPixel = true;
	p.skipCalculations = true;

// constructor:

// public methods:

	p.getSurface = function(width, height) {
		// return an empty div.
		if (this.surface == null) {
			this.surface = document.createElement("div");
			this.surface.style.overflow = "hidden";
			this.surface.style.position = "absolute";
			this.surface.innerText = "NULL RENDERER SURFACE"+(this.skipCalculations ? " (NO CALCULATIONS)" : "")
		}
		if (width) { this.surface.style.pixelWidth = width; }
		if (height) { this.surface.style.pixelHeight = height; }
		return this.surface;
	}

	/**
	* Clears the target canvas. Useful if autoClear is set to false.
	* @method clear
	**/
	p.clear = function() {
		// null renderer.
	}

	p.render = function(displayObject, surface) {
		displayObject = displayObject || this.root;
		surface = surface || this.surface;
		if (displayObject && surface) {
			this._render(displayObject, null);
		}
	}

	p._render = function(o,ctx,mtx) {
		if (this.skipCalculations || !o.isVisible()) { return; }

		if (mtx) {
			o._matrix.reinitialize(mtx.a,mtx.b,mtx.c,mtx.d,mtx.tx,mtx.ty,mtx.alpha,mtx.shadow,mtx.compositeOperation);
		} else {
			o._matrix.reinitialize(1,0,0,1,0,0);
		}
		mtx = o._matrix;
		mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);

		// render the element:
		if (o instanceof Bitmap || o.cacheCanvas) {
			// null renderer.
		} else if (o instanceof Container) {
			var list = o.children.slice(0);
			for (var i=0,l=list.length; i<l; i++) {
				this._render(list[i],ctx,mtx);
			}
		} else if (o instanceof BitmapAnimation) {
			var frame = o.spriteSheet.getFrame(o.currentFrame);
			if (frame) {
				var rect = frame.rect;
				var arr = [frame.image,rect.x,rect.y,rect.width,rect.height];
				window.__TMP__ = arr.length;
			}
			// null renderer.
		}

	}

window.RendererNullMtx = RendererNullMtx;
}(window));