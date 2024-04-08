// {Name: Basic_example_for_AI_assistant}
// {Description: Learn how to create a dialog script with voice/text commands and text corpus for question answering}

// Use this sample to create your own voice/text commands
// intent('whats this app do ', p => {
//     p.play('(this is a new project)');
// });
// intent('start a command ', (p) => {
//     p.play({command : 'testCommand'});
// });

const API_KEY = '';
let savedArticles = [];

// News by Source
intent('(Give|) (me|) (the|) news from $(source* (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    
    if(p.source.value) {
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join('-')}`
    }
    
    const options = { url: NEWS_API_URL, headers: {'User-Agent': 'request'}};
    api.request(options, (error, response, body)  => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for news from a different source');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) ${p.source.value}.`);
        p.play('would you like me to raed the headlines?');
        p.then(confirmation);
      

    });
})
    
// News by term
intent('what\'s up with $(term* (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
    
    if(p.term.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`
    }
    
    const options = { url: NEWS_API_URL, headers: {'User-Agent': 'request'}};
    api.request(options, (error, response, body)  => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for something else.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) articles on ${p.term.value}.`);
        p.play('would you like me to raed the headlines?');
        p.then(confirmation);
      

    });
})
// News by Categories
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`;
    
    if(p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
    }
    
    const options = { url: NEWS_API_URL, headers: {'User-Agent': 'request'}};
    api.request(options, (error, response, body)  => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for a diffrent category.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        
        
           if(p.C.value) {
                p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);
            } else {
                     p.play(`Here are the (latest|recent) news.`);

            }
            p.play('would you like me to raed the headlines?');
            p.then(confirmation);
      
    });
})

const confirmation = context(() => {
    intent('yes',async (p)=>{//when u have a async use a for
        for(let i = 0; i < savedArticles.length; i++){
            p.play({ command:'highlight', article:savedArticles[i] });
            p.play(`${savedArticles[i].title}`);
        }
    })
    intent('no', (p)=>{
        p.play('yeah, sounds good to me');
    })
})

intent('open (the|) (article|) (number|) $(number* (.*))', (p) => {
    if(p.number.value) {
        p.play({ command:'open', number: p.number.value, articles: savedArticles})
    }
})

intent('(go|) back', (p) => {
    p.play('okito, easy peasy');
    p.play({ command: 'newHeadlines', articles:[] })
})


// Give your AI assistant some knowledge about the world
corpus(`
    Hello, I'm Alan.
    This is a demo application.
    You can learn how to teach Alan useful skills.
    I can teach you how to write Alan Scripts.
    I can help you. I can do a lot of things. I can answer questions. I can do tasks.
    But they should be relevant to this application.
    I can help with this application.
    I'm Alan. I'm a virtual assistant. I'm here to help you with applications.
    This is a demo script. It shows how to use Alan.
    You can create dialogs and teach me.
    For example: I can help navigate this application.
`);
