// import React from "react";
// import {Container} from "@material-ui/core";
// import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
//
// import Navbar from "./components/Navbar/Navbar.js";
// import Home from "./components/Home/Home.js";
// import Auth from "./components/Auth/Auth.js";
// import PostDetails from "./components/PostDetails/PostDetails";
//
// const App = () => {
//     const user = JSON.parse(localStorage.getItem("profile"));
//
//     return (
//         <BrowserRouter>
//             <Container maxWidth="xl">
//                 <Navbar/>
//                 <Switch>
//                     <Route path="/" exact component={() => <Redirect to="/posts"/>}/>
//                     <Route path="/posts" exact component={Home}/>
//                     <Route path="/posts/search" exact component={Home}/>
//                     <Route path="/posts/:id" component={PostDetails}/>
//                     <Route path="/auth" exact component={() => (!user ? <Auth/> : <Redirect to="/posts" /> )}/>
//                 </Switch>
//             </Container>
//         </BrowserRouter>
//     );
// };
//
// export default App;

import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    const user = JSON.parse(localStorage.getItem("profile"));

    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/posts" replace />} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route
                        path="/auth"
                        element={!user ? <Auth /> : <Navigate to="/posts" replace />}
                    />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};

export default App;

