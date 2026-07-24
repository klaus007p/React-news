import React, { Component } from "react";
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'


export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedCategory: props.category || 'General',
            menuOpen: false,
        };
    }

    
}