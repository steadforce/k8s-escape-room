import { AddonRoutes } from '../AddonLoader'
import './AddOns.css';
import { useNavigate } from 'react-router-dom';

function AddOns() {
    const navigate = useNavigate();

    return (
        <nav>
            <ul>
                {AddonRoutes.map(({ name, path }) => (
                    <li key={path}>
                        <button className="addOn" onClick={() => navigate(path)}>{name} &#10140;</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default AddOns