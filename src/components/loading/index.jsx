export default function Loading() {
    return (
        <div className="flex justify-center items-center h-[90vh] w-full bg-slate-200">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-slate-500 rounded-full text-blue-600"></div>
            <span className="ml-2">Loading</span>
        </div>
    );
}
