export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#002AB3] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#002AB3] font-semibold text-lg">Loading...</p>
      </div>
    </div>
  );
}
