import { LinkButton, PageTitle, Panel } from "@/components/admin/bits";
import { NewBookingForm } from "@/components/admin/new-booking-form";
import { panelUser } from "@/lib/server/auth";

export const metadata = { title: "Add booking" };

export default async function NewBookingPage() {
  await panelUser("bookings.create");
  return (
    <>
      <PageTitle
        title="Add a booking"
        sub="For bookings that came in by phone or WhatsApp."
        actions={<LinkButton href="/admin/bookings" tone="outline">← Bookings</LinkButton>}
      />
      <Panel className="max-w-2xl">
        <NewBookingForm />
      </Panel>
    </>
  );
}
