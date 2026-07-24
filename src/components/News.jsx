import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    constructor(props){
        super(props);
        //Local state

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        };
    }
}