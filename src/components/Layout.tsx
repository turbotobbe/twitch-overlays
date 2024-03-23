import { FC, ReactNode } from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';
import { github } from '../links';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="body">
            <aside className="sidebar">
                <header>
                    <div className='title'>
                        <Link to="/">{github.repo.name}</Link>
                    </div>
                    <hr />
                </header>
                <div className='subtitle'>Links</div>
                {/* Add more sidebar elements here */}
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/page2">Page 2</Link>
                    </li>
                    <li>
                        <Link to="/github">GitHub</Link>
                    </li>
                </ul>
                <footer>
                    <hr />
                    <div>Version: {__APP_VERSION__}</div>

                    <div>
                        <a href={github.owner.url} target="_blank" rel="noopener noreferrer" className="external">{github.owner.name}</a>
                    </div>

                    <div>
                        <a href={github.repo.url} target="_blank" rel="noopener noreferrer" className="external">{github.repo.name}</a>
                    </div>

                    <div>© 2024 {import.meta.env.VITE_REPO_OWNER}</div>
                </footer>
            </aside>
            <div className="main-content">
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Layout;