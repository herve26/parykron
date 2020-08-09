export default class Range{
    constructor(cfi){

        this.range = false
        this.cfi = this.stripped(cfi);
        [this.base, this.body] = this.getPart()
        // console.log(this.base)
        const pos = this.getPosition()
        
        if(this.range){
            this.elmpos = pos[0];
            this.startpos = pos[1];
            this.endpos = pos[2];
            
            this.calculatePos()
        }
        else{
            this.startpos = pos
        }
        
    }

    stripped(cfi){
        let cfist = cfi.split('epubcfi(')[1]
        cfist = cfist.split(')')[0]
        return cfist
    }

    getPart(){
        return this.cfi.split('!')
    }

    getPosition(){
        let posArr = this.body.split(',')
        if(posArr.length > 1){
            this.range = true
            return posArr
        }
        // console.log(this.posToArray([], posArr[0]))
        return posArr
    }

    calculatePos(){
        let elm = this.elmpos.split('/')
        elm.shift()
        console.log(elm)
        elm = elm.map(v => parseInt(v))

        this.startpos = this.posToArray(elm, this.startpos)
        this.endpos = this.posToArray(elm, this.endpos)
    }

    posToArray(elm,pos){
        
        pos = pos.split('/')
        pos.shift()
        console.log(pos)
        let base = []
        for (let i = 0; i < pos.length - 1; i++) {
            console.log(pos[i])
            base.push(parseInt(pos[i]));
        }
        base.push(...pos[pos.length - 1].split(":").map(v => parseInt(v)))
        console.log(base)
        return [...elm, ...base]
    }

    isInside(range){
        if(this.base !== range.base)
            return;

        let inside = {start: null, end: null}
        console.log(range.startpos)
        console.log(this.startpos)
        range.startpos.forEach((v, i) => {
            if(v > this.startpos[i]){
                console.log('outside')
                inside.start = false
                return true
            }
            else if(v < this.startpos[i]){
                console.log('inside')
                inside.start = true
                return true
            }
            inside.start = true
        })

        range.endpos.forEach((v, i) => {
            if(v > this.endpos[i]){
                inside.end = true
            }
            else if(v < this.endpos[i]){
                inside.end = false
            }
        })
        console.log(inside)
        if(inside.start || inside.end)
            return true
        return false
    }

    // isFar(range){
    //     if(range.range){

    //     }
    // }
}


function isOverlapping(range, comments){
    console.log(comments)
    const rangeIn = new Range(range)
    let isInside = false
    comments.some((comment, index) => {
        const rangeOut = new Range(comment.range)
        if(rangeIn.isInside(rangeOut)){
            isInside = true
            return true
        }
    } )
    console.log(isInside)
    return isInside
}

export {isOverlapping}