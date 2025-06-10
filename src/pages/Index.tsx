
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Home, Calculator, ClipboardList } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Welcome to Your Project Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your apartment renovation project with professional tools designed for tracking, budgeting, and organizing every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Renovation Manager</CardTitle>
              <CardDescription className="text-base">
                Complete CRUD system for tracking your apartment renovation items, budget, and progress
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => navigate('/renovation')}
                className="w-full"
                size="lg"
              >
                Start Managing
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-secondary/20 rounded-full w-fit">
                <Calculator className="h-8 w-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">Budget Calculator</CardTitle>
              <CardDescription className="text-base">
                Advanced budget calculations and financial tracking for your renovation project
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full" size="lg" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-accent/30 rounded-full w-fit">
                <ClipboardList className="h-8 w-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl">Progress Reports</CardTitle>
              <CardDescription className="text-base">
                Generate detailed reports and visualizations of your renovation progress
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full" size="lg" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card border rounded-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">✓ Complete Item Management</h3>
                <p className="text-muted-foreground">Add, edit, delete renovation items with full details</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">✓ Budget Tracking</h3>
                <p className="text-muted-foreground">Track budget vs actual costs in Brazilian Real (BRL)</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">✓ Status Management</h3>
                <p className="text-muted-foreground">Monitor progress with visual status indicators</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">✓ Supplier Information</h3>
                <p className="text-muted-foreground">Keep track of suppliers and payment methods</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
