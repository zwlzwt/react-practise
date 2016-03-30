var React = require('react');
var ReactDOM = require('react-dom');
var update = require('react/lib/update.js');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var Tab = require('./Tab.jsx');

var EditPage = React.createClass({
  getInitialState: function() {
    return (
      {cards:[
        {tag:'', title: '', content: ''},
        {title: '', content: ''},
        {title: '', content: ''},
        {title: '', content: ''}
      ], currentIndex: 1}
    );
  },
  addPage: function() {
    var cards = this.state.cards.slice();
    cards.splice(-2, 0, {title: '', content: ''});
    this.setState({cards});
  },
  handlePageSelect: function(page) {
    this.setState({currentIndex: page})
  },
  handleEdit: function(attrs) {
    Object.assign(this.state.cards[this.state.currentIndex - 1], attrs);
    this.forceUpdate();
  },
  render: function() {
    var self = this;
    var card = this.state.cards[this.state.currentIndex - 1];
    return (
      <section className="edit-page clear-fix">
        <HeaderSubmit
          {...this.state}
        />
        <Tab
          {...this.state}
          onItemAdd={function() {
            return self.addPage();
          }}
          focusCurrentIndex={function(index) {
            return self.focusCurrentIndex(index);
          }}
          onPageSelect={function(page) {
            return self.handlePageSelect(page);
          }}
          />
        <Editor
          {...this.state}
          {...card}
          onChange={function(attrs){
            return self.handleEdit(attrs);
          }}
          />
        <Show
          {...this.state}
          {...card}
          />
      </section>
    );
  }
});

var HeaderSubmit = React.createClass({
  handleSubmit: function() {
    $.get('', {articles: this.props.cards}, function(success) {
      alert('success')}.bind(this));
  },
  render: function() {
    return (
      <div className = "page-header">
        <h2>EDIT</h2>
        <input type = "submit" value = "DONE" onClick={this.handleSubmit} />
      </div>
    );
  }
});

var Editor = React.createClass({
  handleTag: function(e) {
    e.stopPropagation();
    var nodeLi = e.target;
    var i = nodeLi.innerHTML;
    this.props.onChange({tag: i});
  },
  render: function() {
    var onChange = this.props.onChange;
    var currentIndex = this.props.currentIndex;
    var self = this;
    var nodeInput;
    var nodeUl;
    if (currentIndex === 1) {
      nodeInput = <input
       className="title-input"
       ref="title"
       placeholder="输入标题"
       value={this.props.title}
       onChange={function() {
         return onChange({title: self.refs.title.value});
       }}
       />;
     style={
       color: '#fff',
       backgroundColor: '#181818'
     }
     nodeUl = <ul className="select-tab" ref="list" onClick={this.handleTag}>
         <li>营销</li>
         <li>技术</li>
         <li>设计</li>
         <li>法务</li>
         <li>品牌</li>
       </ul>;
    }
    return (
      <div className="input-area">
        <div className="header-title">
          PAGE
          <em>{currentIndex}</em>
        </div>
        {nodeInput}
        {nodeUl}
        <button className="upload-img">上传文件</button>
        <input type="text" placeholder="图片地址"  className="url-img" />
        <textarea
          className="content-input"
          ref="content"
          placeholder="输入内容"
          value={this.props.content}
          onChange={function(v) {
            return onChange({content: self.refs.content.value});
          }}
        />
      </div>
    );
  }
});

var Show = React.createClass({
  convertPage: function(text, defaultText) {
    if (!text || text.length == 0) {
      return {__html:defaultText};
    }
    var rawMarkup = '<p>' + text.replace(/\n([ \t]*\n)+/g, '</p><p>').replace(/\n/g, '<br />') + '</p>';
    return { __html: rawMarkup };
  },
  render: function() {
    var length = this.props.cards.length;
    var currentIndex = this.props.currentIndex;
    var style = {
      display: 'block',
      width: '35px',
      height: '35px',
      borderRadius: '50px',
      margin: '0 auto'
    }
    if (currentIndex === 2) {
      var node = <h3>5分后，你将了解：</h3>
    }else if (currentIndex == length - 1) {
      var summary = <h3>这5分钟，你学会了：</h3>
    }
    return (
      <div className="show">
        <div>PREVIEW</div>
        <div className="pre-phone">
          <span className="home-icon"></span>
          <div className="warpper">
            <img src='../public/title.png' style={style}/>
            <b>{this.props.tag}</b>
            {node}
            {summary}
            <h2>{this.props.title}</h2>
            <p dangerouslySetInnerHTML={this.convertPage(this.props.content)}
            />
            <div className='footer'>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// 备注上传图片方法
  // handleImageChange: function(e) {
  //   e.preventDefault();
  //
  //   var reader = new FileReader();
  //   var file = e.target.files[0];
  //
  //   reader.onload = function() {
  //     this.setState({file: file});
  //     this.setState({imagePreviewUrl: reader.result});
  //   }
  //
  //   reader.readAsDataURL(file);
  // }

EditPage = DragDropContext(HTML5Backend)(EditPage)

ReactDOM.render(
  <EditPage />,
  document.getElementById('preview')
)
