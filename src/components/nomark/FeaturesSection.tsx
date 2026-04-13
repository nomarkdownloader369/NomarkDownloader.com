import { Zap, Shield, Smartphone, Cloud, Infinity, Globe } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      desc: "Download your videos in seconds with our optimized high-speed servers.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: Shield,
      title: "100% Safe & Private",
      desc: "We never store your videos or personal data. Your privacy is fully protected.",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: Smartphone,
      title: "Works on All Devices",
      desc: "Compatible with Android, iPhone, Windows, Mac, and all modern browsers.",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: Cloud,
      title: "No App Required",
      desc: "Use directly in your browser. No downloads, no installation, no signup.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Infinity,
      title: "Unlimited Downloads",
      desc: "Download as many videos as you want without restrictions or hidden limits.",
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      icon: Globe,
      title: "Worldwide Access",
      desc: "Available globally with fast servers ensuring smooth performance everywhere.",
      gradient: "from-teal-400 to-cyan-500"
    }
  ];

  return (
    <section id="features" className="relative px-4 py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl">

        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
            Why Choose NoMark
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Powerful Video Downloader Built for Speed
          </h2>

          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Download TikTok videos in HD without watermark — fast, secure, and unlimited
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="group rounded-2xl border border-border bg-secondary/30 p-6 hover:border-primary/30 transition-all">

              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5`}>
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background">
                  <feature.icon className="h-6 w-6 text-foreground" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {feature.desc}
              </p>

            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Trusted by thousands of users worldwide
          </p>

          <div className="flex justify-center gap-8 opacity-70">
            <span className="font-semibold">TikTok</span>
            <span className="font-semibold">Instagram</span>
            <span className="font-semibold">Reels</span>
            <span className="font-semibold">IGTV</span>
          </div>
        </div>

      </div>
    </section>
  );
                                                                                                                     }
