var React = require('react');
var ReactDOM = require('react-dom');

var PageNavi = React.createClass({
  render: function() {
    var pageList = '';
    var pageListArry = [];
    var prevPage = '';
    var nextPage = '';
    var firstPage = '';
    var lastPage = '';
    var thisProps = this.props;

    for (var i = 0; i < thisProps.pageCount; i++) {
      pageListArry.push(i);
    }
    pageList = pageListArry.map(function (item) {
    // 判断是否当前页
    if (item === thisProps.currentPn) {
      return (
        <li className="active"><a href="" onClick={thisProps.clickHandler}>
            {item}</a>
        </li>
      );
    }else {
        return (
            <li><a href="" onClick={thisProps.clickHandler}>
                {item}</a>
            </li>
        );
      }
    });
    // 上一页
    prevPage = (function () {
        if (thisProps.currentPn === 1) {
          return (
            <li className="disabled">
              <span>
                <span aria-hidden="true">上一页</span>
              </span>
            </li>
          );
        }
        else {
          return (
            <li className="prev">
              <a href="#" aria-label="Previous" onClick={thisProps.prevHandler}>
                <span aria-hidden="true">上一页</span>
              </a>
            </li>
          );
        }
    })();

    // 下一页
    nextPage = (function () {
        if (thisProps.currentPn === 4) {
          return (
            <li className="disabled">
              <span>
                <span aria-hidden="true">下一页</span>
              </span>
            </li>
          );
        }else {
          return (
            <li className="next">
              <a href="#" aria-label="Next" onClick={thisProps.nextHandler}>
                <span aria-hidden="true">下一页</span>
              </a>
            </li>
          );
        }
    })();
    // 首页
    firstPage = (function () {
        if (thisProps.currentPn === 1) {
            return (
                <li className="active"><a href="" onClick={thisProps.firstHandler}>
                    1</a>
                </li>
            );
        }
        else {
            return (
                <li><a href="" onClick={thisProps.firstHandler}>
                    1</a>
                </li>
            );
        }
    })();

    // 末页
    lastPage = (function () {
        if (thisProps.currentPn === thisProps.pageCount) {
            return (
                <li className="active"><a href="" onClick={thisProps.lastHandler}>
                    {thisProps.pageCount}</a>
                </li>
            );
        }
        else {
            return (
                <li><a href="" onClick={thisProps.lastHandler}>
                    {thisProps.pageCount}</a>
                </li>
            );
        }
    })();
    return (
      <ul className="pagination">
        {prevPage}
        {firstPage}
        {pageList}
        {lastPage}
        {nextPage}
      </ul>
    );
  }

});

module.exports = PageNavi;
