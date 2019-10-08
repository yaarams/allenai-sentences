import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/Search/Search';
import Sentence from './components/Sentence/Sentence';
import {getSentences, annotateSentence} from './services/remoteServices';

function displaySentences(sentences)  {
  return sentences.map(({id, words}) => 
    <Sentence id={id} words={words} annotate={annotateSentence} />
  );
}

function App() {
  const [sentences, setSentences] = useState([]);
  const handleSearch = async word => {
    const sentences = await getSentences(word);
    setSentences(sentences.list);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Search for Sentences below
        </p>
        <SearchBar search={handleSearch}/>
        {sentences ? displaySentences(sentences) : <span>None</span>}
      </header>
      
    </div>
  );
}

export default App;
