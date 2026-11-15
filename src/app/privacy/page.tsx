import React from "react";
import { siteConfig } from "@/config/site";
import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data governance practices at NIYAN.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-24 bg-white min-h-screen text-[#300C41]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-4 border-b border-[#300C41]/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#DEE948] text-[#300C41] uppercase tracking-wider font-mono">
            <Shield className="w-3.5 h-3.5" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#300C41] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#300C41]/60 font-mono">
            Last Updated: November 2026 &bull; Compliant with Global Data Protection Standards
          </p>
        </div>

        <div className="text-xs sm:text-sm text-[#300C41]/80 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#300C41]">1. Data Ownership & Sovereignty</h2>
            <p>
              At {siteConfig.legalName}, we adhere to strict data sovereignty. Any proprietary data, source
              code, research notes, documents, or datasets provided to our engineering team for the purposes
              of model training, fine-tuning, or software development remain strictly confidential and the
              exclusive property of the client.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#300C41]">2. Information Collection</h2>
            <p>
              We collect information that you voluntarily provide when submitting project inquiries,
              registering for the client portal, or contacting our team. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#300C41]/70">
              <li>Full Name and contact information (Email, Phone, WhatsApp)</li>
              <li>Company or academic institution affiliations</li>
              <li>Project descriptions, technical requirements, and budget parameters</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#300C41]">3. AI Model Data Isolation</h2>
            <p>
              We guarantee that client training data and confidential proprietary intellectual property are
              never transmitted into public foundational model training sets. Custom models are containerized
              and deployed within isolated VPC perimeters or private client infrastructure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#300C41]">4. Non-Disclosure & Security</h2>
            <p>
              All team members and contract engineers operate under binding Non-Disclosure Agreements (NDAs).
              We enforce role-based access control, encrypted data transmission (TLS 1.3), and periodic
              security auditing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#300C41]">5. Contact Information</h2>
            <p>
              For privacy-related inquiries or data deletion requests, contact our Data Protection Lead at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-[#300C41] font-bold underline hover:text-[#DEE948]">
                {siteConfig.contact.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
