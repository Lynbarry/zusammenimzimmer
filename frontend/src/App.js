import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "typeface-roboto";
import { DummyHouse } from "./components/DummyHouse";
import { Listing } from "./components/Listing";
import { Faqs } from "./components/Faqs";
import { Header } from "./components/Header";
import {Helmet} from "react-helmet";

// const exampleListing = {
//   created: "22.03.2020 09:10:09",
//   title: "Scrum for Kids",
//   abstract:
//     "Homeschooling und Homeoffice parallel zu bewältigen stellt Familien vor eure Herausforderungen - Elemente aus Scrum und dem agilen Projektmanagement helfen den Alltag vereinbar zu gestalten",
//   date: "25.03.2020",
//   time: "18:00:00",
//   duration: "30 Minuten",
//   level: "Für Anfänger, die keinen blassen Schimmer haben",
//   participantCount: "10-50",
//   broadcast:
//     "https://join.slack.com/t/scrumforkids/shared_invite/zt-cti6mz1e-8k5Vb6BAb6ONidRKKx2UzQ",
//   name: "Kathrin Gielsdorf",
//   email: "k.gielsdorf@gmx.de",
//   cost: "gratis",
//   categories: {
//     light: "Hell",
//     body: "Kopf",
//     size: "Klein",
//     noise: "Leise",
//     clean: "Sauber",
//     speed: "Schnell"
//   }
// };

function App() {
  const [headerSize, setHeaderSize] = useState("big");
  // Uncomment this to render a Listing with default content for development
  // useEffect(() => {
  //   setListing(exampleListing);
  //   console.log(listing);
  // }, listing);

  return (
    <Router>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Zusammen im Zimmer</title>
          <meta name="description" content="In Quarantäne soziale Online-Aktivitäten finden" />
      </Helmet>
      <Header size={headerSize} />
      <main className="content">
        <Switch>
          <Route
            path="/listing/:listingId"
            render={() => <Listing setHeaderSize={setHeaderSize} />}
          />
          <Route path="/faq" component={Faqs} />
          <Route path="/">
            <DummyHouse />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
