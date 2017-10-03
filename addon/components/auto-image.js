import Ember from 'ember';
import layout from '../templates/components/auto-image';
import InViewportMixin from 'ember-in-viewport';

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
    let designer_width = parseInt(this.get('width'));
    let designer_height = parseInt(this.get('height'));
    const src = this.get("src");
    const $img = this.$("img");

    this.fetchScaleImage(src).then(image => {
      const  original_width = image.width;
      const  original_height = image.height;

      const original_ratio = original_width / original_height
      const designer_ratio = designer_width / designer_height
      if (original_ratio > designer_ratio) {
        designer_height = designer_width / original_ratio;
      } else {
        designer_width = designer_height * original_ratio;
      }

      const imageStyle = `width: ${designer_width}px; height: ${designer_height}px`;
      $img.attr('src', src);
      $img.attr('style', imageStyle);
    })
  },

  fetchScaleImage(src) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      }
      image.onerror = reject;
      image.src = src;
    })
  }

});
