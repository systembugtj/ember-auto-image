import Ember from 'ember';
import layout from '../templates/components/auto-image';
import InViewportMixin from 'ember-in-viewport';
import fetchImage from 'ember-image-utils/utils/fetch-image';
import aspectRatio from 'ember-image-utils/utils/aspect-ratio';


export default Ember.Component.extend(InViewportMixin, {
  layout,
  width: null,
  height: null,

  containerStyle: Ember.computed('width', 'height', function() {
    const width = parseInt(this.get('width'));
    const height = parseInt(this.get('height'));

    return Ember.String.htmlSafe(`width: ${width}px;height: ${height}px`);
  }),

  didEnterViewport() {
    this._super(...arguments);
    let width = parseInt(this.get('width'));
    let height = parseInt(this.get('height'));
    const src = this.get("src");
    const $img = this.$("img");

    fetchImage(src).then(image => {
      return aspectRatio(image, width, height);
    }).then(size => {
      const imageStyle = `width: ${size.width}px; height: ${size.height}px`;
      $img.attr('src', src);
      $img.attr('style', imageStyle);
    })
  },
});
