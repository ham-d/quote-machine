/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import './App.css';
import Quotes from './components/quotes';

const {
  REACT_APP_UNSPLASH_ACCESS_KEY: accessKey,
} = process.env;

const App = (): JSX.Element => {
  const [imageLoaded, toggleImageLoaded] = useState(false)
  const [imageList, setImageList] = useState<any[]>([])
  const [imageUrl, setImageUrl] = useState('')

  const getBgImage = async () => {
    const imageApi = `https://api.unsplash.com/photos?client_id=${accessKey}`;
    const random10 = Math.floor(Math.random() * 10)
    let data = imageList

    if (!imageList.length) {
      try {
        const response = await fetch(imageApi);
        data = await response.json();
        setImageList(data);
      } catch (e) {
        const errMsg = `Error fetching background images: ${e}`
        console.log(errMsg);
      }
    }
    const image = data[random10]?.urls?.full;
    setImageUrl(image)
    toggleImageLoaded(true)
  }

  useEffect(() => {
    getBgImage();
  }, [])

  return (
    <div
      className="App"
      style={{ background: `url(${imageUrl})`}}
    >
      {
        imageLoaded
        &&
        <Quotes
          getBgImage={getBgImage}
        />
      }
    </div>
  );
}

export default App;
