import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Aboutus from './pages/Aboutus';
import Donation from './pages/donation/Donation';
import Projects from './pages/projects/Projects';
import Partners from './pages/Partners';
import Publications from './pages/publications/Publications';
import Contactus from './pages/Contactus';
import Project from './pages/projects/Project';
import Publication from './pages/publications/Publication';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/aboutus" component={Aboutus} />
        <Route exact path="/donate" component={Donation} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/projects/:projectId" component={Project} />
        <Route exact path="/partners" component={Partners} />
        <Route exact path="/publications" component={Publications} />
        <Route
          exact
          path="/publications/:publicationId"
          component={Publication}
        />
        <Route exact path="/contactus" component={Contactus} />
      </Switch>
    </Router>
  );
}

export default App;
