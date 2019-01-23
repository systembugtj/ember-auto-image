import Component from '@ember/component';
import { computed } from "@ember/object";
import layout from '../templates/components/auto-image';
import InViewportMixin from 'ember-in-viewport';
import fetchImage from 'ember-image-utils/utils/fetch-image';
import aspectRatio from 'ember-image-utils/utils/aspect-ratio';
import { htmlSafe } from '@ember/template';
import { observer } from '@ember/object';

export default Component.extend(InViewportMixin, {
  layout,
  width: null,
  height: null,
  title: "",
  src: "",
  size: undefined,
  loaded: false,

  imageStyle: computed('size', function() {
    const size = this.get("size");
    return size ? htmlSafe(`width: ${size.width}px; height: ${size.height}px`) : htmlSafe("");
  }),

  containerStyle: computed('width', 'height', function() {
    const width = parseInt(this.get('width'));
    const height = parseInt(this.get('height'));

    return htmlSafe(`width: ${width}px;height: ${height}px`);
  }),

  srcChanged: observer("src", () => {
    this.set("loaded", false);
    if (this.get("viewportEntered")) {
      this.loadImage();
    }
  }),

  didExitViewport() {
  },

  didEnterViewport() {
    // If not loaded, fetch image and show it.
    if (!this.get("loaded")) {
      this.loadImage();
    }
  },

  loadImage() {
    let width = parseInt(this.get('width'));
    let height = parseInt(this.get('height'));
    const src = this.get("src");

    fetchImage(src).then(image => {
      return aspectRatio(image, width, height);
    }).then(size => {
      this.set('imageSrc', src);
      this.set('size', size);
      this.set('loaded', true);
    }).catch(()=> {
      this.set("imageSrc", this.get("fallbackSrc"));
      this.set("size", { width, height });
      this.set('loaded', true);
    });
  }
});
