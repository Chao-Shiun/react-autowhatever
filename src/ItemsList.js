import React, { Component, PropTypes } from 'react';
import Item from './Item';
import compareObjects from './compareObjects';

export default class ItemsList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    itemProps: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func
    ]),
    renderItem: PropTypes.func.isRequired,
    renderItemData: PropTypes.object.isRequired,
    sectionIndex: PropTypes.number,
    highlightedItemIndex: PropTypes.number,
    onHighlightedItemChange: PropTypes.func.isRequired,
    getItemId: PropTypes.func.isRequired,
    theme: PropTypes.func.isRequired,
    keyPrefix: PropTypes.string.isRequired
  };

  static defaultProps = {
    sectionIndex: null
  };

  shouldComponentUpdate(nextProps) {
    return compareObjects(nextProps, this.props, ['itemProps']);
  }

  storeHighlightedItemReference = highlightedItem => {
    this.props.onHighlightedItemChange(highlightedItem === null ? null : highlightedItem.item);
  };

  render() {
    const {
      items, itemProps, renderItem, renderItemData, sectionIndex,
      highlightedItemIndex, getItemId, theme, keyPrefix
    } = this.props;
    const sectionPrefix = (sectionIndex === null ? keyPrefix : `${keyPrefix}section-${sectionIndex}-`);
    const isItemPropsFunction = (typeof itemProps === 'function');

    return (
      <ul role="listbox" {...theme(`${sectionPrefix}items-list`, 'itemsList')}>
        {
          items.map((item, itemIndex) => {
            const isHighlighted = (itemIndex === highlightedItemIndex);
            const itemKey = `${sectionPrefix}item-${itemIndex}`;
            const itemPropsObj = isItemPropsFunction ? itemProps({ sectionIndex, itemIndex }) : itemProps;
            const allItemProps = {
              id: getItemId(sectionIndex, itemIndex),
              ...theme(itemKey, 'item', isHighlighted && 'itemHighlighted'),
              ...itemPropsObj
            };

            if (isHighlighted) {
              allItemProps.ref = this.storeHighlightedItemReference;
            }

            // `key` is provided by theme()
            /* eslint-disable react/jsx-key */
            return (
              <Item
                {...allItemProps}
                sectionIndex={sectionIndex}
                itemIndex={itemIndex}
                item={item}
                renderItem={renderItem}
                renderItemData={renderItemData}
              />
            );
            /* eslint-enable react/jsx-key */
          })
        }
      </ul>
    );
  }
}
