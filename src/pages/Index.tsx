import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Partnerships from "@/components/Partnerships";
import Impact from "@/components/Impact";
import News from "@/components/News";
import GetInvolved from "@/components/GetInvolved";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <ValueProposition />
        </section>
        <section id="story">
          <About />
        </section>
        <section id="programs">
          <Programs />
        </section>
        <section id="impact">
          <Impact />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="team">
          <Team />
        </section>
        <section id="partnerships">
          <Partnerships />
        </section>
        <section id="news">
          <News />
        </section>
        <section id="get-involved">
          <GetInvolved />
        </section>
      </main>
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Index;