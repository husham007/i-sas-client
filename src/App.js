import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import Navbar from './components/Layouts/Navbar';
import MainPage from '../src/components/Layouts/MainPage'
import Footer from './components/Layouts/Footer';
import QuestionBank from './components/MenuItems/QuestionBank';
import QuestionDetails from './components/questionBank/QuestionDetails';
import LogIn from './components/Auth/LogIn';
import SignUp from './components/Auth/SignUp';
import CreateQuestion from './components/questionBank/CreateQuestion';
import AboutUS from './components/MenuItems/AboutUS';
import Contacts from './components/MenuItems/Contacts';
import { getToken } from './store/actions/authAction';
import { connect } from 'react-redux'
import { compose } from 'redux'

//Test Comment

class App extends Component {
 
  render() {
   this.props.getToken();
    return (
      <Router>
          <div style={{minHeight:'88vh', backgroundColor:'#000'}}>
          <CssBaseline />
          <Navbar />
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/signin" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/aboutUS" component={AboutUS} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/questionBank" exact component={QuestionBank} />
            <Route path="/questionBank/question/:id" component={QuestionDetails} />
            <Route path="/questionBank/create" component={CreateQuestion} />
          </Switch>
          </div>
          <Footer />
      </Router>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
      getToken: (token) => dispatch(getToken(token)),
      
  }
}

export default compose(
  connect(null, mapDispatchToProps),
)(App)

//export default App;
