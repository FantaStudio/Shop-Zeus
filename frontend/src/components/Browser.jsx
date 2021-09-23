import React from "react";

const styleLink = {
  marginBottom: "1rem",
};

const Browser = () => (
  <>
    <h1 style={{ textAlign: "center" }}>Browser is not supported</h1>

    <p style={{ textAlign: "center" }}>
      For security reasons, we highly recommend installing the latest browser.
    </p>

    <div
      style={{
        marginTop: "2rem",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
      }}
    >
      <ul>
        <li style={styleLink}>
          <a href="https://www.google.com/intl/en/chrome/">Download Chrome</a>
        </li>

        <li style={styleLink}>
          <a href="https://www.mozilla.org/firefox/new/">
            Download Mozilla Firefox
          </a>
        </li>

        <li style={styleLink}>
          <a href="https://www.opera.com/">Download Opera</a>
        </li>

        <li style={styleLink}>
          <a href="https://www.microsoft.com/en-us/windows/microsoft-edge">
            Download Microsoft Edge
          </a>
        </li>

        <li style={styleLink}>
          <a href="https://browser.yandex.ru">Download Yandex Browser</a>
        </li>

        <li style={styleLink}>
          <a href="https://support.apple.com/en-gb/HT204416">Download Safari</a>
        </li>
      </ul>
    </div>
  </>
);

export default Browser;
