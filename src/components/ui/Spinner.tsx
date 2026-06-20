export default function Spinner({ size = 32 }: { size?: number }) {
  return (
    <div
      className="rounded-full border-2 border-gray-200 border-t-gray-800 animate-spin"
      style={{ width: size, height: size }}
    />
  );
}
