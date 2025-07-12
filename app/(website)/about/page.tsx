import About from "./about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Green Energy",
  description: "About us and our services.",
};

export default function AboutPage() {
    return <About />;
}

