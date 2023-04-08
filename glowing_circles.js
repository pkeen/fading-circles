// const fr = 25;

class Background {
    constructor(
        circleColor = [247, 100, 100, 1], 
        circleSize = 20, 
        circleMargin = 0,
        isGlowing = true,
        backgroundColor = [247, 100, 0, 1]
        )   
    {
        this._circleColor = circleColor;
        this._circleSize = circleSize;
        this._circleMargin = circleMargin;
        this._isGlowing = isGlowing;
        this._backgroundColor = backgroundColor;
        this._circles = [];
    }

    drawBackground() {
        colorMode(HSL);
        background(color(this._backgroundColor[0], this._backgroundColor[1], this._backgroundColor[2], this._backgroundColor[3]));
    }
    
    createCircles() {

        // space is size fo circle + margin
        const space = this._circleSize + this._circleMargin;

        // create the circle objects giving them an x and y (top-left-corner) position
        for (let y = 0; y < window.innerHeight; y+=space) {
            for(let x = 0; x < window.innerWidth; x+=space) {
              const circle = new GlowCircle(this._circleColor, this._circleSize, this._circleMargin, this._isGlowing, x, y);
              this._circles.push(circle);
            } 
        }
    }

    drawCircles() {

        // run through each GlowCircle in array calling render circle method
        this._circles.forEach(circle => circle.renderCircle());

    }

}

class GlowCircle extends Background {
    constructor(color, size, margin, isGlowing, posX, posY) {
        super(color, size, margin, isGlowing);
        this._posX = posX;
        this._posY = posY;
        this._startA = 0;
        this._endA = 1;
        this._p = 0;
    }

    renderCircle () {
        
        // If glowing is set, call get Interp for interpolated transition value
        if (this._isGlowing === true) {

            const interp = this.getInterp();

            this.setDrawModes(interp);
            // set HSLA color for circle
            fill(this._circleColor[0], this._circleColor[1], this._circleColor[2], interp);
        } else {
            // set HSLA color for circle - static
            fill(this._circleColor[0], this._circleColor[1], this._circleColor[2], this._circleColor[3]);
        }
        
        // draw circle using p5 method
        ellipse(this._posX, this._posY, this._circleSize, this._circleSize);
        
    }

    getInterp() {
        // Alpha transition logic
        if (this._p <= 1 ) {
            this._p += 0.03;
        } else {
            // If p has reached 1 (it has reached its end value, the end value becomes the start value and we get a random new end value)
            this._startA = this._endA
            this._endA = Math.random();
            this._p = 0;
        }

        return lerp(this._startA, this._endA, this._p);
    }

    setDrawModes(alph = this._circleColor[3]) {
        // set fill color using alpha value if supplied
        fill(this._circleColor[0], this._circleColor[1], this._circleColor[2], alph);
        // set other draw modes
        noStroke();
        ellipseMode(CORNER);
        colorMode(HSL);
    }

}

export { Background , GlowCircle };