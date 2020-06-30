import React, {useState, useEffect, useRef} from 'react';
// import { Router, NavLink } from 'react-router-dom';
import './App.css';

function App() {

  const [state, setState] = useState({
    userInput: 'chansen17',
    user: {
      avatarUrl: '',
      blog: '',
      company: '',
      email: '',
      followers: '',
      following: '',
      location: '',
      login: '',
      name: '',
      publicRepos: '',
      htmlUrl: '',
      reposUrl: '',
      stars: '',
    }
  })

  const [repoStyle, setRepoStyle] = useState(false);
  const [followersStyle, setFollowersStyle] = useState(true);
  const [followingStyle, setFollowingStyle] = useState(true);

  function getData() {
    fetch(`https://api.github.com/users/${state.userInput}`) 
      .then(response => response.json())
      .then(data => {

        setState({
          avatarUrl: data.avatar_url,
          blog: data.blog,
          company: data.company,
          email: data.email,
          followers: data.followers,
          following: data.following,
          location: data.location,
          login: data.login,
          name: data.name,
          publicRepos: data.public_repos,
          htmlUrl: data.html_url,
          reposUrl: data.repos_url,
          stars: data.starred_url
        })
        console.log(data);
      })
  }

  function handleOnChange(e) {
    setState({
      userInput: e.target.value
    })
  }

  const handleRepoStyle = () => {
    setRepoStyle(repoStyle => !repoStyle)
  }

  const handleFollowerStyle = () => {
    setFollowersStyle(followersStyle => !followersStyle)
  }

  const handleFollowingStyle = () => {
    setFollowingStyle(followingStyle => !followingStyle)
  }

  useEffect(() => {
    getData();
    handleRepoStyle();
    handleFollowerStyle();
    handleFollowingStyle();
  }, [])


  return (
    <div className="wrap">
        <div className="form">
          <input type="text" placeholder="Search github.." onChange={handleOnChange}/>
          <br/>
          <button onClick={getData}>Find user</button>
        </div>
        <div className="card">
          <header>
            <div className="profile-img-container">
              <a href={state.htmlUrl}><img className="prof-img" src={state.avatarUrl}/></a>
              <div className="title-info">
                <div>
                <h3 className="name">{state.name}</h3>
                <h5 className="login">@{state.login}</h5>
                </div>
                <div>
                <h6 className="company">{state.company}</h6>
                <h6 className="location">location: {state.location}</h6>
                </div>
              </div>
            </div>
            <div/>
            <div className="profile-new-user-btn-container">
              <button className="edit-btn"><i className="far fa-edit"></i> edit</button>
            </div>
          </header>
          <section className="body">
            <section className="nav">
              <div>
                <ul>
                  <li>home</li>
                  <li>projects</li>
                  <li>jobs</li>
                  <li>contact</li>
                  <li>about</li>
                </ul>
              </div>
              <div/>
            </section>

            <section className="insights">
              <div>
                <h3>Insights</h3>
              </div>
              <div>
                <h6>May 28 - June 24 <i className="fas fa-chevron-down"></i></h6>
              </div>
            </section>

            <section className="meta-information">
              <div className="panels">
                
                <div className={`panel ${repoStyle ? "panel-style-selected" : "panel-style-not-selected"}`} onClick={handleRepoStyle}>
                  <div className="inner-top">
                    <h5 style={{ color : repoStyle ? "#ccc" : "#2E2E2E" }}>Public Repos</h5>
                    <h5 className="percent-change"><small><i className="fas fa-sort-up"></i> 7%</small></h5>
                  </div>
                  <div className="inner-bottom">
                    <p style={{ color : repoStyle ? "#ccc" : "green" }} className="stat">{state.publicRepos}</p>
                    <a style={{ color : repoStyle ? "#eee" : "#2E2E2E" }} className="more-info-link" href="">More Info <i className="fas fa-angle-right"></i></a>
                  </div>
                </div>
                <div className={`panel ${followersStyle ? "panel-style-selected" : "panel-style-not-selected"}`} onClick={handleFollowerStyle}>
                <div className="inner-top">
                    <h5 style={{ color : followersStyle ? "#ccc" : "#2E2E2E" }} >Followers</h5>
                    <h5 className="percent-change"><small><i className="fas fa-sort-up"></i> 11%</small></h5>
                  </div>
                  <div className="inner-bottom">
                    <p style={{ color : followersStyle ? "#ccc" : "green" }} className="stat">{state.followers}</p>
                    <a style={{ color : followersStyle ? "#eee" : "#2E2E2E" }} className="more-info-link" href="#">More Info <i className="fas fa-angle-right"></i></a>
                  </div>
                </div>
                <div className={`panel ${followingStyle ? "panel-style-selected" : "panel-style-not-selected"}`} onClick={handleFollowingStyle}>
                <div className="inner-top">
                    <h5 style={{ color : followingStyle ? "#ccc" : "#2E2E2E" }}>Following</h5>
                    <h5 className="percent-change"><small><i className="fas fa-sort-up"></i> 3%</small></h5>
                  </div>
                  <div className="inner-bottom">
                    <p style={{ color : followingStyle ? "#ccc" : "green" }} className="stat">{state.following}</p>
                    <a style={{ color : followingStyle ? "#eee" : "#2E2E2E" }} className="more-info-link" href="#">More Info <i className="fas fa-angle-right"></i></a>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>

        <a className="attribute" target="_blank" href="https://uidesigndaily.com/posts/sketch-page-insights-stats-statistics-website-analytics-card-header-day-1125">Inspired by</a>
    </div>
  );
}

export default App;
