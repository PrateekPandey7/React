import React, {Component} from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value });
  }

  onDismiss(id) {
    function isNotId(item) {
      return item.objectID !== id;
    }

    const updatedList = this.state.list.filter(isNotId);
    this.setState({list: updatedList});
  }

  render() {
    const {searchTerm, list} = this.state;
    return (
      <div className = "page">
        <div className = "interaction">
          <Search 
            value = {searchTerm}
            onChange = {this.onSearchChange}
          >
            Search
            </Search>
        </div>
        <Table 
          list = {list}
          pattern = {searchTerm}
          onDismiss = {this.onDismiss}
        />
      </div>
    );
  }
}

function Search({value, onChange, children}) {
  return (
    <form>
      {children}
      <input
        type = "text"
        value = {value}
        onChange = {onChange}
      />
    </form>
  );
}

function Table({list, pattern, onDismiss}) {
  return (
    <div className = "table">
    {
      list.filter(isSearched(pattern)).map(item =>
        <div key = {item.objectID} className = "table-row">
          <span>
            <a href = {item.url} > {item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
            <Button
              onClick = {() => onDismiss(item.objectID)}
              className = "button-inline"
            >
                Dismiss 
             </Button>
            </span>
         </div>
     )}
    </div>
  );
}

class Button extends Component {
  render() {
    const {
      onClick,
      className = '',
      children,
    } = this.props;
    return (
      <button
        onClick = {onClick}
        className = {className}
        type = "button"
        >
          {children}
        </button>
    );
  }
}

export default App;
