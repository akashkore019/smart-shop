"use client";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Alandi",
    rating: 5,
    text: "Best kirana store in the area! Fresh products and quick delivery.",
    avatar: "👩"
  },
  {
    name: "Rajesh Patil",
    location: "Pune",
    rating: 5,
    text: "Love the WhatsApp ordering system. So convenient and easy to use!",
    avatar: "👨"
  },
  {
    name: "Sneha Desai",
    location: "Alandi",
    rating: 5,
    text: "Great prices and excellent service. Highly recommended!",
    avatar: "👩‍🦱"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">💬</span>
        What Our Customers Say
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center text-2xl">
                {testimonial.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-sm">
                  {testimonial.name}
                </h3>
                <p className="text-xs text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            
            <div className="flex gap-1 mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">⭐</span>
              ))}
            </div>
            
            <p className="text-sm text-gray-600 italic">
              "{testimonial.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
