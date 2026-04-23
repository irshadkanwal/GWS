import React, { useState } from "react";
import { toast } from "sonner";
import Checkout from "@/components/shared/checkout/stripe-checkout";
import Typography from "@/components/ui/typography";

export default function TestPaymentPrevention() {
  const [donationId, setDonationId] = useState("1");
  const [showCheckout, setShowCheckout] = useState(false);

  const handleTestCheckout = () => {
    if (!donationId) {
      toast.error("Please enter a donation ID");
      return;
    }
    setShowCheckout(true);
  };

  const handleTestAPI = async () => {
    try {
      const response = await fetch("/api/test-donation-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donation_id: Number(donationId),
          productName: "Test Donation",
          amount: 50.0,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("API test successful: " + data.message);
      } else {
        if (response.status === 409) {
          toast.info("Duplicate payment detected: " + data.error);
        } else {
          toast.error("API test failed: " + data.error);
        }
      }
    } catch (error: any) {
      toast.error("API test error: " + (error.message || "Unknown error"));
    }
  };

  const handleCheckPayment = async () => {
    try {
      const response = await fetch(
        `/api/test-donation-payment?donation_id=${donationId}`
      );
      const data = await response.json();

      if (response.ok) {
        if (data.hasPayment) {
          toast.info(
            `Donation ${donationId} has payment: ${data.paymentDetail.id}`
          );
        } else {
          toast.info(`Donation ${donationId} has no payment`);
        }
      } else {
        toast.error("Check payment failed: " + data.error);
      }
    } catch (error: any) {
      toast.error("Check payment error: " + (error.message || "Unknown error"));
    }
  };

  const handleClearPayment = async () => {
    try {
      const response = await fetch("/api/test-clear-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donation_id: Number(donationId),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Payment data cleared successfully");
        // Force refresh the checkout if it's showing
        if (showCheckout) {
          setShowCheckout(false);
          setTimeout(() => setShowCheckout(true), 100);
        }
      } else {
        if (response.status === 404) {
          toast.info("No payment found to clear");
        } else {
          toast.error("Clear payment failed: " + data.error);
        }
      }
    } catch (error: any) {
      toast.error("Clear payment error: " + (error.message || "Unknown error"));
    }
  };

  const handleCheckPaymentStatus = async () => {
    try {
      const response = await fetch(
        `/api/test-clear-payment?donation_id=${donationId}`
      );
      const data = await response.json();

      if (response.ok) {
        if (data.hasPayment) {
          toast.info(
            `Donation ${donationId} has payment: ${data.paymentData.id}`
          );
        } else {
          toast.info(`Donation ${donationId} has no payment`);
        }
      } else {
        toast.error("Check payment status failed: " + data.error);
      }
    } catch (error: any) {
      toast.error(
        "Check payment status error: " + (error.message || "Unknown error")
      );
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Typography size="2xl" className="font-bold mb-6">
        Payment Prevention Test
      </Typography>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <Typography size="lg" className="font-semibold mb-4">
          Test Controls
        </Typography>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Donation ID:
            </label>
            <input
              type="number"
              value={donationId}
              onChange={(e) => setDonationId(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              placeholder="Enter donation ID"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={handleTestAPI}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Test API Check
            </button>

            <button
              onClick={handleCheckPayment}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Check Payment
            </button>

            <button
              onClick={handleCheckPaymentStatus}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              Check Status
            </button>

            <button
              onClick={handleClearPayment}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Clear Payment
            </button>
          </div>

          <div className="pt-4">
            <button
              onClick={handleTestCheckout}
              className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 font-semibold"
            >
              {showCheckout ? "Hide" : "Show"} Stripe Checkout
            </button>
          </div>
        </div>
      </div>

      {showCheckout && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <Typography size="lg" className="font-semibold mb-4">
            Stripe Checkout Test
          </Typography>

          <Checkout
            productDetails={{
              productName: "Test Donation",
              price: 50.0,
              donation_id: Number(donationId),
            }}
          />
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <Typography size="sm" className="font-semibold mb-2">
          Instructions:
        </Typography>
        <ul className="text-sm space-y-1">
          <li>
            • Enter a donation ID that already has a payment to test duplicate
            prevention
          </li>
          <li>• Use "Test API Check" to simulate checkout session creation</li>
          <li>• Use "Check Payment" to see if a donation has been paid</li>
          <li>• Use "Check Status" to verify payment data in database</li>
          <li>• Use "Clear Payment" to delete payment data for testing</li>
          <li>
            • Use "Show Stripe Checkout" to see the actual Stripe checkout form
          </li>
          <li>
            • If a donation already has a payment, you'll see an info message
            (not error)
          </li>
          <li>
            • After clearing payment data, use "Refresh" button to retry
            checkout
          </li>
        </ul>
      </div>
    </div>
  );
}
