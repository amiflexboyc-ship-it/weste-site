import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Heart,
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { FaRecycle, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useToast } from '../context/ToastContext';

const Footer = () => {
  const { showToast } = useToast();

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Adoption Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }

    setIsSubmitting(true);
    // Simulate real-world network latency
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);

    showToast(
      `Thank you, ${formData.name}! Your message regarding "${formData.subject}" has been received. Our rescue coordinator will reply shortly.`,
      'success'
    );

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: 'Adoption Inquiry',
      message: ''
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showToast('Please provide a valid email address.', 'warning');
      return;
    }

    setNewsletterSubscribed(true);
    showToast(
      '🎉 Thank you for subscribing to WESTE Wildlife updates and rescue stories!',
      'success'
    );
    setNewsletterEmail('');
  };

  return (
    <footer id="contact" className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* ================= Contact Section ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>24/7 Rescue & Adoption Coordination</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Get in Touch With <span className="text-blue-500">Our Sanctuary</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Have questions about adopting a pet, sponsoring endangered wildlife, or reporting an animal in distress? Our medical and rescue team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Sanctuary Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">Sanctuary Headquarters</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Our 350-acre wildlife sanctuary provides rescue triage, veterinary rehabilitation, and open pastures for hundreds of animals awaiting loving forever homes.
            </p>

            {/* Emergency Hotline Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/40 border border-rose-800/50 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-rose-600/20 text-rose-400 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-rose-400 block">
                  24/7 Emergency Wildlife Hotline
                </span>
                <a
                  href="tel:+18005559453"
                  className="text-lg font-bold text-white hover:text-rose-300 transition"
                >
                  +1 (800) 555-WILD (9453)
                </a>
                <p className="text-xs text-rose-200/70 mt-1">
                  Immediate dispatch for injured or abandoned wildlife.
                </p>
              </div>
            </div>

            {/* General Inquiries & Email Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition">
              <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                  Adoption & Foster Desk
                </span>
                <a
                  href="mailto:adoptions@weste-animals.org"
                  className="text-base font-semibold text-white hover:text-blue-400 transition"
                >
                  adoptions@weste-animals.org
                </a>
                <p className="text-xs text-slate-400 mt-1">
                  General inquiries: support@weste-animals.org
                </p>
              </div>
            </div>

            {/* Location Address */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition">
              <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                  Sanctuary & Care Grounds
                </span>
                <p className="text-sm font-semibold text-white">
                  1204 Forest Reserve Way, Wildlife Valley, CA 90210
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Open for pre-scheduled visitor tours and meet-and-greets.
                </p>
              </div>
            </div>

            {/* Visiting Hours */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition">
              <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                  Adoption & Visitor Hours
                </span>
                <p className="text-sm text-white font-medium">
                  Mon – Fri: <span className="text-emerald-400">8:00 AM – 6:00 PM</span>
                </p>
                <p className="text-sm text-white font-medium">
                  Saturday: <span className="text-emerald-400">9:00 AM – 5:00 PM</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Sundays: Emergency Animal Intake Only
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">Send Us a Direct Message</h3>
            <p className="text-sm text-slate-400 mb-6">
              Fill out this form and a care coordinator will get back to you within 24 hours.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jordan Lee"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jordan@example.com"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Subject / Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                >
                  <option value="Adoption Inquiry">🐾 Adoption Application / Animal Inquiry</option>
                  <option value="Volunteer Interest">🤝 Volunteer & Sanctuary Work</option>
                  <option value="Report Injured Wildlife">🚨 Report Injured / Distressed Wildlife</option>
                  <option value="Sponsorship & Donation">💖 Animal Sponsorship & Donations</option>
                  <option value="General Question">💬 General Question or Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us which animal you are interested in, or describe your question..."
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-900/30 flex items-center justify-center gap-2 transition transform active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending your message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= Newsletter Subscribe Banner ================= */}
      <div className="bg-slate-900/80 border-y border-slate-800 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Join the Wildlife Preservation Newsletter</span>
            </h4>
            <p className="text-sm text-slate-400 mt-1">
              Receive uplifting rescue stories, animal health tips, and upcoming sanctuary visit events.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2.5 text-sm text-white placeholder-slate-500 flex-1 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-md transition shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ================= Navigation Links & Copyright ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaRecycle className="text-2xl text-blue-500" />
              <span className="text-2xl font-black text-white tracking-wider">
                WESTE <span className="text-blue-500">ANIMALS</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dedicated to rescue, protection, and lifelong care of vulnerable domestic animals and endangered wildlife species across protected habitats.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 hover:text-white transition" aria-label="Twitter">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 hover:text-white transition" aria-label="Facebook">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-rose-600 hover:text-white transition" aria-label="Instagram">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-red-600 hover:text-white transition" aria-label="YouTube">
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition">Home Page</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition">About Our Sanctuaries</a></li>
              <li><a href="#animals" className="hover:text-blue-400 transition">Adopt Animals</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition">Emergency Rescue Desk</a></li>
              <li><a href="#animals" className="hover:text-blue-400 transition">Wildlife Conservation</a></li>
            </ul>
          </div>

          {/* Col 3: Ways to Help */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Get Involved
            </h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#animals" className="hover:text-blue-400 transition">Sponsor an Orphan Animal</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition">Volunteer at our Grounds</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition">Foster Care Program</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition">Corporate Partnerships</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition">Donate Pet Supplies</a></li>
            </ul>
          </div>

          {/* Col 4: Trust & Welfare */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Standards & Legal
            </h5>
            <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Certified 501(c)(3) Non-Profit</span>
              </div>
              <p>
                All adoptions comply with ethical veterinary standards, zero-euthanasia shelter regulations, and state animal welfare guidelines.
              </p>
              <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-slate-500">
                <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
                <a href="#" className="hover:text-slate-300 transition">Terms of Adoption</a>
                <a href="#" className="hover:text-slate-300 transition">Accessibility</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} WESTE Animal Management & Wildlife Preservation. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for wildlife worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;