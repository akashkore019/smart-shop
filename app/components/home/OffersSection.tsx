"use client";

const offers = [
  {
    icon: "🎉",
    title: "New Customer Offer",
    discount: "10% OFF",
    description: "On your first order above ₹500",
    bgColor: "from-purple-500 to-pink-500"
  },
  {
    icon: "🌟",
    title: "Weekend Special",
    discount: "15% OFF",
    description: "On selected items every weekend",
    bgColor: "from-orange-500 to-red-500"
  },
  {
    icon: "🎁",
    title: "Bulk Orders",
    discount: "20% OFF",
    description: "Save more on orders above ₹2000",
    bgColor: "from-blue-500 to-cyan-500"
  }
];

export default function OffersSection() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">🎊</span>
        Special Offers
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`relative overflow-hidden bg-gradient-to-br ${offer.bgColor} rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}
          >
            <div className="absolute top-0 right-0 text-8xl opacity-10 -translate-y-4 translate-x-4 group-hover:scale-110 transition-transform">
              {offer.icon}
            </div>
            
            <div className="relative z-10">
              <div className="text-3xl mb-2">{offer.icon}</div>
              <h3 className="font-bold text-white text-lg mb-1">
                {offer.title}
              </h3>
              <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg inline-block font-bold text-xl mb-2">
                {offer.discount}
              </div>
              <p className="text-white/90 text-sm">
                {offer.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
