"use client"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const allFaqs = [
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
  {
    question: "What types of legal cases do you handle?",
    answer:
      "We handle a wide range of legal matters including property disputes, rental agreements, consumer protection, employment issues, family law, contract disputes, and more. Our diverse network of lawyers covers most legal specializations.",
  },
  {
    question: "How quickly can I get connected with a lawyer?",
    answer:
      "Typically, we can connect you with a suitable lawyer within 24-48 hours of your initial consultation. For urgent matters, we offer expedited matching services.",
  },
  {
    question: "What if I'm not satisfied with my assigned lawyer?",
    answer:
      "We offer a lawyer replacement option as part of our flexibility guarantee. If you're not satisfied with your assigned lawyer, you can request a replacement through our customer support team.",
  },
  {
    question: "Do you provide legal services across all states in India?",
    answer:
      "Yes, we have a pan-India network of lawyers and can provide legal services across all states and union territories in India.",
  },
]

export default function FAQsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">MEDENCE LEGAL</span>
              </div>
            </div>
            <Button variant="outline" onClick={() => router.push("/")} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
      </header>

      {/* FAQ Content */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600">Find answers to common questions about Medence Legal services</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {allFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline py-6">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions? We're here to help!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open("mailto:support@medence.legal.in")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Email Support
              </Button>
              <Button variant="outline" onClick={() => window.open("https://calendly.com/medence-legal", "_blank")}>
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
