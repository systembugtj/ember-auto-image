import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

/**
 * @class AutoSCaleModifier
 * A auto scale modifer on image to lazy load a image when element is visible in viewport.
 *
 * @property string width
 * @property string height
 */
export default class AutoScaleModifier extends Modifier {
  @service autoScaleImage;

  get width() {
    return this.args.named.width || 0;
  }
  get height() {
    return this.args.named.height || 0;
  }

  get imageSrc() {
    return this.args.named.imageSrc || '';
  }

  get fallbackSrc() {
    return this.args.named.fallbackSrc || '';
  }

  didReceiveArguments() {
    this.loadImage.perform();
  }

  didUpdateArguments() {
    this.loadImage.perform();
  }

  @task *loadImage() {
    this.loaded = false;
    let width = parseInt(this.width);
    let height = parseInt(this.height);
    const src = this.imageSrc;
    const fallbackSrc = this.fallbackSrc;

    const result = yield this.autoScaleImage
      .get('scaleImage')
      .perform(src, width, height, fallbackSrc);

    this.element.src = result.imageSrc;
    this.element.style.width = `${result.size.width}px`;
    this.element.style.height = `${result.size.height}px`;
  }
}
