import './Startscreen.css'

function Startscreen() {
  return (
    <>
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