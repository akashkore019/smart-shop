"use client";

type Props = {
  open: boolean;
  customerName: string;
  address: string;
  paymentMode: string;
  onChangeName: (value: string) => void;
  onChangeAddress: (value: string) => void;
  onChangePaymentMode: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export default function CheckoutDialog({
  open,
  customerName,
  address,
  paymentMode,
  onChangeName,
  onChangeAddress,
  onChangePaymentMode,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-white z-50 p-6 rounded-t-3xl shadow-2xl max-w-2xl mx-auto animate-slideIn">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            📦 Delivery Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              👤 Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="border-2 border-emerald-200 p-3 rounded-xl w-full text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              value={customerName}
              onChange={(e) => onChangeName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              📍 Delivery Address
            </label>
            <textarea
              placeholder="House No., Street, Landmark..."
              className="border-2 border-emerald-200 p-3 rounded-xl w-full text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
              rows={3}
              value={address}
              onChange={(e) => onChangeAddress(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              💳 Payment Mode
            </label>
            <select
              className="border-2 border-emerald-200 p-3 rounded-xl w-full text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
              value={paymentMode}
              onChange={(e) => onChangePaymentMode(e.target.value)}
            >
              <option>💵 Cash on Delivery</option>
              <option>📱 UPI Payment</option>
              <option>💳 Card Payment</option>
            </select>
          </div>

          <button
            onClick={onConfirm}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 rounded-xl font-bold text-base hover:shadow-lg transition-all mt-4 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>✔️ Confirm & Send WhatsApp</span>
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-3">
          🔒 Your information is secure and sent via WhatsApp
        </p>
      </div>
    </>
  );
}
