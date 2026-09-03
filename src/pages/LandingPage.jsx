import { useNavigate } from 'react-router-dom';
import {
    BriefcaseBusiness,
    LayoutDashboard,
    KanbanSquare,
    Search,
    Users,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Target,
    TrendingUp,
    ShieldCheck,
    Menu,
    X,
} from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const goToRegister = () => {
        setMobileMenuOpen(false);
        navigate('/register');
    };

    const goToLogin = () => {
        setMobileMenuOpen(false);
        navigate('/login');
    };

    function FooterLink({ children, href, onClick }) {
  if (href) {
    return (
      <a
        href={href}
        className="block text-sm text-slate-500 hover:text-[#7C3AED] transition-colors"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="block text-left text-sm text-slate-500 hover:text-[#7C3AED] transition-colors"
    >
      {children}
    </button>
  );
}


function SocialButton({ children, label }) {
  return (
    <button
      aria-label={label}
      className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 hover:text-[#7C3AED] hover:border-purple-200 hover:bg-purple-50 transition-all"
    >
      {children}
    </button>
  );
}

    return (
        <div className="min-h-screen bg-[#FAFAFC] text-text-primary overflow-x-hidden">

            {/* =====================================================
          NAVBAR
      ===================================================== */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/70">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 h-18 flex items-center justify-between">

                    {/* Logo */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2.5"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#10B981] flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <BriefcaseBusiness
                                size={21}
                                className="text-white"
                                strokeWidth={2.2}
                            />
                        </div>

                        <span className="text-xl font-black tracking-tight">
                            Job<span className="text-[#7C3AED]">Track</span>
                        </span>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <a
                            href="#features"
                            className="hover:text-[#7C3AED] transition-colors"
                        >
                            Features
                        </a>

                        <a
                            href="#how-it-works"
                            className="hover:text-[#7C3AED] transition-colors"
                        >
                            How it works
                        </a>

                        <a
                            href="#roles"
                            className="hover:text-[#7C3AED] transition-colors"
                        >
                            For Employers
                        </a>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={goToLogin}
                            className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#7C3AED] transition-colors"
                        >
                            Sign in
                        </button>

                        <button
                            onClick={goToRegister}
                            className="px-5 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold shadow-lg shadow-purple-500/20 transition-all"
                        >
                            Get started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100"
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 bg-white px-5 py-5 space-y-3">
                        <a
                            href="#features"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-sm font-medium"
                        >
                            Features
                        </a>

                        <a
                            href="#how-it-works"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-sm font-medium"
                        >
                            How it works
                        </a>

                        <a
                            href="#roles"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-sm font-medium"
                        >
                            For Employers
                        </a>

                        <div className="pt-2 border-t border-slate-100 flex gap-2">
                            <button
                                onClick={goToLogin}
                                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                            >
                                Sign in
                            </button>

                            <button
                                onClick={goToRegister}
                                className="flex-1 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold"
                            >
                                Get started
                            </button>
                        </div>
                    </div>
                )}
            </header>


            {/* =====================================================
          HERO
      ===================================================== */}
            <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">

                {/* Background decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-300/20 blur-3xl" />
                    <div className="absolute top-40 -right-32 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

                    <div className="max-w-4xl mx-auto text-center">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-[#7C3AED] text-xs sm:text-sm font-semibold mb-7">
                            <Sparkles size={15} />
                            Your smarter way to manage the job search
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                            Your career.
                            <br />

                            <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#10B981] bg-clip-text text-transparent">
                                Organized for success.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-7 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed">
                            JobTrack helps you discover opportunities, organize every
                            application, and keep your career moving forward — while giving
                            employers a simpler way to find and manage great talent.
                        </p>

                        {/* Buttons */}
                        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">

                            <button
                                onClick={goToRegister}
                                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold shadow-xl shadow-purple-500/20 transition-all hover:-translate-y-0.5"
                            >
                                Get started
                                <ArrowRight size={17} />
                            </button>

                            <button
                                onClick={() => {
                                    document
                                        .getElementById('features')
                                        ?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-purple-200 hover:bg-purple-50 text-slate-700 font-semibold transition-all"
                            >
                                Explore JobTrack
                            </button>

                        </div>

                        {/* Small trust row */}
                        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 size={14} className="text-[#10B981]" />
                                Easy to use
                            </span>

                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 size={14} className="text-[#10B981]" />
                                Built for job seekers
                            </span>

                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 size={14} className="text-[#10B981]" />
                                Built for employers
                            </span>
                        </div>
                    </div>


                    {/* Dashboard Preview */}
                    <div className="relative max-w-5xl mx-auto mt-16">

                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-emerald-400/20 blur-3xl" />

                        <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">

                            {/* Fake browser bar */}
                            <div className="h-11 px-4 flex items-center gap-2 border-b border-slate-100 bg-slate-50">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                                <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
                            </div>

                            <div className="p-5 sm:p-8">

                                <div className="flex items-center justify-between mb-7">
                                    <div>
                                        <p className="text-xs text-slate-400">Dashboard</p>
                                        <h3 className="text-xl font-bold mt-1">
                                            Good morning!
                                        </h3>
                                    </div>

                                    <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 text-[#7C3AED] text-xs font-semibold">
                                        <TrendingUp size={14} />
                                        Job search overview
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

                                    <PreviewStat
                                        label="Applications"
                                        value="24"
                                        icon={BriefcaseBusiness}
                                        color="purple"
                                    />

                                    <PreviewStat
                                        label="Interviews"
                                        value="8"
                                        icon={Target}
                                        color="blue"
                                    />

                                    <PreviewStat
                                        label="Offers"
                                        value="3"
                                        icon={TrendingUp}
                                        color="green"
                                    />

                                    <PreviewStat
                                        label="Response Rate"
                                        value="42%"
                                        icon={Sparkles}
                                        color="orange"
                                    />

                                </div>

                                {/* Progress */}
                                <div className="mt-5 grid lg:grid-cols-3 gap-4">

                                    <div className="lg:col-span-2 border border-slate-100 rounded-xl p-5">
                                        <div className="flex items-center justify-between mb-5">
                                            <span className="text-sm font-bold">
                                                Application progress
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                This month
                                            </span>
                                        </div>

                                        <div className="space-y-4">
                                            <PreviewProgress label="Applied" value="24" width="85%" />
                                            <PreviewProgress label="Interview" value="8" width="55%" />
                                            <PreviewProgress label="Offer" value="3" width="30%" />
                                        </div>
                                    </div>

                                    <div className="border border-slate-100 rounded-xl p-5">
                                        <span className="text-sm font-bold">
                                            Recent activity
                                        </span>

                                        <div className="mt-5 space-y-4">
                                            <Activity text="Application submitted" company="Acgen Tech" />
                                            <Activity text="Interview scheduled" company="Digiflex Studio" />
                                            <Activity text="Application updated" company="VinaTech Global" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            {/* =====================================================
          FEATURES
      ===================================================== */}
            <section id="features" className="py-20 sm:py-28 bg-white">

                <div className="max-w-7xl mx-auto px-5 sm:px-8">

                    <div className="max-w-2xl mb-12">
                        <p className="text-sm font-bold uppercase tracking-wider text-[#7C3AED]">
                            Everything in one place
                        </p>

                        <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
                            Stop managing your career from scattered notes.
                        </h2>

                        <p className="mt-4 text-slate-600 leading-relaxed">
                            JobTrack gives you the tools to organize your applications,
                            discover opportunities, and keep track of your progress.
                        </p>
                    </div>


                    <div className="grid md:grid-cols-3 gap-5">

                        <FeatureCard
                            icon={LayoutDashboard}
                            title="One clear dashboard"
                            description="See your applications, interviews, offers and progress without digging through spreadsheets."
                            purple
                        />

                        <FeatureCard
                            icon={KanbanSquare}
                            title="Visual pipeline"
                            description="Move applications through your hiring journey and always know what needs your attention."
                            green
                        />

                        <FeatureCard
                            icon={Search}
                            title="Discover opportunities"
                            description="Explore jobs posted by employers and find opportunities that match what you're looking for."
                            purple
                        />

                    </div>
                </div>
            </section>


            {/* =====================================================
          TWO ROLES
      ===================================================== */}
            <section id="roles" className="py-20 sm:py-28 bg-[#F8F8FC]">

                <div className="max-w-7xl mx-auto px-5 sm:px-8">

                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <p className="text-sm font-bold uppercase tracking-wider text-[#10B981]">
                            One platform
                        </p>

                        <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
                            Built for both sides of the job market.
                        </h2>
                    </div>


                    <div className="grid lg:grid-cols-2 gap-6">

                        {/* Job Seeker */}
                        <div className="relative overflow-hidden bg-white rounded-3xl border border-purple-100 p-7 sm:p-9 shadow-sm">

                            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-purple-100/70 blur-2xl" />

                            <div className="relative">

                                <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-[#7C3AED]">
                                    <Search size={23} />
                                </div>

                                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                                    For job seekers
                                </p>

                                <h3 className="mt-2 text-2xl font-black">
                                    Take control of your job search.
                                </h3>

                                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                                    Keep every application organized, follow your progress,
                                    discover new opportunities and never lose track of where
                                    you applied.
                                </p>

                                <div className="mt-7 space-y-3">
                                    <CheckItem text="Track applications and their status" />
                                    <CheckItem text="Manage your personal pipeline" />
                                    <CheckItem text="Discover available opportunities" />
                                </div>

                                <button
                                    onClick={goToRegister}
                                    className="mt-8 flex items-center gap-2 text-sm font-bold text-[#7C3AED] hover:gap-3 transition-all"
                                >
                                    Start as a Job Seeker
                                    <ArrowRight size={16} />
                                </button>

                            </div>
                        </div>


                        {/* Employer */}
                        <div className="relative overflow-hidden bg-[#172033] rounded-3xl p-7 sm:p-9 text-white shadow-xl">

                            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-emerald-400/10 blur-2xl" />

                            <div className="relative">

                                <div className="w-12 h-12 rounded-2xl bg-emerald-400/15 flex items-center justify-center text-[#10B981]">
                                    <Users size={23} />
                                </div>

                                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#10B981]">
                                    For employers
                                </p>

                                <h3 className="mt-2 text-2xl font-black">
                                    Make hiring easier to manage.
                                </h3>

                                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                                    Post opportunities, manage applicants and move candidates
                                    through your hiring pipeline from one organized workspace.
                                </p>

                                <div className="mt-7 space-y-3">
                                    <DarkCheckItem text="Create and manage job postings" />
                                    <DarkCheckItem text="Review and organize applicants" />
                                    <DarkCheckItem text="Track candidates through your pipeline" />
                                </div>

                                <button
                                    onClick={goToRegister}
                                    className="mt-8 flex items-center gap-2 text-sm font-bold text-[#10B981] hover:gap-3 transition-all"
                                >
                                    Start Hiring
                                    <ArrowRight size={16} />
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
            <section id="how-it-works" className="py-20 sm:py-28 bg-white">

                <div className="max-w-6xl mx-auto px-5 sm:px-8">

                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-sm font-bold uppercase tracking-wider text-[#7C3AED]">
                            Simple by design
                        </p>

                        <h2 className="mt-3 text-3xl sm:text-4xl font-black">
                            Get started in three steps.
                        </h2>
                    </div>


                    <div className="grid md:grid-cols-3 gap-8 mt-14">

                        <Step
                            number="01"
                            icon={Users}
                            title="Create your account"
                            description="Choose whether you're here to find opportunities or hire great people."
                        />

                        <Step
                            number="02"
                            icon={BriefcaseBusiness}
                            title="Start using JobTrack"
                            description="Track applications and discover jobs, or create your first job posting."
                        />

                        <Step
                            number="03"
                            icon={TrendingUp}
                            title="Keep moving forward"
                            description="Use your pipeline to stay organized and make better decisions."
                        />

                    </div>
                </div>
            </section>


            {/* =====================================================
          CTA
      ===================================================== */}
            <section className="px-5 sm:px-8 pb-20 sm:pb-28">

                <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#059669] px-7 sm:px-14 py-16 sm:py-20 text-center text-white">

                    <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-32 -right-32 w-72 h-72 rounded-full bg-emerald-300/20 blur-3xl" />

                    <div className="relative">

                        <ShieldCheck size={30} className="mx-auto mb-5 text-emerald-200" />

                        <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
                            Ready to move your career forward?
                        </h2>

                        <p className="mt-5 max-w-xl mx-auto text-sm sm:text-base text-purple-100 leading-relaxed">
                            Create your JobTrack account and bring your job search or
                            hiring process into one organized workspace.
                        </p>

                        <button
                            onClick={goToRegister}
                            className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#7C3AED] font-bold hover:bg-slate-50 transition-all shadow-xl"
                        >
                            Get started for free
                            <ArrowRight size={17} />
                        </button>

                    </div>
                </div>
            </section>


            {/* =====================================================
          FOOTER
      ===================================================== */}
            <footer className="border-t border-slate-200 bg-white">

                <div className="max-w-7xl mx-auto px-5 sm:px-8">

                    {/* Main Footer */}
                    <div className="py-12 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-10">

                        {/* Brand */}
                        <div className="col-span-2 md:col-span-1">

                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#10B981] flex items-center justify-center">
                                    <BriefcaseBusiness
                                        size={18}
                                        className="text-white"
                                        strokeWidth={2.2}
                                    />
                                </div>

                                <span className="text-lg font-black">
                                    Job<span className="text-[#7C3AED]">Track</span>
                                </span>
                            </div>

                            <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-xs">
                                A smarter way to organize your job search, discover opportunities,
                                and manage your career journey.
                            </p>

                            {/* Social Icons */}
                            <div className="flex items-center gap-2 mt-5">

                                <SocialButton label="in">
                                    in
                                </SocialButton>

                                <SocialButton label="X">
                                    𝕏
                                </SocialButton>

                                <SocialButton label="f">
                                    f
                                </SocialButton>

                            </div>

                        </div>


                        {/* Product */}
                        <div>
                            <h4 className="text-sm font-bold text-text-primary">
                                Product
                            </h4>

                            <div className="mt-4 space-y-3">
                                <FooterLink href="#features">
                                    Features
                                </FooterLink>

                                <FooterLink href="#how-it-works">
                                    How it works
                                </FooterLink>

                                <FooterLink onClick={goToRegister}>
                                    Get started
                                </FooterLink>
                            </div>
                        </div>


                        {/* For */}
                        <div>
                            <h4 className="text-sm font-bold text-text-primary">
                                For you
                            </h4>

                            <div className="mt-4 space-y-3">
                                <FooterLink onClick={goToRegister}>
                                    Job Seekers
                                </FooterLink>

                                <FooterLink onClick={goToRegister}>
                                    Employers
                                </FooterLink>

                                <FooterLink onClick={goToLogin}>
                                    Sign in
                                </FooterLink>
                            </div>
                        </div>


                        {/* Company */}
                        <div>
                            <h4 className="text-sm font-bold text-text-primary">
                                Support
                            </h4>

                            <div className="mt-4 space-y-3">
                                <FooterLink>
                                    Help Center
                                </FooterLink>

                                <FooterLink>
                                    Contact Us
                                </FooterLink>

                                <FooterLink>
                                    Privacy
                                </FooterLink>
                            </div>
                        </div>

                    </div>


                    {/* Bottom */}
                    <div className="border-t border-slate-100 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">

                        <p className="text-xs text-slate-400">
                            © {new Date().getFullYear()} JobTrack. All rights reserved.
                        </p>

                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>Built for better opportunities</span>

                            <span className="w-1 h-1 rounded-full bg-[#10B981]" />

                            <span className="text-[#7C3AED] font-medium">
                                Keep moving forward.
                            </span>
                        </div>

                    </div>

                </div>

            </footer>

        </div>
    );
}


/* =========================================================
   SMALL COMPONENTS
========================================================= */

function FeatureCard({
    icon: Icon,
    title,
    description,
    purple,
}) {
    return (
        <div className="group bg-[#FAFAFC] rounded-2xl border border-slate-200 p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">

            <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${purple
                        ? 'bg-purple-100 text-[#7C3AED]'
                        : 'bg-emerald-100 text-[#059669]'
                    }`}
            >
                <Icon size={20} />
            </div>

            <h3 className="mt-5 font-bold text-lg">
                {title}
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {description}
            </p>

        </div>
    );
}


function CheckItem({ text }) {
    return (
        <div className="flex items-center gap-2.5 text-sm text-slate-700">
            <CheckCircle2
                size={17}
                className="text-[#7C3AED] flex-shrink-0"
            />
            {text}
        </div>
    );
}


function DarkCheckItem({ text }) {
    return (
        <div className="flex items-center gap-2.5 text-sm text-slate-200">
            <CheckCircle2
                size={17}
                className="text-[#10B981] flex-shrink-0"
            />
            {text}
        </div>
    );
}


function Step({
    number,
    icon: Icon,
    title,
    description,
}) {
    return (
        <div className="relative text-center">

            <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-100 text-[#7C3AED] flex items-center justify-center">
                <Icon size={21} />
            </div>

            <span className="block mt-5 text-xs font-bold text-[#10B981] tracking-wider">
                {number}
            </span>

            <h3 className="mt-2 font-bold text-lg">
                {title}
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {description}
            </p>

        </div>
    );
}


function PreviewStat({
    label,
    value,
    icon: Icon,
    color,
}) {
    const styles = {
        purple: 'bg-purple-50 text-[#7C3AED]',
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-emerald-50 text-emerald-600',
        orange: 'bg-orange-50 text-orange-600',
    };

    return (
        <div className="rounded-xl border border-slate-100 p-4">

            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${styles[color]}`}>
                <Icon size={15} />
            </div>

            <p className="mt-3 text-xs text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-xl font-black">
                {value}
            </p>

        </div>
    );
}


function PreviewProgress({
    label,
    value,
    width,
}) {
    return (
        <div>

            <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium">{label}</span>
                <span className="text-slate-400">{value}</span>
            </div>

            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#10B981]"
                    style={{ width }}
                />
            </div>

        </div>
    );
}


function Activity({
    text,
    company,
}) {
    return (
        <div className="flex gap-3">

            <div className="w-7 h-7 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={13} />
            </div>

            <div>
                <p className="text-xs font-semibold">
                    {text}
                </p>

                <p className="text-[11px] text-slate-400 mt-0.5">
                    {company}
                </p>
            </div>

        </div>
    );
}