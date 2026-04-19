export default function NotFound() {
  return (
    <main
      style={{
        alignItems: "center",
        color: "#f4f7fb",
        display: "flex",
        fontFamily: "system-ui, sans-serif",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ marginBottom: 8 }}>404</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", margin: 0 }}>
          This XPhantom route could not be found.
        </p>
      </div>
    </main>
  );
}
