import { NavigationMenu } from '@radix-ui/react-navigation-menu';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
    return (
        <div className="flex h-screen flex-col">
            {/* Top Navbar */}
            <header className="border-b p-4">Admin Panel</header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <nav className="w-64 border-r p-4">
                    <NavigationMenu>
                        {/* Put nav links here */}
                    </NavigationMenu>
                </nav>

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
