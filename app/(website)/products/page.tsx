
import { Metadata } from "next";
import Products from "./products";

export const metadata: Metadata = {
    title: "About Us - Green Energy",
    description: "About us and our services.",
};

export default function AboutPage() {
    return <Products />;
}

