import { BookOpen, Shield, Users, Leaf } from "lucide-react";

const ValueProposition = () => {
  const values = [
    {
      icon: BookOpen,
      title: "Practical skills, real opportunities",
      description: "From vocational training to digital literacy and incubation support, we turn potential into livelihoods."
    },
    {
      icon: Shield,
      title: "Safe, inclusive spaces",
      description: "We champion gender equality, mental health, and safeguarding so everyone can participate and thrive."
    },
    {
      icon: Users,
      title: "Youth-led solutions",
      description: "We elevate youth and women as decision-makers, innovators, and community leaders."
    },
    {
      icon: Leaf,
      title: "Climate-smart futures",
      description: "We grow green skills—climate-smart agriculture, tree planting, and waste recycling—to sustain people and planet."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Approach to Community Transformation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe in empowering communities through comprehensive, inclusive programs 
            that create lasting change and sustainable impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-impact mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;