import logoImagem from '../../image/github-mark-white.png';
import githubText from '../../image/GitHub_Logo_White.png';
import './style.css';

function Header() {
    return (
        <div className="header">
            <img src={logoImagem} alt="Logo github" />
            <h1>Perfil</h1>
            <img src={githubText} alt="Logo github" />
        </div>
    );
}

export default Header;