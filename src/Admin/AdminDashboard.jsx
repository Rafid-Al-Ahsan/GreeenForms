const Sidebar = () => {
  
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Top Bar */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Home</h1>
                    <p className="text-sm text-gray-600">Home &gt; Dashboard</p>
                </div>

                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 rounded-lg bg-white shadow-sm focus:outline-none"
                    />
                    <button className="p-2 bg-gray-200 rounded-full">
                        <span className="sr-only">Search Shortcut</span>
                        <kbd>Ctrl+K</kbd>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold">Daily Profit</h2>
                    <p className="text-2xl font-bold">$249.95</p>
                    <p className="text-sm text-gray-500">You made an extra 35,000 this daily</p>
                </div>

                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold">Monthly Profit</h2>
                    <p className="text-2xl font-bold">$249.95</p>
                    <p className="text-sm text-gray-500">You made an extra 35,000 this monthly</p>
                </div>

                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold">Yearly Profit</h2>
                    <p className="text-2xl font-bold">$249.95</p>
                    <p className="text-sm text-gray-500">You made an extra 35,000 this yearly</p>
                </div>
            </div>

            
        </div>
    );
};

export default Sidebar;
