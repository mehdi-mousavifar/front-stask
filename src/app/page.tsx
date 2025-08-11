import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
          <span className="font-bold text-xl">TaskFlow</span>
        </div>
        <div className="flex space-x-4">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button>
          <Link href="/dashboard">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Simplify Your Workflow
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          A minimalist task manager that helps you focus on what matters most.
          Beautifully designed with productivity in mind.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg">Start Organizing</Button>
          </Link>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      {/* Feature Preview */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Streamlined Task Management
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Simple Interface" 
            description="Focus on your tasks without distractions. Clean design helps you stay productive."
          />
          <FeatureCard 
            title="Powerful Organization" 
            description="Categorize, prioritize, and schedule tasks with intuitive controls."
          />
          <FeatureCard 
            title="Anywhere Access" 
            description="Access your tasks from any device with our responsive design."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}