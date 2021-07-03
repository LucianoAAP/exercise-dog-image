import React from 'react';
import './App.css';
const apiUrl = 'https://dog.ceo/api/breeds/image/random';

class App extends React.Component {
  constructor() {
    super();
    this.fetchApi = this.fetchApi.bind(this);
    this.nextDoguinho = this.nextDoguinho.bind(this);
    this.addLocalStorage = this.addLocalStorage.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.storeDoguinho = this.storeDoguinho.bind(this);
    this.state = {
      loading: true,
      imagem: '',
      name: '',
      array: [],
    };
  }

  componentDidMount() {
    if (localStorage.length !==0) {
      const previousDog = JSON.parse(localStorage.getItem('dog'));
      this.setState({ loading: false, imagem: previousDog[0], array: previousDog });
    } else {
      this.fetchApi(apiUrl);
    }
  }

  shouldComponentUpdate(_nextProps, nextState) {
    if (nextState.imagem.includes('terrier')) {
      return false;
    }
    return true;
  }

  componentDidUpdate(_prevProps, prevState) {
    const { loading, imagem } = this.state;
    const race = imagem.split('/')[4];
    if (loading === false && prevState.loading !== this.state.loading) alert(race);
  }

  addLocalStorage() {
    localStorage.setItem('dog', JSON.stringify(this.state.array));
  }

  fetchApi(api) {
    fetch(api).then((r) => r.json()).then((r) => this.setState({
      loading: false,
      imagem: r.message
    }));
  }

  nextDoguinho() {
    this.setState({ loading: true },
      () => this.fetchApi(apiUrl));
  }

  handleNameChange({ target }) {
    this.setState({ name: target.value });
  }

  storeDoguinho() {
    const { imagem, name } = this.state;
    this.setState({ array: [imagem, name] },
      () => this.addLocalStorage());
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  render() {
    const { loading, imagem, name } = this.state;
    if (loading) return <p>Loading...</p>
    return (
      <div>
        <h1>Doguinho!</h1>
        <img src={ imagem } alt='doguinho' />
        <button type='button' onClick={ this.nextDoguinho }>Próximo doguinho!</button>
        <label>
          Nome do doguinho:
          <input type='text' value={ name } onChange={ this.handleNameChange } />
          <button type='button' onClick={ this.storeDoguinho }>Guardar doguinho</button>
          <button type='button' onClick={ this.clearLocalStorage }>Limpar armazenamento</button>
        </label>
      </div>
    );
  }
}

export default App;
