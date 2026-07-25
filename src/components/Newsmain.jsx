import React, { Component } from "react";



export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        };
    }

    fetchNews = async () => {

        try {
            this.setState({ loading: true});

            const url =  `https://newsapi.org/v2/top-headlines?language=en&topic=war&apiKey=ec99413521d1466f93d13e557c5080df&page=${this.state.page}&pageSize=6`;
            const response = await fetch(url);
            const data = await response.json();

            this.setState({
                articles: data.articles,
                totalResults: data.totalResults,
                loading: false,
            });
        } catch (error) {
            console.log("Couldn't fetch the news", error);
            
        }
    };

    componentDidMount() {
        this.fetchNews();
    }

    handleNext = () => {
        if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 6)) {
            this.setState(
                (prevState) => ({ page: prevState.page + 1}),
                () => this.fetchNews()
            );
        }
    };
}