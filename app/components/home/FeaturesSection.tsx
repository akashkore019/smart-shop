"use client";

const features = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    description: "Quick delivery to your doorstep within hours"
  },
  {
    icon: "💳",
    title: "Multiple Payments",
    description: "Cash, UPI, Cards - pay your way"
  },
  {
    icon: "✅",
    title: "Quality Products",
    description: "100% authentic & fresh products"
  },
  {
    icon: "💬",
    title: "WhatsApp Order",
    description: "Easy ordering via WhatsApp chat"
  },
  {
    icon: "🎯",
    title: "Best Prices",
    description: "Competitive pricing on all items"
  },
  {
    icon: "🕐",
    title: "Open Daily",
    description: "7 days a week, morning to evening"
  }
];

export default function FeaturesSection() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">✨</span>
        Why Choose Us
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="font-bold text-sm text-gray-800 mb-1">
              {feature.title}
            </h3>
            <p className="text-xs text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
