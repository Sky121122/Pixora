import About from "../components/About";
import Gallery from "../components/Gallery";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SpritePlayground from "../components/SpritePlayground";


function Home() {
  return (
    <div className="app">
      <Header />
      
      <main>
        <Hero />
        <Gallery />
        <SpritePlayground />
        <section id="about">
        <About />
        </section>
      
      </main>
    </div>
  );
}

export default Home;
