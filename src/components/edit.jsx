'use strict'

const React = require('react')
const ReactDOM = require('react-dom')

const Component = React.Component

class EditPage extends Component {
  constructor() {
    super()
    this.state = {
      cards: [
        {title: '', content: ''},
        {title: '', content: ''},
        {title: '', content: ''},
        {title: '', content: ''},
      ],
      activeIndex: 1
    }
  }

  handleItemAdd() {
    const cards = this.state.cards.slice()

    cards.splice(-2, 0, {title: '', content: ''})

    this.setState({ cards })
  }

  handlePageSelect(page) {
    this.setState({activeIndex: page})
  }

  handleEdit(attrs) {
    Object.assign(this.state.cards[this.state.activeIndex - 1], attrs)
    this.forceUpdate()
  }

  render() {
    const card = this.state.cards[this.state.activeIndex - 1]

    return (
      <div style={{width: '980px', margin: '0 auto'}}>
        <Header />
        <Nav
          {...this.state}
          onItemAdd={() => this.handleItemAdd()}
          onPageSelect={(page) => this.handlePageSelect(page)}
        />
      <Editor {...card} onChange={(attrs) => this.handleEdit(attrs)} />
      </div>
    )
  }
}

class Header extends Component {
  handleSubmit() {

  }

  render() {
    return (
      <div style={{marginBottom: '20px'}}>
        <h1>Edit</h1>
        <button onClick={() => {this.handleSubmit()}}>Submit</button>
      </div>
    )
  }
}

class Nav extends Component {
  render() {
    const pages = this.props.cards
    const length = this.props.cards.length
    const activeIndex = this.props.activeIndex
    const onPageSelect = this.props.onPageSelect

    return (
      <div style={{marginBottom: '20px'}}>
        {this.props.cards.slice(0, -2).map((v, i) => {
          const page = i + 1
          return (
            <Page
              key={i}
              page={page}
              isActive={page === activeIndex}
              onClick={() => onPageSelect(page)}
            />
          )
        })}
        <button onClick={() => this.props.onItemAdd()}>+</button>
        <Page
          page={length - 1}
          isActive={length - 1 === activeIndex}
          onClick={() => onPageSelect(length - 1)}
        />
        <Page
          page={length}
          isActive={length === activeIndex}
          onClick={() => onPageSelect(length)}
        />
      </div>
    )
  }
}

class Page extends Component {
  render() {
    const style = {
      display: 'inline-block',
      padding: '4px',
      cursor: 'pointer'
    }

    if (this.props.isActive) style.backgroundColor = 'lightblue'

    return (
      <span style={style} onClick={this.props.onClick}>
        {this.props.page}
      </span>
    )
  }
}

class Editor extends Component {
  render() {
    const onChange = this.props.onChange

    return (
      <div>
        <input
          ref="title"
          placeholder="title"
          value={this.props.title}
          onChange={() => onChange({title: this.refs.title.value})}
        />
        <br />
        <textarea
          ref="content"
          placeholder="content"
          value={this.props.content}
          onChange={v => onChange({content: this.refs.content.value})}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <EditPage />,
  document.getElementById('preview')
);
