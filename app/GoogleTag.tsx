import Script from "next/script";

const GoogleTag = () => {
  const gaMeasurementId = process.env.GA_MEASUREMENT_ID;
  if (!gaMeasurementId) {
    throw new Error("Missing GA_MEASUREMENT_ID");
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date()); 

          gtag('config', '${gaMeasurementId}');`}
      </Script>
    </>
  );
};

export default GoogleTag;
