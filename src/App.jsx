import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingBar from "react-top-loading-bar"
import Navbar from './components/Navbar'
import News from './components/News'
import NewsItem from './components/Newsitem'
import Newsmain from './components/Newsmain'
import Spinner from './components/Spinner'


export default class App extends Component {
  state = {
    progress: 0,
    API_KEY: import.meta.env.VITE_API_KEY || "fallback_key"
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <div className='flex flex-col min-h-screen font-sora text-white'>
        <Routes>
          {[
            { path: "/", category: "general" },
            { path: "/general", category: "general" },
            { path: "/business", category: "business" },
            { path: "/technology", category: "technology" },
            { path: "/entertainment", category: "entertainment" },
            { path: "/sports", category: "sports" },
            { path: "/science", category: "science" },
            { path: "/health", category: "health" },
          ].map(({ path, category }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <>
                  <Navbar category={category} />
                  <LoadingBar
                    color="purple"
                    progress={this.state.progress}
                    height={3}
                  />
                  <main className="grow">
                    <News
                      setProgress={this.setProgress}
                      category={category}
                      API_KEY={this.state.API_KEY}
                    />
                  </main>
                </>
              
              }
            />
          ))}
        </Routes>
      </div>
    )
  }
}
