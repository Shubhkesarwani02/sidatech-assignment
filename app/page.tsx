"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Users,
  Zap,
  Briefcase,
  Headphones,
  Shield,
  ExternalLink,
  MessageCircle,
  Menu,
  X,
} from "lucide-react"

const testimonials = [
  {
    name: "Rahul Shrivastavan",
    role: "IT Professional",
    avatar: "/professional-man.png",
    content:
      "We have been planning to buy our first ever property. It was this time when my close friend told me to get the documents checked thoroughly. I used Medence's service — their lawyer found a legal issue that could have landed me in major trouble. Just that one review saved me from some financial disaster. Kudos to the team!",
    rating: 5,
  },
  {
    name: "Alok Mishra",
    role: "SDE Professional",
    avatar: "/young-professional.png",
    content:
      "My flatmate came across medence over his social media about their free rental agreement checker. We were already in trouble by then though. Our landlord without any warning or reason cut our deposit. And since we are young corporate guys we didn't want to further risk our careers by retaliating against landlord. But medence helped us recover our money from him legally without our involvement. Many other lawyers outside that we approached before meeting medence have inflated costs that were almost double of our 55k deposit. Medence gave us an easy way out here with their flexible plans. Made us feel it was fair. You guys are doing something that most startups fail which is impacting lives in a ways that actually matter.",
    rating: 5,
  },
  {
    name: "Pradeep Kumar",
    role: "Textile Business Owner",
    avatar: "/business-owner.png",
    content:
      "The customer team is highly responsive. While the lawyer himself was very professional from the start, what impressed me truly was their customer support. They responded to my concerns and made me calm whenever I felt anxious with my legal issue.",
    rating: 5,
  },
  {
    name: "G.Sneha",
    role: "Government Service",
    avatar: "/professional-woman-diverse.png",
    content:
      "I was so tired with other divorce lawyers and their money extracting business model. Their simple pricing is such a relief. I was unsure of divorce cases because I came across medence as divorce is not in the legal plans mentioned on site. But after enquiring I realised they also handle this after the issue has arisen and not before. My trust with my Medence partner was especially so warm. It feels like someone powerful has your back at all times. This is an amazing platform to get back it.",
    rating: 5,
  },
]

const faqs = [
  {
    question: "Are you an insurance company?",
    answer:
      "No, we are not an insurance company. Medence Legal is a legal services platform that connects you with experienced lawyers to handle your legal matters at affordable rates.",
  },
  {
    question: "Why is the plan pricing so affordable while lawyers outside charge so high?",
    answer:
      "We leverage technology and streamlined processes to reduce overhead costs. Our network of lawyers work efficiently through our platform, allowing us to pass on the savings to our clients while maintaining high-quality legal services.",
  },
  {
    question: "Can I avail the lawyer service after the trouble arises and not before?",
    answer:
      "Yes, absolutely! While we recommend proactive legal planning, our lawyers are available to assist you even after legal issues arise. We provide both preventive and reactive legal services based on your needs.",
  },
  {
    question: "Can I contact my personal lawyer in emergency situations?",
    answer:
      "Yes, once you're assigned a personal lawyer through our service, you can contact them directly for urgent legal matters. We also provide 24/7 customer support to ensure you get help when you need it most.",
  },
  {
    question: "Is my information safe and confidential with Medence?",
    answer:
      "Absolutely. We maintain strict confidentiality protocols and use industry-standard security measures to protect your personal and legal information. All communications between you and your lawyer are protected by attorney-client privilege.",
  },
  {
    question: "Do you have in-house lawyers?",
    answer:
      "We work with a carefully vetted network of experienced lawyers across different specializations. While they may not be physically in-house, they are dedicated partners who work exclusively through our platform to serve our clients.",
  },
]

export default function MedenceLegalLanding() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBookCallLoading, setIsBookCallLoading] = useState(false)
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Memoize testimonials to prevent unnecessary re-renders
  const memoizedTestimonials = useMemo(() => testimonials, [])
  const memoizedFaqs = useMemo(() => faqs, [])

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % memoizedTestimonials.length)
  }, [memoizedTestimonials.length])

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + memoizedTestimonials.length) % memoizedTestimonials.length)
  }, [memoizedTestimonials.length])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsMobileMenuOpen(false)
  }, [])

  // Scroll progress handler
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'h':
            e.preventDefault()
            scrollToSection('home')
            break
          case 'f':
            e.preventDefault()
            scrollToSection('faqs')
            break
        }
      }
      
      // Arrow keys for testimonials (only when not in an input)
      if ((e.target as HTMLElement)?.tagName !== 'INPUT' && (e.target as HTMLElement)?.tagName !== 'TEXTAREA') {
        if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.metaKey) {
          prevTestimonial()
        } else if (e.key === 'ArrowRight' && !e.ctrlKey && !e.metaKey) {
          nextTestimonial()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [nextTestimonial, prevTestimonial, scrollToSection])

  const handleBookCall = useCallback(async () => {
    setIsBookCallLoading(true)
    // Add a small delay to show loading state
    setTimeout(() => {
      window.open("https://calendly.com/medence-legal", "_blank")
      setIsBookCallLoading(false)
    }, 500)
  }, [])

  const handleWhatsAppClick = useCallback(async () => {
    setIsWhatsAppLoading(true)
    // Add a small delay to show loading state
    setTimeout(() => {
      const message = encodeURIComponent("Hi, I'm interested in Medence Legal services. Can you help me?")
      window.open(`https://wa.me/919876543210?text=${message}`, "_blank")
      setIsWhatsAppLoading(false)
    }, 300)
  }, [])

  return (
    <div className="min-h-screen bg-white smooth-scroll">
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-yellow-400 z-50 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
      
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" aria-hidden="true" />
                <span className="text-xl font-bold text-gray-900">MEDENCE LEGAL</span>
              </div>
              <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-blue-600 border-b-2 border-blue-600 pb-1 font-medium hover:text-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
                  aria-current="page"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("faqs")}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 border-b-2 border-transparent hover:border-blue-300 pb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
                >
                  FAQs
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleBookCall} 
                disabled={isBookCallLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white hidden sm:flex transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBookCallLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    Book A Call <ExternalLink className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4" role="navigation" aria-label="Mobile navigation">
              <nav className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="text-blue-600 font-medium text-left transition-all duration-200 hover:bg-blue-50 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-current="page"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("faqs")}
                  className="text-gray-600 hover:text-blue-600 font-medium text-left transition-all duration-200 hover:bg-blue-50 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  FAQs
                </button>
                <Button 
                  onClick={handleBookCall} 
                  disabled={isBookCallLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:hidden transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  {isBookCallLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      Book A Call <ExternalLink className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-12 sm:py-20" role="main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-4 sm:mb-6 text-balance">
                Medence Legal
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Your Personal Lawyer. On Your Side, Always.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                  onClick={() => scrollToSection("pricing")}
                >
                  Check Plans
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  disabled={isBookCallLoading}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50"
                  onClick={handleBookCall}
                >
                  {isBookCallLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      Book a Call <ExternalLink className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <img
                src="/happy-family-with-lawyer-in-professional-setting.jpg"
                alt="Happy family consulting with their personal lawyer in a professional office setting"
                className="rounded-lg shadow-xl w-full"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex -space-x-2 flex-shrink-0" role="img" aria-label="Team of professional lawyers">
                <img src="/lawyer-avatar-1.jpg" alt="Experienced lawyer 1" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="/lawyer-avatar-2.jpg" alt="Experienced lawyer 2" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="/lawyer-avatar-3.jpg" alt="Experienced lawyer 3" className="w-10 h-10 rounded-full border-2 border-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Welcome to Medence Legal.</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                  <p>
                    Just like insurance, you pay a simple fee upfront — and when trouble comes, we handle the legal
                    fight for you.
                  </p>
                  <p>
                    No chasing lawyers. No high legal bills. Just peace of mind for tenants, consumers, and everyday
                    legal needs.
                  </p>
                  <p>It's like having a personal lawyer in your corner to tackle the world for you.</p>
                </div>
              </div>
            </div>
            <div>
              <img src="/statue-of-justice-with-scales.jpg" alt="Statue of Justice holding scales, symbolizing legal fairness and balance" className="rounded-lg w-full" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Call Our Executive</h3>
              <p className="text-gray-600 text-sm">
                Connect with our team to discuss your legal needs and clear all the questions you have right away.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Discovery</h3>
              <p className="text-gray-600 text-sm">
                Choose the right plan from our options — custom tailored to match your unique budget & legal needs
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Personal Lawyer</h3>
              <p className="text-gray-600 text-sm">
                Congratulations! You now have a dedicated personal lawyer for all your legal matters and needs.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">4. Legal Assistance</h3>
              <p className="text-gray-600 text-sm">
                Call or meet your lawyer anytime for advice or complete legal defence — always by your side.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">5. Customer Support</h3>
              <p className="text-gray-600 text-sm">
                Our robust support team is at your disposal, if you need to change lawyers or resolve grievances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">Why choose us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-sky-200 text-black interactive-card cursor-pointer group">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-blue-700 transition-colors">Affordable Legal Solutions</h3>
                <p className="mb-6">Access premium legal services without stretching your budget.</p>
                <ul className="space-y-2 text-sm">
                  <li>• Flexible plans to suit various financial needs.</li>
                  <li>• Transparent pricing with no hidden charges.</li>
                  <li>• Quality legal support at an unbeatable value.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-sky-200 text-black interactive-card cursor-pointer group">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-blue-700 transition-colors">Expert and Personalized Support</h3>
                <p className="mb-6">Unmatched service from seasoned legal professionals tailored to your needs.</p>
                <ul className="space-y-2 text-sm">
                  <li>• Diverse but expert lawyers.</li>
                  <li>• Best lawyer-client fit combination.</li>
                  <li>• Comprehensive solutions as per requirements.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gray-100 text-black interactive-card cursor-pointer group">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-blue-700 transition-colors">Always Here for Your Problems</h3>
                <p className="mb-6">Count on Medence for round-the-clock assistance and guidance.</p>
                <ul className="space-y-2 text-sm">
                  <li>• 24/7 customer support for all your queries.</li>
                  <li>• Timely updates and proactive communication.</li>
                  <li>• Accessible from wherever and whenever.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="pricing" className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">How We Stack Up</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-3 sm:px-6"></th>
                  <th className="text-center py-4 px-3 sm:px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      <span className="text-lg sm:text-xl font-bold text-blue-600">Medence Legal</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-3 sm:px-6 text-lg sm:text-xl font-bold text-red-600">
                    Other "Typical" Lawyers
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-green-50">
                  <td className="py-4 px-3 sm:px-6 font-semibold text-sm sm:text-base">Price Tag</td>
                  <td className="py-4 px-3 sm:px-6 text-center text-sm sm:text-base">Starting at ₹199</td>
                  <td className="py-4 px-3 sm:px-6 text-center bg-red-50 text-sm sm:text-base">Expensive</td>
                </tr>
                <tr>
                  <td className="py-4 px-3 sm:px-6 font-semibold text-sm sm:text-base">Price Clarity</td>
                  <td className="py-4 px-3 sm:px-6 text-center bg-green-50 text-sm sm:text-base">Standard Pricing</td>
                  <td className="py-4 px-3 sm:px-6 text-center bg-red-50 text-sm sm:text-base">
                    Uncertain & Hidden Pricing
                  </td>
                </tr>
                <tr className="bg-green-50">
                  <td className="py-4 px-3 sm:px-6 font-semibold text-sm sm:text-base">Quality</td>
                  <td className="py-4 px-3 sm:px-6 text-center text-sm sm:text-base">Avg. 19 Years of Experience</td>
                  <td className="py-4 px-3 sm:px-6 text-center bg-red-50 text-sm sm:text-base">Unsure of Quality</td>
                </tr>
                <tr>
                  <td className="py-4 px-3 sm:px-6 font-semibold text-sm sm:text-base">Ease</td>
                  <td className="py-4 px-3 sm:px-6 text-center bg-green-50 text-sm sm:text-base">Auto Case Updates</td>
                  <td className="py-4 px-3 sm:px-6 text-center bg-red-50 text-sm sm:text-base">Hassles & Runarounds</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="py-4 px-3 sm:px-6 font-semibold text-sm sm:text-base">Flexibility</td>
                  <td className="py-4 px-3 sm:px-6 text-center text-sm sm:text-base">Lawyer Replacement Option</td>
                  <td className="py-4 px-3 sm:px-6 text-center bg-red-50 text-sm sm:text-base">No Flexibility</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">HEAR IT FROM OUR USERS</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Discover the valuable feedback and testimonials from our satisfied clients about their experiences with
                us.
              </p>
            </div>
            <div className="flex space-x-2 justify-center sm:justify-end">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={prevTestimonial} 
                className="rounded-full bg-transparent transition-all duration-200 hover:scale-110 hover:shadow-md active:scale-95 focus:ring-2 focus:ring-blue-500"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={nextTestimonial} 
                className="rounded-full bg-transparent transition-all duration-200 hover:scale-110 hover:shadow-md active:scale-95 focus:ring-2 focus:ring-blue-500"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {memoizedTestimonials.map((testimonial, index) => (
              <Card key={index} className={`interactive-card cursor-pointer ${index === currentTestimonial ? "ring-2 ring-blue-500 scale-105" : ""} transition-all duration-300`}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={`${testimonial.name}, ${testimonial.role}`}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 mb-4 line-clamp-6">{testimonial.content}</p>
                  <div className="flex text-yellow-400" role="img" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} aria-hidden="true">★</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">TRUSTED BY OUR USERS</h2>
            <p className="text-gray-600">Medence Legal is backed by results, not just words</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">27.45+</div>
              <p className="text-gray-600 text-sm sm:text-base">crore worth of assets under litigation handled</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">73,000</div>
              <p className="text-gray-600 text-sm sm:text-base">Average Money Saved per User</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">4.83</div>
              <p className="text-gray-600 text-sm sm:text-base">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-gray-600 mb-6">Still have any questions? Contact our Team via</p>
              <a 
                href="mailto:support@medence.legal.in" 
                className="text-blue-600 hover:underline transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-0.5 hover:bg-blue-50"
                onClick={(e) => {
                  // Add analytics tracking or feedback here if needed
                  console.log('Email link clicked')
                }}
              >
                support@medence.legal.in
              </a>
              <div className="mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => scrollToSection("faqs")}
                  className="transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 focus:ring-2 focus:ring-blue-500"
                >
                  See All FAQ's
                </Button>
              </div>
            </div>
            <div>
              <Accordion type="single" collapsible className="space-y-4">
                {memoizedFaqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="border border-gray-200 rounded-lg px-4 hover:shadow-md transition-all duration-200 interactive-card"
                  >
                    <AccordionTrigger className="text-left hover:no-underline text-sm sm:text-base hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 sm:py-8" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <p className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
              Designed & Developed by{" "}
              <a 
                href="#" 
                className="text-blue-600 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                SIDA Technologies
              </a>
            </p>
            <div className="flex items-center justify-center sm:justify-end space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded p-1"
                aria-label="Visit our LinkedIn page"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Chat Button */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <Button
          size="lg"
          disabled={isWhatsAppLoading}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 pulse-animation"
          onClick={handleWhatsAppClick}
          aria-label="Contact us on WhatsApp"
        >
          {isWhatsAppLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </Button>
      </div>
    </div>
  )
}
