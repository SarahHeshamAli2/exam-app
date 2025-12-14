import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <Spinner className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          Loading...
        </h2>
        <p className="text-gray-600">Please wait a moment</p>
      </div>
    </div>
  );
}
