import Services from "./services";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services - Green Energy",
    description: "Explore the range of green energy services we offer.",
};

export default function ServicesPage() {
    return <Services />;
}
