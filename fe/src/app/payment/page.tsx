"use client";

import { useState } from "react";

// ประกาศ type ของ Omise
declare const Omise: any;

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const cardData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      number: (form.elements.namedItem("number") as HTMLInputElement).value,
      expiration_month: (form.elements.namedItem("month") as HTMLInputElement)
        .value,
      expiration_year: (form.elements.namedItem("year") as HTMLInputElement)
        .value,
      security_code: (form.elements.namedItem("cvv") as HTMLInputElement).value,
    };

    Omise.setPublicKey(process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY);

    Omise.createToken(
      "card",
      cardData,
      async (statusCode: number, response: any) => {
        if (statusCode === 200) {
          try {
            const res = await fetch("http://localhost:3001/payment/charge", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: response.id, amount: 100 }),
            });

            const data = await res.json();
            setResult({ ...data, success: data.status === "successful" });
          } catch (error) {
            setResult({ success: false, error: "เกิดข้อผิดพลาด" });
          }
        } else {
          setResult({ success: false, error: response.message });
        }
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          ทดสอบชำระเงิน Omise
        </h1>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p>
            <strong>Test Card:</strong>
          </p>
          <p>บัตร: 4242424242424242 | วันหมดอายุ: 01/26 | CVV: 123</p>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">ชื่อบนบัตร:</label>
            <input
              name="name"
              defaultValue="John Doe"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">เลขบัตร:</label>
            <input
              name="number"
              defaultValue="4242424242424242"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block mb-1 font-medium">เดือน:</label>
              <input
                name="month"
                defaultValue="01"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">ปี:</label>
              <input
                name="year"
                defaultValue="2026"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">CVV:</label>
              <input
                name="cvv"
                defaultValue="123"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "กำลังประมวลผล..." : "ชำระเงิน 100 บาท"}
          </button>
        </form>

        {result && (
          <div
            className={`mt-6 p-4 rounded ${
              result.success
                ? "bg-green-100 border border-green-400"
                : "bg-red-100 border border-red-400"
            }`}
          >
            <strong>{result.success ? "✅ สำเร็จ" : "❌ ล้มเหลว"}</strong>
            <pre className="text-xs mt-2">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
