"use strict";

const Pixamalate = {
  canvas: null,

  context: null,

  init() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.context = this.canvas.getContext('2d');

    this.drawOriginalImage();
  },

  drawOriginalImage() {
    let originalImage = document.getElementsByTagName('img')[0];

    this.canvas.width = originalImage.width;
    this.canvas.height = originalImage.height;

    this.context.imageSmoothingEnabled = true;
    this.context.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height);
  }
};

window.addEventListener('load', () => { Pixamalate.init() });
