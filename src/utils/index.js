class Utils {
  registeObjectEvent (me, obj) {
    console.log('registeObjectEvent');
    obj.on('mousedown', function (options) {
      me.$emit('object:mousedown', obj, options);
    });
    obj.on('mouseup', function (options) {
      me.$emit('object:mouseup', obj, options);
    });
    obj.on('mousemove', function (options) {
      me.$emit('object:mousemove', obj, options);
    });
    obj.on('mouseover', function (options) {
      me.$emit('object:mouseover', obj, options);
    });
    obj.on('mouseout', function (options) {
      me.$emit('object:mouseout', obj, options);
    });
    obj.on('mousedblclick', function (options) {
      me.$emit('object:mousedblclick', obj, options);
    });
    obj.on('mousewheel', function (options) {
      me.$emit('object:mousewheel', obj, options);
    });
  }
}
const utils = new Utils();
export default utils;
