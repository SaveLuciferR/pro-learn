import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `http://pro-learn`,

});


const App = () => {

  function testGet() {
    axiosClient.post('/blog/hello-var')
      .then(({data}) => {
        console.log(data);
        // console.log(data.allBlogs);

        // data.allBlogs.map(element => {
        //   if (element.popular == 1) console.log(element);
        // })

      })
      .catch(err => {
        console.log(err);
      })
  }

  testGet();

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
