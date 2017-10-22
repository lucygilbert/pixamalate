"use strict";

const BLOCK_SIZE = 60;

function handleImageChange() {
  const fileUpload = document.getElementById('custom-image');
  const image = document.getElementById('image');
  fileUpload.onchange = function () {
    if (fileUpload.files && fileUpload.files[0]) {
      const fileReader = new FileReader();
      fileReader.onloadend = function () {
        image.src = fileReader.result;
      }
      fileReader.readAsDataURL(fileUpload.files[0]);
    }
  };
  image.onload = function () {
    Pixamalate.init();
  }
}

const Pixamalate = {
  canvas: null,

  context: null,

  originalImage: null,

  init() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.context = this.canvas.getContext('2d');
    this.originalImage = document.getElementById('image');

    this.drawOriginalImage();
    let imageArray = this.divideImage();
    let colorImageArray = this.getAverageColor(imageArray);
    this.drawBlocks(colorImageArray);
  },

  drawOriginalImage() {
    this.canvas.width = this.originalImage.width;
    this.canvas.height = this.originalImage.height;

    this.context.imageSmoothingEnabled = true;
    this.context.drawImage(this.originalImage, 0, 0, this.originalImage.width, this.originalImage.height);
  },

  divideImage() {
    let imageArray = [];

    for (var i = 0; i <= this.canvas.width; i += Math.ceil(this.canvas.width / BLOCK_SIZE)) {
      for (var j = 0; j <= this.canvas.height; j += Math.ceil(this.canvas.height / BLOCK_SIZE)) {
        imageArray.push({
          x: i, 
          y: j, 
          width: Math.ceil(this.canvas.width / BLOCK_SIZE), 
          height: Math.ceil(this.canvas.height / BLOCK_SIZE)
        });
      };
    };

    return imageArray;
  },

  getAverageColor(imageArray) {
    imageArray.forEach(function(item) {
      let colorData = this.context.getImageData(item.x, item.y, item.width, item.height).data;
      let colorSum = {r: 0, g: 0, b: 0};
      let totalPixels = item.width * item.height;

      for (var i = 0; i < colorData.length; i += 4) {
        colorSum.r += colorData[i];
        colorSum.g += colorData[i + 1];
        colorSum.b += colorData[i + 2];
      };

      item.colorAverage = {
        r: Math.round(colorSum.r / totalPixels),
        g: Math.round(colorSum.g / totalPixels),
        b: Math.round(colorSum.b / totalPixels)
      };
    }, this);

    return imageArray;
  },

  drawBlocks(colorImageArray) {
    colorImageArray.forEach(function(item) {
      this.context.fillStyle = 'rgba('+item.colorAverage.r+','+item.colorAverage.g+','+item.colorAverage.b+',255)';
      this.context.fillRect(item.x, item.y, item.width, item.height);
    }, this);
  }
};

window.addEventListener('load', () => {
  Pixamalate.init();
  handleImageChange();
});
