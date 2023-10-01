import PolicyCard from "@/components/Cards/PolicyCard/PolicyCard";
import React from "react";
import Head from 'next/head';


export default function ContactUs() {
  return (

    <PolicyCard smallContent={true}>
       <Head>
        <title>Contact - Gamesmoke shop</title>
      </Head>
      <h1>Contact Us</h1>
      <p>Drop Us A Line</p>
      <p>
        For any questions regarding our product or for assistance with your
        order, please email us at support@petboutique.co and you should get a
        response within one business day. If you are emailing about your order,
        please make sure to include the order number or the email address used
        at the checkout in your message. Thank you!
      </p>
    </PolicyCard>
  );
}
