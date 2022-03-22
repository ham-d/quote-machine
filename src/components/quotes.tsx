/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../styles/quotes.css'

type QuoteResults = {
  content: string;
  author: string;
}
type Props = {
  toggleImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  getBgImage: () => void
}
const refreshTime = 15

const Quotes = ({getBgImage, toggleImageLoaded}: Props): JSX.Element => {
  const [counter, setCounter] = useState(refreshTime)
  const [quote, setQuote] = useState<QuoteResults | any>({});
  const [fade, setFade] = useState("fade-out")

  const getQuote = async () => {
    const quoteApi = "https://api.quotable.io/random";

    try {
      const response = await fetch(quoteApi);
      const { content, author } = await response.json();

      setQuote({
        content,
        author,
      });
      setFade("fade-in")
    } catch (e) {
      const errMsg = `Error fetching quotes: ${e}`
      console.log(errMsg);
    }
  }

  useEffect(() => {
    getQuote();
  }, [])
  useEffect(() => {
    if (counter === 1) {
      setTimeout(() => {
        setFade("fade-out")
      })
    }
    if (counter === 0) {
      toggleImageLoaded(false)
      getQuote();
      getBgImage();
      setCounter(refreshTime);
  }
  const timer: any = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

  return () => clearInterval(timer);
  }, [counter])

  return (
    <div className={`quote-container ${fade}`}>
      {
        quote?.content && quote?.author 
        &&
        <>
          <h2 className="quote">
            "{quote?.content}"
          </h2>
          <h4 className="author">
            - {quote?.author}
          </h4>
          <div>
              {counter}s
          </div>
        </>
      }
    </div>
  )
}

export default Quotes