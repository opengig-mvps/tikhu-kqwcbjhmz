'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Phone, User, Calendar } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-blue-500 to-blue-800 text-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Revolutionize Your Restaurant Communication
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Tikhu, your AI voice agent, handles calls for inquiries, food orders, and reservations seamlessly.
                  </p>
                </div>
                <div className="flex gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                    Get Started
                  </Button>
                  <Button className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="https://picsum.photos/seed/picsum/200/300"
                  alt="AI Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white text-blue-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Dashboard Insights</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Access detailed information on calls, orders, and reservations from our intuitive dashboards.
                </p>
              </div>
            </div>
            <div className="grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card className="flex flex-col items-center p-6 bg-blue-50 shadow-lg">
                <Phone className="h-12 w-12 mb-4" />
                <CardHeader>
                  <CardTitle>Call Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center">
                    Monitor all inbound calls and manage customer inquiries efficiently from a single interface.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center p-6 bg-blue-50 shadow-lg">
                <User className="h-12 w-12 mb-4" />
                <CardHeader>
                  <CardTitle>Order Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center">
                    Track all food orders with precision, ensuring every dish reaches your customers in time.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center p-6 bg-blue-50 shadow-lg">
                <Calendar className="h-12 w-12 mb-4" />
                <CardHeader>
                  <CardTitle>Reservation Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center">
                    Manage reservations effortlessly, optimizing your seating capacity and customer experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-700 to-blue-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Customer Testimonials</h2>
                <p className="max-w-[900px] text-white md:text-xl/relaxed">
                  See what our happy customers have to say about Tikhu.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white shadow-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs text-muted-foreground">Restaurant Owner</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Tikhu has transformed our customer interaction, making the process smoother and more efficient."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white shadow-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Sarah Miller</p>
                      <p className="text-xs text-muted-foreground">Food Blogger</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The AI assistant is a game-changer. It has made ordering food and making reservations seamless."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white shadow-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://randomuser.me/api/portraits/men/85.jpg" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Michael Johnson</p>
                      <p className="text-xs text-muted-foreground">Tech Enthusiast</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "I love how easy it is to interact with Tikhu. It's intuitive and makes my life so much easier."
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Analytics</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Gain insights into your restaurant's performance with our advanced analytics.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-blue-900 p-6 md:py-12">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm text-white">
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <a href="#">Features</a>
            <a href="#">Integrations</a>
            <a href="#">Pricing</a>
            <a href="#">Security</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <a href="#">Documentation</a>
            <a href="#">Help Center</a>
            <a href="#">Community</a>
            <a href="#">Templates</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;