import React, { useState, useEffect, createRef } from 'react'; 
import classNames from 'classnames';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

import useStyles from './style.js';

export default function NewsCard({ article: { description, publishedAt, source, title, url, urlToImage }, i,  activeArticle }) {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);//we have to create ref for evrey card
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);
    useEffect(() => { // called only on the start to setup all the refs
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef(j)))
    }, []);

    useEffect(() => { // called evrey time activeArticle or elrefs changed
        if(i === activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle]);
        }
    }, [i, activeArticle, elRefs]);    


    return (
        <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>

            <CardActionArea href={url} target='_blank'> {/* the clickable part of the card :: _blank for open in another page */}
                <CardMedia
                    className={classes.media}
                    image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'}
                />
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary' component='h2'>{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant='body2' color='textSecondary' component='h2'>{source.name}</Typography>
                </div>
                {/* getterBottom that's mean will have same margin or padding in the buttom */}
                <Typography className={classes.title} gutterBottom variant='h5'>{title}</Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary'>Learn More</Button>
                <Typography variant='h5' color='textSecondary'>{i + 1}</Typography>
            </CardActions>
        </Card>
    )
}
