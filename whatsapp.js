document.addEventListener("DOMContentLoaded", function () {
    const phoneNumber = "919958707219"; // Replace with your WhatsApp number
  
    // Create WhatsApp Button
    const whatsappButton = document.createElement("a");
    whatsappButton.id = "whatsapp-button";
    whatsappButton.href = "#";
    whatsappButton.target = "_blank";
    whatsappButton.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">`;
    document.body.appendChild(whatsappButton);
  
    // Create QR Code Popup
    const qrPopup = document.createElement("div");
    qrPopup.id = "qr-popup";
    qrPopup.innerHTML = `<img id="whatsapp-qr" src="" alt="Scan QR Code" width="150">`;
    document.body.appendChild(qrPopup);
  
    const qrImage = document.getElementById("whatsapp-qr");
  
    function updateWhatsAppLink() {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
      if (isMobile) {
        whatsappButton.href = `https://wa.me/${phoneNumber}`;
      } else {
        whatsappButton.href = "#";
        whatsappButton.addEventListener("click", function (event) {
          event.preventDefault();
          qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/${phoneNumber}`;
          qrPopup.style.display = qrPopup.style.display === "block" ? "none" : "block";
        });
      }
    }
  
    updateWhatsAppLink();
  });
  