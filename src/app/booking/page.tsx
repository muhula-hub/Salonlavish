import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingForm } from "./booking-form";

export const metadata: Metadata = { title: "Book an appointment" };

export default function BookingPage() {
  return (
    <>
      <div className="page-head">
        <div className="container-x">
          <p className="eyebrow">The salon</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">Book an appointment</h1>
          <p className="mt-3 max-w-xl text-muted">Choose your service, stylist and time. Your slot is held once the deposit is paid.</p>
        </div>
      </div>
      <Suspense fallback={<div className="container-x py-24 text-center text-muted">Loading booking...</div>}>
        <BookingForm />
      </Suspense>
    </>
  );
}
