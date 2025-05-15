import background from '/background.jpg'
import banner from '/banner.png'
import './App.css'

function App() {

  return (
    <>
      <img src={background} className="background" alt="Background" />
      <img src={banner} className="banner" alt="Banner" />
      <div className="room">
            <h1>Kubernetes Escape Room Game</h1>
            <img id="banner" className="banner" src="/game/banner.png" />
            <div id="catContainer" className="catContainer">
                <img id="cat" className="cat" />
            </div>
            <div className="orb">
                <img id="orb" src="/game/orb.png" />
                <img id="orbWisdom" className="orbWisdom" />
            </div>
            <img
                id="orbHint"
                className="orbHint"
                src="/game/redcircle.png"
                hidden
                title="The magic orb does not work!"
            />
            <img id="photoFrame" className="photoFrame" />
            <img
                id="photoHint"
                className="photoHint"
                src="/game/redcircle.png"
                hidden
                title="The magic frame can't find any photos!"
            />
            <img id="tome" className="tome" />
            <img
                id="tomeHint"
                className="tomeHint"
                src="/game/redcircle.png"
                hidden
                title="The key to open the tome seems to be missing."
            />
            <div id="addons" className="addons"></div>
        </div>
        <div className="progress" id="progress"></div>
        <div className="timer" id="timer"></div>
        <div className="screen" id="endscreen">
            <h1>
                Congratulations <span>&#127881;</span><span>&#127881;</span
                ><span>&#127881;</span>
            </h1>
            <h2>You finished the Kubernetes Escape Room Game</h2>
            <p className="comment">You took <em id="timeTaken"></em>. Great job!</p>
            <h2>Highscores</h2>
            <table className="highscoreTable" id="highscoreTable">
                <thead>
                    <tr>
                        <th>Wizard</th>
                        <th>Time needed</th>
                    </tr>
                </thead>
                <tbody id="highscoreTableBody">
                </tbody>
            </table>
            <p className="comment" id="resetInstruction">Reset the game by running the <em>. init.sh</em> script before starting a new game.</p>
            <br />
            <button className="screenbutton">
                New Game <span>&emsp;</span><span>&#10140;</span>
            </button>
        </div>
        <div className="screen" id="startscreen">
            <h1>Welcome to the Kubernetes Escape Room Game</h1>
            <p className="intro">
                You are a wizard apprentice. While your teacher is out of house you
                decided to sneak into his study to practice some spells. Maybe try out
                some magic artifacts you find there. But while reciting an incantation
                you found in a hidden tome something went horribly wrong. Important
                things are missing or not working anymore. It is now on you to fix what
                has been broken.
                <br />
                <br />
                <i>
                    Broken parts in the study are marked with a red circle. Hovering there
                    with your cursor gives you a hint for what you might be looking for.
                </i>
            </p>
            <h2>Good luck, have fun</h2>
        </div>
    </>
  )
}

export default App
