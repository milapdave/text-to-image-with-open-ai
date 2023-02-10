import React, { useState } from "react"
import { Configuration, OpenAIApi } from "openai";
import './App.css';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_Key,
});

const openai = new OpenAIApi(configuration);


function App() {
  const [text, setText] = useState("");
  const [graphic, setGraphic] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    const res = await openai.createImage({
      prompt: text,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setGraphic(res.data.data[0].url);
    setText('')
  };

  return (
    <div className="wapper">
      <div className="inner_wapper">
      <form>
        <h1>Text to Image with<br/> 
        AI Image Generator</h1>

        <p>Convert words to images in seconds with free AI image generator. <br/> 
        Input the text prompts and transfer your imagination into arts now.</p>

        <div className="flex">
          <input  type="text"  value={text}  onChange={event => setText(event.target.value)}/>
          <button type="button" onClick={generateImage}>Generate</button>
        </div>
      </form>
      <div className="result">
      {loading ? (
        <>
          <h2>Generating..Please Wait..</h2>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
        {graphic.length > 0 ? (
          <div className="img_box"><img className="result-image" src={graphic} alt="result" /></div>
        ) : (
          <></>
        )}
        </>
      )}
      </div>
    </div>
  </div>
  );
}

export default App;
