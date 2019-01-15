import Component from '@ember/component';
import { computed } from "@ember/object";
import layout from '../templates/components/auto-image';
import InViewportMixin from 'ember-in-viewport';
import fetchImage from 'ember-image-utils/utils/fetch-image';
import aspectRatio from 'ember-image-utils/utils/aspect-ratio';
import { htmlSafe } from '@ember/template';

export default Component.extend(InViewportMixin, {
  layout,
  width: null,
  height: null,
  title: "",
  src: "",
  size: undefined,

  imageStyle: computed('size', function() {
    const size = this.get("size");
    return size ? htmlSafe(`width: ${size.width}px; height: ${size.height}px`) : htmlSafe("");
  }),

  containerStyle: computed('width', 'height', function() {
    const width = parseInt(this.get('width'));
    const height = parseInt(this.get('height'));

    return htmlSafe(`width: ${width}px;height: ${height}px`);
  }),

  didEnterViewport() {
    this._super(...arguments);
    let width = parseInt(this.get('width'));
    let height = parseInt(this.get('height'));
    const src = this.get("src");

    fetchImage(src).then(image => {
      return aspectRatio(image, width, height);
    }).then(size => {
      this.set('src', src);
      this.set('size', size);
    })
  },
});
