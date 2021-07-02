import React from 'react';
import './App.css';
const apiUrl = 'https://dog.ceo/api/breeds/image/random';

class App extends React.Component {
  constructor() {
    super();
    this.fetchApi = this.fetchApi.bind(this);
    this.nextDoguinho = this.nextDoguinho.bind(this);
    this.state = {
      loading: true,
      imagem: '',
    };
  }

  componentDidMount() {
    this.fetchApi(apiUrl);
  }

  // componentDidUpdate() {
  //   this.fetchApi(apiUrl);
  // }

  fetchApi(api) {
    fetch(api).then((r) => r.json()).then((r) => this.setState({ loading: false, imagem: r.message }));
  }

  nextDoguinho() {
    this.setState({ loading: true },
      () => this.fetchApi(apiUrl));
  }

  render() {
    const { loading, imagem } = this.state;
    if (loading === true) return <p>Loading...</p>
    return (
      <div>
        <h1>Doguinho!</h1>
        <img src={ imagem } alt='doguinho' />
        <button type='button' onClick={ this.nextDoguinho }>Próximo doguinho!</button>
      </div>
    );
  }
}

export default App;
