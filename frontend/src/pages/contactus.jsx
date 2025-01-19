import React from "react";

function ContactUs() {
  return (
    <div
      style={{
              width: "917.6px",
          height: "882px",
        margin: "0 auto",
        fontFamily: "Space Grotesk, Noto Sans, sans-serif", // Applied custom font
        color: "#ffffff",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "24px" }}>Contact us</h1>
      <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* First Name and Last Name Fields */}
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="firstName"
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              First name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="First name"
              style={{
                width: "100%",
                height: "60px",
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "#2a2a2a",
                color: "#ffffff",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="lastName"
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Last name"
              style={{
                width: "100%",
                height: "60px",
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "#2a2a2a",
                color: "#ffffff",
                fontSize: "14px",
              }}
            />
          </div>
        </div>

        {/* Email Address Field */}
        <div>
          <label
            htmlFor="email"
            style={{ display: "block", fontSize: "14px", marginBottom: "8px" }}
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            style={{
              width: "100%",
              height: "60px",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#2a2a2a",
              color: "#ffffff",
              fontSize: "14px",
            }}
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label
            htmlFor="phone"
            style={{ display: "block", fontSize: "14px", marginBottom: "8px" }}
          >
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Phone number"
            style={{
              width: "100%",
              height: "60px",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#2a2a2a",
              color: "#ffffff",
              fontSize: "14px",
            }}
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            style={{ display: "block", fontSize: "14px", marginBottom: "8px" }}
          >
            How can we help?
          </label>
          <textarea
            id="message"
            placeholder="Please provide detailed information about your inquiry. Include any relevant URLs, error messages, or other context that will help us understand your situation."
            rows="5"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#2a2a2a",
              color: "#ffffff",
              fontSize: "14px",
            }}
          ></textarea>
        </div>

        {/* Privacy Checkbox */}
        <div>
          <label
            style={{ fontSize: "14px", display: "flex", alignItems: "center" }}
          >
            <input type="checkbox" style={{ marginRight: "8px" }} />
            By submitting this form, you acknowledge that you have read and
            agree to the Deep Defenders Privacy Policy.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            height: "50px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
