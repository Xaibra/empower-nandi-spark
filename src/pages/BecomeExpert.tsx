import { useState } from "react";
import { FileText, Briefcase, Send } from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ModalSystem from "@/components/ModalSystem";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const BecomeExpert = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    location: "",
    services: "",
    cvLink: "",
    description: "",
  });

  const handleChange = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.businessName || !form.phone || !form.location) return;
    setSubmitting(true);

    // For now this is a client-side only demo. Integrate with your backend/email later.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <section className="py-12 bg-muted/50">
          <div className="container max-w-3xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Apply to Join the Experts & Business Showcase
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This space is reserved for youth, women and marginalized community businesses
                and experts who are ready to showcase their products, services and skills.
                Fill in your details below and our team will contact you about payment and approval.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Expert / Business Application
                </CardTitle>
                <CardDescription>
                  Tell us about yourself and your work. Fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="space-y-3">
                    <h2 className="text-lg font-semibold">Thank you for applying</h2>
                    <p className="text-sm text-muted-foreground">
                      We have received your details. A Tujitume team member will review your
                      application and reach out to you with next steps, including payment
                      information before your profile is published.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="fullName">
                          Full name (contact person) *
                        </label>
                        <Input
                          id="fullName"
                          value={form.fullName}
                          onChange={handleChange("fullName")}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="businessName">
                          Business / expert name *
                        </label>
                        <Input
                          id="businessName"
                          value={form.businessName}
                          onChange={handleChange("businessName")}
                          placeholder="e.g. Chepterit Digital Studio"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="phone">
                          Phone number *
                        </label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={handleChange("phone")}
                          placeholder="e.g. +2547..."
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                          Email (optional)
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange("email")}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="location">
                          Location *
                        </label>
                        <Input
                          id="location"
                          value={form.location}
                          onChange={handleChange("location")}
                          placeholder="e.g. Kapsabet, Nandi County"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="cvLink">
                          CV / portfolio link (optional)
                        </label>
                        <Input
                          id="cvLink"
                          value={form.cvLink}
                          onChange={handleChange("cvLink")}
                          placeholder="e.g. Google Drive, LinkedIn, website"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="services">
                        Products / services you offer *
                      </label>
                      <Input
                        id="services"
                        value={form.services}
                        onChange={handleChange("services")}
                        placeholder="Short summary of what you provide"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="description">
                        Tell us more about your work (optional)
                      </label>
                      <Textarea
                        id="description"
                        value={form.description}
                        onChange={handleChange("description")}
                        placeholder="Who do you serve? How are you empowering youth, women or marginalized groups?"
                        rows={4}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        <span>
                          Submitting this form does not guarantee listing. Our team will review all
                          applications and only approved (paid) profiles will appear publicly.
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" disabled={submitting || !form.fullName || !form.businessName || !form.phone || !form.location}>
                        <Send className="h-4 w-4 mr-2" />
                        {submitting ? "Submitting..." : "Submit application"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
      <ModalSystem />
    </div>
  );
};

export default BecomeExpert;
