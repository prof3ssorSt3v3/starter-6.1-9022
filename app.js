const APP = {
  defaultImg: 'https://via.placeholder.com/300x100/639/fff',
  fullImg: 'nasa-Q1p7bh3SHj8-unsplash.jpeg',
  nextStep: null,
  loaded: 0,
  imgCount: 0,
  init: () => {
    //start building the list
    console.log('APP.init');
    APP.buildList(APP.addImages);
  },
  buildList: (cb) => {
    //add the list items with text and default image
    //when done, add the images
    console.log('start building list');
    let list = document.querySelector('.items');
    let df = document.createDocumentFragment();
    for (let i = 0; i < 50; i++) {
      let li = document.createElement('li');
      let img = document.createElement('img');
      li.className = 'item';
      img.src = APP.defaultImg;
      img.alt = 'placeholder image';
      li.append(img);
      li.append(document.createTextNode(`Sample Text for item ${i}`));
      df.append(li);
    }
    list.append(df);
    // console.log(typeof cb);
    if (typeof cb === 'function') {
      APP.message('Pretend this first loading is taking 3 seconds');
      setTimeout(cb, 3000, APP.message);
    }
  },
  addImages: (cb) => {
    //add an image source for each image
    //when done, tell the user
    console.log('start updating images');
    if (typeof cb === 'function') cb('changing image sources');
    if (typeof cb === 'function') APP.nextStep = cb;

    let images = document.querySelectorAll('.item img');
    APP.imgCount = images.length;
    images.forEach((img, idx) => {
      img.alt = 'nasa image';
      img.src = `${APP.fullImg}?query=${idx}`;
      img.addEventListener('load', APP.check, { once: true });
    });
  },
  check: (ev) => {
    APP.loaded ? APP.loaded++ : (APP.loaded = 1);
    if (APP.loaded === APP.imgCount && typeof APP.nextStep === 'function') {
      APP.nextStep('Done loading new images');
    } else {
      //display every 7th count
      if (APP.loaded % 7 === 0) {
        console.log(APP.loaded);
      }
    }
  },
  message: (msg) => {
    //tell the user that you are done.
    console.warn(msg);
  },
};

document.addEventListener('DOMContentLoaded', APP.init);
