var React = require('react');
var ReactDOM = require('react-dom');
var PageNavi = require('./PageNavi.jsx');

var ContentWrap = React.createClass({
  render: function() {
    return (
      <section className = "content clear-fix" >
        <UserInfo />
        <MainContent />
      </section>
    );
  }
});

var UserInfo = React.createClass({
  render: function() {
    return (
      <div className = "aside-user-info">
        <div className = "info">
          <h2>USER</h2>
          <img src = "../public/user.png"></img>
          <span>田里</span>
          <p>锋锐之本早期项目负责人</p>
        </div>
        <div className = "authority">
          <span>帐号权限:Editor</span>
          <span></span>
        </div>
        <em>编辑资料</em>
      </div>
    );
  }
});

var MainContent = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  loadFromServer: function() {
    $.get(
      'http://exp.freesvc.com/v1/articles.json',
      function (data) {
        this.setState({data: data.response.lessons.list});
        console.log(this.state.data);
      }.bind(this)
    );
  },
  componentDidMount: function() {
    this.loadFromServer();
  },
  changePn: function (e) {
    e.preventDefault();
    ExampleActions.setPageNumber({
        pageNumber: e.target.innerHTML
    });
  },
  prevPn: function (e) {
    e.preventDefault();
    ExampleActions.setPageNumber({
        pageNumber: currentPn - 1
    });
  },
  nextPn: function (e, currentPn) {
    e.preventDefault();
    ExampleActions.setPageNumber({
        pageNumber: currentPn + 1
    });
  },
  firstPn: function (e) {
    e.preventDefault();
    ExampleActions.setPageNumber({
        pageNumber: 1
    });
  },
  lastPn: function (e, currentPn) {
    e.preventDefault();
    ExampleActions.setPageNumber({
        pageNumber: pageCount
    });
  },
  render: function() {
    var listNode = this.state.data.map(function(data, index) {
      return (
        <Gallery
          key={index}
          title={data.meta.title}
          author={data.meta.author.name}
          time={data.meta.created_at}
          cardsNum={data.stacks[1].cards.length + 4}
        />
      );
    });
    return (
      <div className = "main-content">
        <div className = "total-num">
          <h2>LIST</h2>
          <p>文章总数<span>{this.state.data.length}</span></p>
        </div>
        <section className = "cd-gallery clear-fix">
          <AddContent />
          <ul>
            {listNode}
          </ul>
          <PageNavi
          /*pageCount={pageCount}
            pageSize={pageSize}
            dataSize={dataSize} */
            clickHandler={this.changePn}
            prevHandler={this.prevPn}
            nextHandler={this.nextPn}
            firstHandler={this.firstPn}
            lastHandler={this.lastPn}
          />
        </section>
      </div>
    );
  }
});

var Gallery = React.createClass({
    render: function() {
      var time = this.props.time;
      var date = new Date(time * 1000);
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      console.log(date);
      return (
        <ul>
        <li className = "gallery-item">
          <span className = "page-num">{this.props.cardsNum}p</span>
          <h2>{this.props.title}</h2>
          <div>{this.props.author}</div>
          <em>{year}-{month}-{day}</em>
          <span className = "view-num">2174</span>
          <span className = "editor-arti"><a href = "#">编辑文章</a></span>
        </li>
      </ul>
      );
    }
});


var AddContent = React.createClass({
  render: function() {
    return (
      <div className = "add-content">
        <div className = "add-trigger"><a href = "#"></a></div>
        <div className = "total-article"><span>未发布文章</span><b>38篇</b></div>
      </div>
    );
  }
});

module.exports = ReactDOM.render(
  <ContentWrap />,
  document.getElementById('content')
);
