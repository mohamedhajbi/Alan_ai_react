import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './style.js';

const alaKey ="b0c110d56b7185e3d8cae494654c13962e956eca572e1d8b807a3e2338fdd0dc/stage";
export default function App() {
    const [newsArticles, setNewsArticles] = useState([]);
    const classes = useStyles();
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
        <div className={classes.logoContainer}>
            <img src='./tt.png'  className={classes.alanLogo} alt='alan-logo'/>
        </div>
        <NewsCards articles={newsArticles} />
    </div>
  )
}