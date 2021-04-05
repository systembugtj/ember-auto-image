import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AutoImage extends Component {
  @service inViewport;

  title = '';
  @tracked isVisible = false;

  @action
  setupInViewport(element) {
    const viewportTolerance = { bottom: 200 };
    const { onEnter, onExit } = this.inViewport.watchElement(element, {
      viewportTolerance,
    });
    onEnter(() => this.didEnterViewport());
    onExit(() => this.didExitViewport());
  }

  didExitViewport() {
    this.isVisible = false;
  }

  didEnterViewport() {
    this.isVisible = true;
  }
}
