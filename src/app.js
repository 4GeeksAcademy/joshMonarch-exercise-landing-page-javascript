
function getRandom(min, max) {
    return Math.random() * (max - min) + min
}

function resetStyle(toReset, initialStyle) {
    console.log(toReset)
    if (toReset instanceof HTMLCollection) {
        Array.prototype.map.call(
                toReset,
                (element) => element.style = initialStyle
            )
    } else {
        toReset.style = initialStyle
    }
}

function createParticles(maxParticles) {
    let particles = []
    for (let i = 0; i < maxParticles; i++){
        let particle = document.createElement('div')
        particle.className = "particle"
        particle.style.left = `${getRandom(1, window.innerWidth)}px`
        let randSize = getRandom(3, 5)
        particle.style.width = `${randSize}px`
        particle.style.height = `${randSize}px`
        document.getElementsByClassName("particles")[0].appendChild(particle)
        particles.push(particle)
    }
    return particles
}

window.onload = function () {

    let isValidEmail = false
    const reEmail = new RegExp("^[\\w.-]+@([\\w-]+\\.)+[\\w-]{2,4}$", "g");

    const btn   = document.querySelector("button")
    const form  = document.querySelector("form")
    const label = document.querySelector("label")
    const input = document.querySelector("input")
    const dots  = document.getElementsByClassName("trail")
    const bgParticles  = createParticles(500)

    const btnRect   = btn.getBoundingClientRect()
    const formRect  = form.getBoundingClientRect()
    const labelRect = label.getBoundingClientRect()

    const initialBtnStyle = btn.style
    const initialTrailStyle = dots[0].style

    const countDownDate = new Date("Jan 5, 2026 15:12:22").getTime()
    setInterval(() => {
        const currentDate = new Date().getTime()
        const distance = countDownDate - currentDate
    
        let days = Math.floor(distance / (1000*60*60*24))
        let hours = Math.floor(
            (distance % (1000*60*60*24)) / 
            (1000 * 60 * 60))
        let minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / 
            (1000 * 60))
        let seconds = Math.floor((distance % (1000 * 60)) / 1000)
    
        document.getElementsByClassName("days")[0].innerHTML    = `${days}d`
        document.getElementsByClassName("hours")[0].innerHTML   = `${hours}h`
        document.getElementsByClassName("minutes")[0].innerHTML = `${minutes}m`
        document.getElementsByClassName("seconds")[0].innerHTML = `${seconds}s`
    }, 1000)
    

    /* 
        key: x, value: 456.8984375
        key: y, value: 345.796875
        key: width, value: 110.1875
        key: height, value: 32
        key: top, value: 345.796875
        key: right, value: 567.0859375
        key: bottom, value: 377.796875
        key: left, value: 456.8984375
        key: toJSON, value: function toJSON() { [native code] } 
    */

    Array.prototype.map.call(
        bgParticles,
        (particle) => {
            const time = Math.floor(getRandom(1000, 100000))
            setInterval (()=> {
                particle.style.display = "block"
            }, time)
        }
    )

    btn.addEventListener("mouseenter",  () => {

        if (!isValidEmail) {
            btn.style.width = "40px"
            btn.style.height = "40px"
            btn.style.fontSize = "0"
            btn.style.borderRadius = "50%"
            btn.style.boxShadow = "0 0 10px white, 0 0 40px white, 0 0 80px white"
            btn.style.filter = "blur(5px)"
            btn.style.transition = "all 1s ease"
            btn.style.cursor = "auto"
            
            const yMax = labelRect.height*2
            const yMin = (formRect.height - labelRect.height*2) - btnRect.height
            const xMax = (formRect.width - btnRect.width)
            const xMin = (0 + btnRect.width)
            
            const x = getRandom(xMin, xMax)
            const y = getRandom(yMin, yMax)

            btn.style.top = `${y}px`
            btn.style.left = `${x}px`

            Array.prototype.map.call(
                dots,
                (dot, i) => {
                    dot.style.visibility = "visible"
                    dot.style.transition = `top ${1 + ((i+1)/10)}s ease, left ${1 + ((i+1)/10)}s ease`
                    dot.style.opacity = `${0.6 - (i+1)/10}`
                    dot.style.transform = `${0.8 - (i+1)/10}`
                    dot.style.top = `${y}px`
                    dot.style.left = `${x}px`
                })
        } else {
            resetStyle(btn, initialBtnStyle)
        }
    })

    btn.addEventListener("click", () => {
        alert("Thanks for trusting in us!")
    })

    input.addEventListener("click", () => {
        resetStyle(dots, initialTrailStyle)
        resetStyle(btn, initialBtnStyle)
    })

    input.addEventListener("input", (e) => {
        resetStyle(dots, initialTrailStyle)
        resetStyle(btn, initialBtnStyle)
        e.target.value.match(reEmail) ? isValidEmail = true : isValidEmail = false
    })
    
}