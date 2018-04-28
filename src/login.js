class dialog {
    constructor (id) {
        this.id = id
    }

    show () {
        console.log('show')
    }
}

let dl = new dialog(1)
dl.show()