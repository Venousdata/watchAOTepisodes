import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Episodes from "./components/Episodes";
import Home from "./components/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

// anything within the Router component has access to its capabilities
// (in our case this will be mapping url paths to certain components so
// they display only when were on those pages)
// remember that we are using react-router-dom which is one of many router plugins (best one imo)
// remind me to explain SWITCH and EXACT (below)

const useStyles = makeStyles((theme) => {
  return {
    pagecontainer: {
      position: "relative",
      minHeight: "100vh",
    },
    contentwrap: {
      padding: "3rem",
    },
    footercontainer: {
      position: "absolute",
      height: "3rem",
      width: "100%",
      textAlign: "center",
      bottom: 0,
    },
    paper: {
      padding: "2em",
    },
  };
});

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.pagecontainer}>
      <BrowserRouter>
        <Navbar />
        <div className={classes.contentwrap}>
          <Paper elevation={2} className={classes.paper}>
            <Switch>
              <main>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/episodes" exact component={Episodes} />
                {/* affix optional path variable to episodes*/}
                <Route path="/contact" exact component={Contact} />
              </main>
            </Switch>
          </Paper>
        </div>
        <div class={classes.footercontainer}>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}
