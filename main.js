"use strict";

const BLOCK_SIZE = 20;

const Pixamalate = {
  canvas: null,

  context: null,

  originalImage: null,

  init() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.context = this.canvas.getContext('2d');
    this.originalImage = document.getElementsByTagName('img')[0];

    this.drawOriginalImage();
    let imageArray = this.divideImage();
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
          'x': i, 
          'y': j, 
          'width': Math.ceil(this.canvas.width / BLOCK_SIZE), 
          'height': Math.ceil(this.canvas.height / BLOCK_SIZE)
        });
      };
    };

    return imageArray;
  }
};

window.addEventListener('load', () => { Pixamalate.init() });
