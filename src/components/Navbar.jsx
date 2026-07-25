import React, { Component } from "react";
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'


export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: props.category || 'General',
            menuOpen: false,
        };
    }

    handleCategoryClick = (category) => {
        document.title = `NewsNation - ${category}`;
        this.setState({ selectedCategory: category, menuOpen: false });
    };

    toggleMenu = () => {
        this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }));
    };

    render() {
        const categories = [
            "General",
            "Business",
            "Technology",
            "Entertainment",
            "Sports",
            "Science",
            "Health",
        ];

        return(
            <div>hello</div>
        )
    }
}