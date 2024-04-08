import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './style.js';

import wordsToNumbers from 'words-to-numbers';
const alaKey ="b0c110d56b7185e3d8cae494654c13962e956eca572e1d8b807a3e2338fdd0dc/stage";
export default function App() {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);;
    const classes = useStyles();
    useEffect(()=> {
        alanBtn({
            key: alaKey,
            onCommand : ({ command, articles, number }) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);// to reset active articles
                } else if(command === 'highlight'){
                    setActiveArticle((pervActiveArticle) => pervActiveArticle +1);
                } else if(command === 'open'){
                    //fuzzy : true => for => four => 4
                    const parseNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy : true }) : number;
                    const article = articles[parseNumber - 1];
                    if(parseNumber > 20){
                        alanBtn().playText('Please try again')
                    }else if (article){
                        console.log('aaaaaaaaaa number');
                        window.open(article.url, '_blank');
                    }
                }
            }
        })
    },[]) 
  return (
    
    <div>
        <div className={classes.logoContainer}>
            <img src='./tt.png'  className={classes.alanLogo} alt='alan-logo'/>
        </div>
        <NewsCards articles={newsArticles}  activeArticle={activeArticle} />
    </div>
  )
}