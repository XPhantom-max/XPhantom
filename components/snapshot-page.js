export function SnapshotPage({ markup }) {
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: markup }} />;
}
