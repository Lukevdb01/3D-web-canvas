class MinMaxGUIHelper {
    obj;
    minProp;
    maxProp;
    minDif;
    /**
     *
     */
    constructor(_obj, _minProp, _maxProp, _minDif) {
        this.obj = _obj;
        this.minProp = _minProp;
        this.maxProp = _maxProp;
        this.minDif = _minDif;
    }

    get min() {
        return this.obj[this.minProp];
    }

    set min(v) {
        this.obj[this.minProp] = v;
        this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
    }

    get max() {
        return this.obj[this.maxProp];
    }

    set max(v) {
        this.obj[this.maxProp] = v;
        this.min = this.min;  // this will call the min setter
    }
}
export default MinMaxGUIHelper;