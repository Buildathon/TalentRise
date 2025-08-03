import { Route, Switch } from "wouter"; // Importamos el enrutador de Wouter
import Header from "./components/Header";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
import DevPage from "./pages/DevPage";
import Contact from "./pages/Contact";
import DevDetailPage from "./pages/DevDetailPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Following from "./pages/FollowingPage";
import Profile from "./pages/ProfilePage";
import Talento from "./pages/TalentSupportPage";


import "./App.css";
import Attention from './pages/Attention';

const App = () => {
  return (
    <div className="bg-clientLightPrimary dark:bg-clientDarkPrimary min-h-screen">
      {/* Componente Header */}
      <Header />
      {/* Componente principal de la aplicación */}
      <main>
        {/* Definimos las rutas utilizando Switch de Wouter */}
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={DevPage} />
          <Route path="/perfil" component={Profile} />
    <Route path="/talento" component={Talento} />

   

            <Route path="/Following" component={Following} />
          <Route path="/dev" component={DevPage} />
          <Route path="/dev/:id" component={DevDetailPage} />
          <Route path="/Contact" component={Contact} />
          <Route path="/Attention" component={Attention} />
        </Switch>
      </main>
      {/* Componente Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default App;
