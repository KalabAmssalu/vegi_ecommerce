import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { email, name, amount, tx_ref } = useSelector((state) => state.success);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full text-center space-y-6">
          {/* Animated Checkmark */}
          <div className="flex justify-center">
            <svg
              className="w-24 h-24 text-green-500 animate-checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="animate-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className="animate-check"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your payment has been processed
              successfully.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 p-6 rounded-lg text-left space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="text-gray-900 font-medium">{tx_ref}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="text-gray-900 font-medium">{amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="text-gray-900 font-medium">Chapa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-900 font-medium">{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="text-gray-900 font-medium">{name}</span>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={() => navigate("/product")}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Continue Shopping
          </button>

          {/* Additional Info */}
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PaymentSuccess;
