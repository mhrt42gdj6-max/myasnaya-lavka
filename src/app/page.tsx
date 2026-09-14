import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { ProductsSection } from "@/components/products-section";
import { About } from "@/components/about";
import { DeliverySection } from "@/components/delivery-section";
import { ContactsSection } from "@/components/contacts-section";
import { ReviewsSection } from "@/components/reviews-section";
import { Footer } from "@/components/footer";
import { CartDialog } from "@/components/cart-dialog";

export default function IndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <ProductsSection />
        <About />
        <DeliverySection />
        <ReviewsSection />
        <ContactsSection />
      </main>
      <Footer />
      <CartDialog />
    </div>
  );
}
