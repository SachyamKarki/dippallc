export const metadata = {
  title: "Careers",
  description: "Current openings at Dippa.",
};

export default function CareersPage() {
  return (
    <main className="careers-page" data-nav-tone="light">
      <section className="careers-openings">
        <div className="section-shell careers-openings-shell">
          <h1 className="careers-openings-title">Current openings</h1>
          <p className="careers-openings-empty">No openings at the moment.</p>
        </div>
      </section>
    </main>
  );
}
