import Contact from "./contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Green Energy",
  description: "Contact us for more information about our services and products.",
};

export default function ContactPage() {
  return <Contact />;
}