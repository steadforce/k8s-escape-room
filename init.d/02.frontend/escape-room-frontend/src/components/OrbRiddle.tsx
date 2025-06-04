function OrbRiddle() {
    return (
        <>
            <div className="orb">
                <img id="orb" src="/orb.png" />
                <img id="orbWisdom" className="orbWisdom" />
            </div>
            <img
                id="orbHint"
                className="orbHint"
                src="/redcircle.png"
                title="The magic orb does not work!"
            />
        </>
    )
}

export default OrbRiddle