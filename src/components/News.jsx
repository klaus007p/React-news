import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./Newsitem";
import Spinner from './Spinner'


// const API_KEY = import.meta.env.VITE_API_KEY;

export default class News extends Component {
    constructor(props) {
        super(props);
        //Local state

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        };
    }

    componentDidMount() {
        this.fetchNews();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.category !== this.props.category) {
            this.setState(
                {
                    articles: [],
                    totalResults: 0,
                    loading: true,
                    page: 1,
                },
                () => this.fetchNews()
            );
        }
    }


    fetchNews = async () => {
        this.setState({ loading: true });
        this.props.setProgress(30);


        const url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&apiKey=${this.props.API_KEY}&pageSize=10&page=${this.state.page}`

        try {

            const response = await fetch(url);
            const data = await response.json();

            this.props.setProgress(60);

            this.setState((prevState) => ({
                articles: prevState.articles.concat(data.articles || []),
                totalResults: data.totalResults || 0,
                loading: false,
            }));

            this.props.setProgress(90);

        } catch (err) {
            console.log("❌ Could not fetch news: ", err);
            this.setState({ loading: false });

        }

        this.props.setProgress(100);
    };

    fetchMoreData = () => {
        this.setState(
            (prevState) => ({ page: prevState.page + 1 }), //Go on next page
            () => this.fetchNews()
        );
    };

    render() {
        const { articles, loading, totalResults } = this.state;

        return (
            <div className="px-4 py-6 min-h-screen">
              
                <h1 className="text-center text-3xl font-extrabold mb-1 tracking-wider text-white">
                    📰 Top Headlines
                </h1>

                
                <p className="text-center text-sm text-white/70 mb-6">
                    {new Date().toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>

               
                <InfiniteScroll
                    dataLength={articles.length}                             // Length of current article list
                    next={this.fetchMoreData}                                // What to do on scroll down
                    hasMore={articles.length < totalResults}                 // Whether more data is available
                    loader={
                        <div className="flex justify-center items-center py-6">
                            <Spinner />
                        </div>
                    }
                    endMessage={
                        !loading && (
                            <p className="text-center text-white/50 py-4">
                                You are all caught up! 🎉
                            </p>
                        )
                    }
                >
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 py-6">
                        {articles.map((element, index) => (
                            <NewsItem
                                key={index}
                                title={element.title}
                                description={element.description || 'No description available.'}
                                url={element.url}
                                urltoimg={
                                    element.urlToImage ||
                                    'https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg'
                                }
                                publishedAt={element.publishedAt || 'No time available'}
                                source={element.source?.name || 'Unknown'}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        )

    }
}