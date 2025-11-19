export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Perplexity Clone</h1>
      <a
        href="/chat"
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Go to Chat
      </a>
    </div>
  );
}
