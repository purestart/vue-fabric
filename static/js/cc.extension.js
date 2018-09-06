fabric.Object.prototype.interaction = '';
fabric.Object.prototype.toObject = (function (toObject) {
    return function () {
        return fabric.util.object.extend(toObject.call(this), {
            interaction: this.interaction
        });
    };
})(fabric.Object.prototype.toObject);
//Video Class
fabric.Video = fabric.util.createClass(fabric.Image, {
    type: 'video',
    initialize: function(element, options) {
      options || (options = {});
      this.callSuper('initialize', element, options);
    },
    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            interaction: this.interaction,
            media: this.media
        });
    },
    _render: function (ctx) {
        this.callSuper('_render', ctx);
    }
});
fabric.Video.async = true;
fabric.Video.fromURL = function(url, callback, imgOptions) {
    fabric.util.loadImage(url, function(img) {
      callback(new fabric.Video(img, imgOptions));
    }, null, imgOptions && imgOptions.crossOrigin);
};
fabric.Video.fromObject = function (object, callback) {
    fabric.util.loadImage(object.src, function (img) {
        fabric.Image.prototype._initFilters.call(object, object, function (filters) {
            object.filters = filters || [];
            var instance = new fabric.Video(img, object);
            callback && callback(instance);
        });
    }, null, object.crossOrigin);
  };
//Create Fabric Slider Class
fabric.Slider = fabric.util.createClass(fabric.Rect, {
  type: 'slider',
  initialize: function (options) {
            options || (options = {});
            this.callSuper('initialize', options);
            console.log('inittt');
        },
  toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            id: this.id,
            fill: this.fill,
            slides: this.slides,
            interaction: this.interaction,
            pattern: this.pattern,
            patternSourceCanvas: this.patternSourceCanvas,
            filename: this.filename
        });
    },
  _render: function (ctx) {
            this.callSuper('_render', ctx);
        }
});
//Slider
fabric.Slider.fromArray = function(elements, callback, options) {
  //Define if the first Object is Video
  var firstObj;
  if (elements[0].thumbnail) {
    firstObj = elements[0].thumbnail;
  } else {
    firstObj = elements[0].src;
  }
  var extension = firstObj.split('.').pop();
  if (extension.match(/^(gif|png|jpg|jpeg|tiff|svg)$/)) {
    new fabric.Image.fromURL(firstObj, function(img) {
      var patternSourceCanvas = new fabric.StaticCanvas();
      console.log(img);
      img.setHeight(patternSourceCanvas.height);
      img.setWidth(patternSourceCanvas.width);
      patternSourceCanvas.setBackgroundImage(img);
      patternSourceCanvas.renderAll();
      console.log(patternSourceCanvas.getElement());
      var pattern = new fabric.Pattern({
        source: patternSourceCanvas.getElement(),
        repeat: 'no-repeat'
      });
      callback && callback(new fabric.Slider({
        fill: pattern,
        width: img.width,
        height: img.height,
        left: options.left,
        top: options.top,
        slides: elements,
        interaction: options.interaction,
        id: generator.generate(),
        pattern: pattern,
        patternSourceCanvas: patternSourceCanvas,
        filename: elements[0].filename
      }));
    }, null, options && options.crossOrigin);
  } else if (extension.match(/^(mp4|avi|ogg|ogv|webm|wmv)$/)) {
    //Add Single Video
    var patternSourceCanvas = new fabric.StaticCanvas();
    var vw, vh;
    var video = new fabric.Video(elements[0].src, {
      media: {
        video: elements[0].src
      }
    });
    var videoEl = video.getElement();
    var pattern = new fabric.Pattern({
        source: patternSourceCanvas.getElement(),
        repeat: 'no-repeat'
      });
    patternSourceCanvas.add(video);
    patternSourceCanvas.renderAll();
    videoEl.onloadeddata = function() {
      vw = this.videoWidth;
      vh = this.videoHeight;
      video.setWidth(patternSourceCanvas.width);
      video.setHeight(patternSourceCanvas.height);
      video.center();
      video.setCoords();
      canvas.renderAll();
    };
    fabric.util.requestAnimFrame(function render() {
      patternSourceCanvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
    callback && callback(new fabric.Slider({
        fill: pattern,
        width: patternSourceCanvas.width,
        height: patternSourceCanvas.height,
        left: options.left,
        top: options.top,
        slides: elements,
        interaction: options.interaction,
        id: generator.generate(),
        pattern: pattern,
        patternSourceCanvas: patternSourceCanvas,
        filename: elements[0].filename
      }));
  } else {
    console.log('不支援此檔案格式，請重試');
  }
}
fabric.Slider.fromObject = function(objects, callback, options) {
  //Define if the first Object is Video
  // var firstObj = objects.slides[0].src;
  var firstObj;
  if (objects.slides[0].thumbnail) {
    firstObj = objects.slides[0].thumbnail;
  } else {
    firstObj = objects.slides[0].src;
  }
  var extension = firstObj.split('.').pop();
  if (extension.match(/^(gif|png|jpg|jpeg|tiff|svg)$/)) {
    new fabric.Image.fromURL(firstObj, function(img) {
      var patternSourceCanvas = new fabric.StaticCanvas();
      console.log(img);
      img.setHeight(patternSourceCanvas.height);
      img.setWidth(patternSourceCanvas.width);
      patternSourceCanvas.setBackgroundImage(img);
      patternSourceCanvas.renderAll();
      console.log(patternSourceCanvas.getElement());
      var pattern = new fabric.Pattern({
        source: patternSourceCanvas.getElement(),
        repeat: 'no-repeat'
      });
      callback && callback(new fabric.Slider({
        width: objects.width,
        height: objects.height,
        scaleX: objects.scaleX,
        scaleY: objects.scaleY,
        top: objects.top,
        left: objects.left,
        slides: objects.slides,
        interaction: objects.interaction,
        fill: pattern,
        id: objects.id,
        pattern: pattern,
        patternSourceCanvas: patternSourceCanvas,
        filename: objects.slides[0].filename
      }));
    }, null, options && options.crossOrigin);
  } else if (extension.match(/^(mp4|avi|ogg|ogv|webm)$/)) {
    //Add Single Video
    var patternSourceCanvas = new fabric.StaticCanvas();
    var vw, vh;
    var video = new fabric.Video(firstObj, {
      media: {
        video: firstObj
      }
    });
    var videoEl = video.getElement();
    var pattern = new fabric.Pattern({
        source: patternSourceCanvas.getElement(),
        repeat: 'no-repeat'
      });
    patternSourceCanvas.add(video);
    patternSourceCanvas.renderAll();
    videoEl.onloadeddata = function() {
      vw = this.videoWidth;
      vh = this.videoHeight;
      video.setWidth(patternSourceCanvas.width);
      video.setHeight(patternSourceCanvas.height);
      video.center();
      video.setCoords();
      canvas.renderAll();
    };
    fabric.util.requestAnimFrame(function render() {
      patternSourceCanvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
    callback && callback(new fabric.Slider({
      width: objects.width,
      height: objects.height,
      scaleX: objects.scaleX,
      scaleY: objects.scaleY,
      top: objects.top,
      left: objects.left,
      slides: objects.slides,
      fill: pattern,
      id: objects.id,
      interaction: objects.interaction,
      pattern: pattern,
      patternSourceCanvas: patternSourceCanvas,
      filename: objects.slides[0].filename
    }));
  } else {
    console.log('不支援此檔案格式，請重試');
  }
};
fabric.Slider.async = true;
var generator = new IDGenerator();
function IDGenerator() {
	this.length = 8;
	this.timestamp = +new Date;
	var _getRandomInt = function( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
	}
	this.generate = function() {
		var ts = this.timestamp.toString();
		var parts = ts.split( '' ).reverse();
		var id = '';
	 
		for( var i = 0; i < this.length; ++i ) {
		var index = _getRandomInt( 0, parts.length - 1 );
		id += parts[index];	 
		}
		return id;
	}
}
function findObj(id) {
	for(var i=0;i<canvas._objects.length; i++) {
		if (canvas._objects[i].id === id) {
			return canvas._objects[i];
			// console.log(canvas._objects[i]);
		} else {
			console.log(canvas._objects[i]);
		}
	}
}
//EClock Class
fabric.Eclock = fabric.util.createClass(fabric.Text, {
  type: 'eclock',
  initialize: function(element, options) {
    options || (options = {});
    this.callSuper('initialize', element, options);
    //Change it on the fly
    var instance = this;
    console.log(instance);
    //Init Now
    eclockSimulate(instance);
    function eclockSimulate(instance) {
        instance.set('text', moment().tz(options.gmt).format(options.format));
        canvas.renderAll();
        setTimeout(function(){eclockSimulate(instance);},1000);
    };
  },
  toObject: function () {
      return fabric.util.object.extend(this.callSuper('toObject'), {
          interaction: this.interaction,
          format: this.format,
          gmt: this.gmt
      });
  },
  _render : function(ctx) {
        this.callSuper('_render', ctx);
    }
});
fabric.Eclock.fromObject = function(object) {
    return new fabric.Eclock(object.text, object);
};
fabric.Eclock.async = false;
//Create Fabric Clock Class
fabric.Clock = fabric.util.createClass(fabric.Group, {
  type: 'clock',
  initialize: function (objects, options, alreadyGrouped) {
            this.callSuper('initialize',objects , options, alreadyGrouped);
            //Clock Sync
              console.log(objects);
              var canvasClock,
                  canvasClockHour,
                  canvasClockMin,
                  canvasClockSec,
                  canvasClockTimeZone;
              canvasClockHour = objects[1];
              canvasClockMin = objects[2];
              canvasClockSec = objects[3];
              canvasClockTimeZone = options.gmt;
              
              console.log(options);
              //Init Now
              clockSimulate();
              //Routine
              setTimeout(function(){
                  clockSimulate();
              },1000);
              function clockSimulate() {
                  canvasClockHour.setAngle(30*moment().tz(canvasClockTimeZone).format('H')+6*moment().tz(canvasClockTimeZone).format('mm')/360*30);
                  canvasClockMin.setAngle(6*moment().tz(canvasClockTimeZone).format('mm'));
                  canvasClockSec.setAngle(6*moment().tz(canvasClockTimeZone).format('ss'));
                  canvas.renderAll();
                  setTimeout(function(){clockSimulate();},1000);
              }
        },
  toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            interaction: this.interaction,
            frame: this.frame,
            hour: this.hour,
            minute: this.minute,
            second: this.second,
            gmt: this.gmt
        });
    },
  _render: function (ctx) {
            this.callSuper('_render', ctx);
        }
});
fabric.Clock.fromObject = function(object, callback) {
  var _enlivenedObjects;
    fabric.util.enlivenObjects(object.objects, function (enlivenedObjects) {
        delete object.objects;
        _enlivenedObjects = enlivenedObjects;
    });
    return new fabric.Clock(_enlivenedObjects, object, true);
};
//Create Fabric Marquee Class
// http://stackoverflow.com/questions/20407546/scale-some-object-but-not-others-in-a-fabric-group
fabric.Marquee = fabric.util.createClass(fabric.Group, {
  type: 'marquee',
  initialize: function (objects, options, alreadyGrouped) {
            this.callSuper('initialize',objects , options, alreadyGrouped);
        },
  toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            interaction: this.interaction,
            marquee: this.marquee
        });
    },
  _render: function (ctx) {
            this.callSuper('_render', ctx);
        }
});
fabric.Marquee.fromObject = function(object, callback) {
  var _enlivenedObjects;
    fabric.util.enlivenObjects(object.objects, function (enlivenedObjects) {
        delete object.objects;
        _enlivenedObjects = enlivenedObjects;
    });
    return new fabric.Marquee(_enlivenedObjects, object, true);
};
//Create Fabric Rss Class
// http://stackoverflow.com/questions/20407546/scale-some-object-but-not-others-in-a-fabric-group
fabric.Rss = fabric.util.createClass(fabric.Group, {
  type: 'rss',
  initialize: function (objects, options, alreadyGrouped) {
            this.callSuper('initialize',objects , options, alreadyGrouped);
        },
  toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            interaction: this.interaction,
            rss: this.rss
        });
    },
  _render: function (ctx) {
            this.callSuper('_render', ctx);
        }
});
fabric.Rss.fromObject = function(object, callback) {
  var _enlivenedObjects;
    fabric.util.enlivenObjects(object.objects, function (enlivenedObjects) {
        delete object.objects;
        _enlivenedObjects = enlivenedObjects;
    });
    return new fabric.Rss(_enlivenedObjects, object, true);
};
//Create Fabric USB Class
fabric.Usbframe = fabric.util.createClass(fabric.Group, {
  type: 'usbframe',
  initialize: function (objects, options, alreadyGrouped) {
            this.callSuper('initialize',objects , options, alreadyGrouped);
        },
  toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            interaction: this.interaction
        });
    },
  _render: function (ctx) {
            this.callSuper('_render', ctx);
        }
});
fabric.Usbframe.fromObject = function(object, callback) {
  var _enlivenedObjects;
    fabric.util.enlivenObjects(object.objects, function (enlivenedObjects) {
        delete object.objects;
        _enlivenedObjects = enlivenedObjects;
    });
    return new fabric.Usbframe(_enlivenedObjects, object, true);
};
//Create Fabric Webview Class
fabric.Webview = fabric.util.createClass(fabric.Group, {
  type: 'webview',
  initialize: function (objects, options, alreadyGrouped) {
            this.callSuper('initialize',objects , options, alreadyGrouped);
        },
  toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            interaction: this.interaction,
            webview: this.webview,
            placeholder: this.placeholder
        });
    },
  _render: function (ctx) {
            this.callSuper('_render', ctx);
        }
});
fabric.Webview.fromObject = function(object, callback) {
  var _enlivenedObjects;
    fabric.util.enlivenObjects(object.objects, function (enlivenedObjects) {
        delete object.objects;
        _enlivenedObjects = enlivenedObjects;
    });
    return new fabric.Webview(_enlivenedObjects, object, true);
};
//RTSP Class
//Create Fabric USB Class
fabric.Rtspframe = fabric.util.createClass(fabric.Group, {
  type: 'rtspframe',
  initialize: function (objects, options, alreadyGrouped) {
            this.callSuper('initialize',objects , options, alreadyGrouped);
        },
  toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            interaction: this.interaction,
            rtsp: this.rtsp
        });
    },
  _render: function (ctx) {
            this.callSuper('_render', ctx);
        }
});
fabric.Rtspframe.fromObject = function(object, callback) {
  var _enlivenedObjects;
    fabric.util.enlivenObjects(object.objects, function (enlivenedObjects) {
        delete object.objects;
        _enlivenedObjects = enlivenedObjects;
    });
    return new fabric.Rtspframe(_enlivenedObjects, object, true);
};
//天氣系列
//溫度(Temperature - Text)
fabric.Temperature = fabric.util.createClass(fabric.Text, {
  type: 'temperature',
  initialize: function(element, options) {
    options || (options = {});
    this.callSuper('initialize', element, options);
  },
  toObject: function () {
      return fabric.util.object.extend(this.callSuper('toObject'), {
          interaction: this.interaction,
          location: this.location
      });
  },
  _render : function(ctx) {
        this.callSuper('_render', ctx);
    }
});
fabric.Temperature.fromObject = function(object) {
    return new fabric.Temperature(object.text, object);
};
//城市(Location - Text)
fabric.Location = fabric.util.createClass(fabric.Text, {
  type: 'location',
  initialize: function(element, options) {
    options || (options = {});
    this.callSuper('initialize', element, options);
  },
  toObject: function () {
      return fabric.util.object.extend(this.callSuper('toObject'), {
          interaction: this.interaction,
          location: this.location
      });
  },
  _render : function(ctx) {
        this.callSuper('_render', ctx);
    }
});
fabric.Location.fromObject = function(object) {
    return new fabric.Location(object.text, object);
};
//天氣圖片(Image)
//Video Class
fabric.Weatherimg = fabric.util.createClass(fabric.Image, {
    type: 'weatherimg',
    initialize: function(element, options) {
      options || (options = {});
      this.callSuper('initialize', element, options);
    },
    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            interaction: this.interaction,
            location: this.location
        });
    },
    _render: function (ctx) {
        this.callSuper('_render', ctx);
    }
});
fabric.Weatherimg.async = true;
fabric.Weatherimg.fromURL = function(url, callback, imgOptions) {
    fabric.util.loadImage(url, function(img) {
      callback(new fabric.Weatherimg(img, imgOptions));
    }, null, imgOptions && imgOptions.crossOrigin);
};
fabric.Weatherimg.fromObject = function (object, callback) {
    fabric.util.loadImage(object.src, function (img) {
        fabric.Image.prototype._initFilters.call(object, object, function (filters) {
            object.filters = filters || [];
            var instance = new fabric.Weatherimg(img, object);
            callback && callback(instance);
        });
    }, null, object.crossOrigin);
  };