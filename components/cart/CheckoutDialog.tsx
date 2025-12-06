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
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-white z-60 p-5 rounded-t-2xl shadow-lg">
        <h2 className="text-lg font-bold mb-3">
          Delivery Details
        </h2>

        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 rounded w-full text-sm mb-2"
          value={customerName}
          onChange={(e) => onChangeName(e.target.value)}
        />

        <textarea
          placeholder="Delivery Address / Landmark"
          className="border p-2 rounded w-full text-sm mb-2"
          rows={2}
          value={address}
          onChange={(e) => onChangeAddress(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full text-sm mb-4"
          value={paymentMode}
          onChange={(e) => onChangePaymentMode(e.target.value)}
        >
          <option>Cash</option>
          <option>UPI</option>
        </select>

        <button
          onClick={onConfirm}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold"
        >
          Confirm & Send WhatsApp 📲
        </button>
      </div>
    </>
  );
}
