var React = require('react');
var DragSource = require('react-dnd').DragSource;
var ItemTypes = require('./ItemTypes.js');


var cardSource = {
  beginDrag: function(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index
    };
  },

  endDrag: function(props, monitor) {
    var droppedId = monitor.getItem().id;
    var originalIndex = monitor.getItem().originalIndex;
    var didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


var Page = React.createClass({

  render: function() {
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;
    var style = {
      cursor: 'pointer',
      backgroundColor: '#EFEFEF',
      color: '#DBDBDB'
    }
    if (this.props.isActive) {
      style = {
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        backgroundColor: '#181818',
        color: '#fff'
      }
    }
    return connectDragSource(
      <span onClick={this.props.onClick} style={style}>
        {this.props.page}
      </span>
    );
  }
});


module.exports = Page;
module.exports = DragSource(ItemTypes.CARD, cardSource, collectSource)(Page);
