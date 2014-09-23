/**
 * Gives a data URI for an image at a certain size dimension.
 *
 * @param {Image} image
 * @param {number} width
 * @param {number} height
 */
function imageToDataUri(image, width, height) {
    var canvas = document.createElement('canvas');
    var ctx    = canvas.getContext('2d');

    canvas.width  = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, width, height);

    return canvas.toDataURL('image/jpeg', 0.8);
}

/**
 * Resizes an image with the given maximum width and height
 *
 * @param {string} image
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @param {function} callback
 */
module.exports = function (image, maxWidth, maxHeight, callback) {
    var img   = new Image;
    var ratio = maxWidth / maxHeight;

    img.onload = function () {
        var targetWidth, targetHeight;
        if (img.width > img.height * ratio) {
            targetWidth = maxWidth;
            targetHeight = maxWidth / ratio;
        } else {
            targetHeight = maxHeight;
            targetWidth = maxHeight * ratio;
        }

        callback(imageToDataUri(img, targetWidth, targetHeight));
    };

    img.src = image;
}