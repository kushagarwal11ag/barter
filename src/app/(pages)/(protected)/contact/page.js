"use client";
import React from "react";

import ContactUs from "@/files/ContactUs";
import Navbar from "@/files/Navbar";

const ContactPage = () => {
	return (
		<>
			<Navbar page="contact" />
			<ContactUs />
		</>
	);
};

export default ContactPage;
