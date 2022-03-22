import React, { useEffect, useState } from 'react';

type QuoteResults = {
  content: string,
  author: string,
}
const refreshTime = 15
const Quotes = (): JSX.Element => {
  const [counter, setCounter] = useState(refreshTime)
  const [quote, setQuote] = useState<QuoteResults | any>({});
  const getQuote = async () => {
    const quoteUrl = "https://api.quotable.io/random";
    try {
      const response = await fetch(quoteUrl);
      const { content, author } = await response.json();

      setQuote({
        content,
        author,
      });
    } catch (e) {
      const errMsg = `Error fetching quotes: ${e}`
      console.log(errMsg);
    }
  }

  useEffect(() => {
    getQuote();
  }, [])
  useEffect(() => {
    if (counter === 0) {
      getQuote();
      setCounter(refreshTime);
  }
  const timer: any = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

  return () => clearInterval(timer);
  }, [counter])

  return (
    <div>
      {
        quote?.content &&
        <>
          <h2>
            "{quote?.content}"
          </h2>
          <h4>
            {quote?.author}
          </h4>
          <div>
              new quote in {counter} second(s)
          </div>
        </>
      }
    </div>
  )
}

export default Quotes