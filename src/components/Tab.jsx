var React = require('react');
var Page = require('./pageSort.jsx');
var DropTarget = require('react-dnd').DropTarget;
var ItemTypes = require('./ItemTypes.js');


function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

var sortTarget = {
  drop: function() {
    return ;
  }
};

var Tab = React.createClass({
  render: function() {
    var pages = this.props.cards;
    var length = this.props.cards.length;
    var currentIndex = this.props.currentIndex;
    var onPageSelect = this.props.onPageSelect;
    var onItemAdd = this.props.onItemAdd;
    var remove = this.props.remove;
    var connectDropTarget = this.props.connectDropTarget;
    return connectDropTarget(
      <div className="tab-list">
        {this.props.cards.slice(0, -2).map(function(v, i) {
          var page = i + 1;
          console.log(i);
          return (
            <Page
              key={i}
              id={page}
              page={page}
              isActive={page === currentIndex}
              onClick={function() {
                return onPageSelect(page);
              }}
            />
          );
        })}
        <button
          onClick={function() {
            onPageSelect(length - 1);
            return onItemAdd();
        }} className="add">+</button>
        <Page
          page={length - 1}
          isActive={length - 1 === currentIndex}
          onClick={function() {
            return onPageSelect(length - 1);
          }}
        />
        <Page
          page={length}
          isActive={length === currentIndex}
          onClick={function() {
            return onPageSelect(length);
          }}
        />
      </div>
    );
  }
});

module.exports = Tab;
module.exports = DropTarget(ItemTypes.CARD, sortTarget, collect)(Tab);
