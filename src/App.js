import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards';

const alaKey ="b0c110d56b7185e3d8cae494654c13962e956eca572e1d8b807a3e2338fdd0dc/stage";
export default function App() {
    const [newsArticles, setNewsArticles] = useState([]);
    useEffect(()=> {
        alanBtn({
            key: alaKey,
            onCommand : ({ command, articles }) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                }
            }
        })
    },[])
  return (
    
    <div>
        <h1>hello Alan ai</h1>
        <NewsCards articles={newsArticles} />
    </div>
  )
}