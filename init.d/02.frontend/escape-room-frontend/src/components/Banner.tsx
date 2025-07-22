import banner from '../assets/banner.png'
import qrcode from '../assets/qrcode.svg'
import githubLogo from '../assets/github-logo.svg'
import './Banner.css'

function Banner() {
    return (
        <>
            <div className="banner">
                    <img className="logo" src={banner} />
                <div className="repo">
                    <img className="qrcode" src={qrcode} />
                    <div className="githubLink">
                        <img src={githubLogo} />
                        <span>steadforce <br /><strong>k8s-escape-room</strong></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner;
