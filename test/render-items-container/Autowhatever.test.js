import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import {
  init,
  childrenMatcher,
  containerPropsMatcher,
  getElementWithClass,
  getItemsContainerAttribute
} from '../helpers';
import AutowhateverApp, {
  renderItemsContainer
} from './AutowhateverApp';

describe('Autowhatever with renderItemsContainer', () => {
  beforeEach(() => {
    renderItemsContainer.reset();
    init(TestUtils.renderIntoDocument(<AutowhateverApp />));
  });

  it('should set items container id properly', () => {
    expect(getItemsContainerAttribute('id')).to.equal('react-autowhatever-my-id');
  });

  it('should render whatever renderItemsContainer returns', () => {
    expect(getElementWithClass('my-items-container-footer')).not.to.equal(null);
  });

  it('should call renderItemsContainer once with the right parameters', () => {
    expect(renderItemsContainer).to.have.been.calledOnce;
    expect(renderItemsContainer).to.be.calledWith({
      children: childrenMatcher,
      containerProps: containerPropsMatcher
    });
  });
});
