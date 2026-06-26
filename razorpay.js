// =============================================
// RAZORPAY PAYMENT INTEGRATION
// =============================================
// Replace with your LIVE Razorpay Key ID
const RAZORPAY_KEY = 'rzp_live_T6FcPfo1mS01du';

async function processDonation(amount, project) {
  if (typeof Razorpay === 'undefined') {
    await loadRazorpayScript();
  }

  const amountPaise = Number(amount) * 100;

  const donateBtn = document.querySelector('.donate-cta');
  if (donateBtn) {
    donateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Please wait...';
    donateBtn.disabled = true;
  }

  const options = {
    key: RAZORPAY_KEY,
    amount: amountPaise,
    currency: 'INR',
    name: 'MANN CARE FOUNDATION',
    description: `Donation${project ? ' for ' + project : ''}`,
    image: 'logo.jpeg',
    handler: function (response) {
      const params = new URLSearchParams({
        amount: amount.toString(),
        project: project || 'General',
        payment_id: response.razorpay_payment_id
      });
      window.location.href = 'payment-success.html?' + params.toString();
    },
    prefill: {
      name: '',
      email: '',
      contact: ''
    },
    notes: {
      project: project || 'General'
    },
    theme: {
      color: '#973247'
    },
    modal: {
      ondismiss: function () {
        const btn = document.querySelector('.donate-cta');
        if (btn) {
          btn.innerHTML = '<i class="fas fa-heart"></i> Donate Now';
          btn.disabled = false;
        }
      }
    }
  };

  const rzp = new Razorpay(options);
  rzp.on('payment.failed', function (response) {
    alert('Payment failed: ' + (response.error?.description || 'Please try again.'));
    const btn = document.querySelector('.donate-cta');
    if (btn) {
      btn.innerHTML = '<i class="fas fa-heart"></i> Donate Now';
      btn.disabled = false;
    }
  });
  rzp.open();
}

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (typeof Razorpay !== 'undefined') {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = resolve;
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
    document.head.appendChild(script);
  });
}
