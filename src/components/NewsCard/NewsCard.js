import React from 'react';

import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

import useStyles from './style.js';

export default function NewsCard({ article: { description, publishedAt, source, title, url, urlToImage }, i }) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>

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
