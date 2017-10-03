import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

var run = Ember.run;

moduleForComponent('auto-image', 'AutoImageComponent', {
  unit: true
});

test('it calculates the correct aspect ratio for a given width/height', function(assert) {
  const getStyle = ()=> {
    var element = this.$().find('.auto-image')[0];
    return element.style;
  };

  const component = this.subject({
    width: 100,
    height: 50
  });

  assert.equal(getStyle().height, '50px');
  assert.equal(getStyle().width, '100px');

  run(function() {
    component.setProperties({
      width: 100,
      height: 200
    });
  });

  assert.equal(getStyle().height, '200px');
  assert.equal(getStyle().width, '100px');
});
