import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingBar from "react-top-loading-bar"

import News from './components/News'
import './App.css'

export default class App extends Component {
  state = {
    progress: 0,
    apikey: import.meta.env.VITE_API_KEY || "fallback_key"
  };

  setProgress = (progress) => {
    this.setState({ progress: progress});
  };
}
