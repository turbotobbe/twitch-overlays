import { FC, ReactNode } from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';

const repoOwner = import.meta.env.VITE_REPO_OWNER
const repoName = import.meta.env.VITE_REPO_NAME
const repoUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="body">
            <aside className="sidebar">
                <header>
                    <div className='title'>{repoName}</div>
                    <div className='subtitle'>{repoOwner}</div>
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
                        <Link to="/about">About</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href={repoUrl} target="_blank" rel="noopener noreferrer">GitHub <span className="external-indicator">↗</span></a>
                    </li>
                </ul>
                <footer>
                    <hr />
                    <p>© 2024 {repoName}</p>
                </footer>
            </aside>
            <div className="main-content">
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Layout;